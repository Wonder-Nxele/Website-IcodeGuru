import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection, query, where, getDocs, orderBy, updateDoc, doc
} from "firebase/firestore";
import "../css/TutorDashboard.css";

// IMPORTANT: This map is fine for a small, static setup.
// For a scalable solution, tutor-module assignments should be dynamic (e.g., stored in Firestore).
const TUTOR_MODULE_MAP = {
  "CLecIlf8FWWUg7C0jeREjgTyrA22": "Statistics",
  "5kzeQ1a0lqfJfstXPgaaQzgELRA2": "Mathematics",
  "lTxCibiDDxaguh6hdlUTXjr9wEj1": "Computer Science",
  // Add other tutor UIDs and their module categories here
};

export default function TutorDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  // State to hold the selected time for confirmation for each booking
  const [selectedTimes, setSelectedTimes] = useState({});

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    // Determine the tutor's subject based on their UID from the map
    const tutorSubject = TUTOR_MODULE_MAP[user.uid];
    if (!tutorSubject) {
      console.warn(`Tutor with UID ${user.uid} not found in TUTOR_MODULE_MAP.`);
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const bookingsRef = collection(db, "bookings");
        const q = query(
          bookingsRef,
          where("module_category", "==", tutorSubject)
        );
        const snap = await getDocs(q);
        const fetchedBookings = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(fetchedBookings);

        // Initialize selectedTimes state for dropdowns
        const initialSelectedTimes = {};
        fetchedBookings.forEach(b => {
          // If a timeslot is already confirmed, pre-select it in the dropdown (though it will be hidden)
          initialSelectedTimes[b.id] = b.confirmed_timeslot || "";
        });
        setSelectedTimes(initialSelectedTimes);

      } catch (err) {
        console.error("Fetch bookings error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []); // Re-run if auth.currentUser changes (though it's stable after initial load)

  // Function to update only the status of a booking
  const updateBookingStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "bookings", id), { status: newStatus });
      setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert("Failed to update booking status.");
    }
  };

  // Function to handle confirming a specific timeslot for a booking
  const handleConfirmTimeslot = async (bookingId) => {
    const timeToConfirm = selectedTimes[bookingId];

    if (!timeToConfirm) {
      alert("Please select a timeslot to confirm.");
      return;
    }

    // Update the booking with the confirmed timeslot and set status to "Confirmed"
    try {
      await updateDoc(doc(db, "bookings", bookingId), {
        confirmed_timeslot: timeToConfirm,
        status: "Confirmed",
      });
      // Update local state to reflect the change
      setBookings(prevBookings =>
        prevBookings.map(b =>
          b.id === bookingId
            ? { ...b, confirmed_timeslot: timeToConfirm, status: "Confirmed" }
            : b
        )
      );
      alert(`Time confirmed for booking ${bookingId}: ${timeToConfirm}`);
    } catch (error) {
      console.error("Error confirming timeslot:", error);
      alert("Failed to confirm timeslot.");
    }
  };

  if (loading) return <p>Loading your sessions…</p>;

  const tutorSubject = TUTOR_MODULE_MAP[auth.currentUser?.uid];
  if (!tutorSubject) {
    return (
      <div className="tutor-dashboard">
        <p>You are not assigned to any module. Please contact support.</p>
      </div>
    );
  }

  return (
    <div className="tutor-dashboard">
      <h2 style={{ color: "#ffd700" }}>
        Welcome, {auth.currentUser?.displayName || "Tutor"}!
      </h2>
      <p>Managing sessions for: <strong>{tutorSubject}</strong></p>

      {bookings.length === 0 ? (
        <p>No booking requests for your subjects yet.</p>
      ) : bookings.map(b => (
        <div key={b.id} className="booking-card">
          <p>
            <strong>{b.student_name}</strong> - Module: {b.module_name}
          </p>
          <p>
            Date: {b.date} • Duration: {b.hours} hour{b.hours > 1 ? "s" : ""}
          </p>

          {/* ⭐ CORE FIX: Displaying timeslots conditionally ⭐ */}
          {b.status === "Confirmed" && b.confirmed_timeslot ? (
            // If the booking is Confirmed and has a confirmed_timeslot, display only that.
            <p>
              Confirmed Time: <strong>{b.confirmed_timeslot}</strong>
            </p>
          ) : (
            // Otherwise (e.g., Pending), show all proposed times and allow the tutor to confirm one.
            <>
              <p>Student's Requested Times:</p>
              <select
                value={selectedTimes[b.id] || ""}
                onChange={(e) =>
                  setSelectedTimes((prev) => ({
                    ...prev,
                    [b.id]: e.target.value,
                  }))
                }
                disabled={!(b.timeslot1 || b.timeslot2 || b.timeslot3)} // Disable if no slots provided
              >
                <option value="">-- Choose a timeslot --</option>
                {b.timeslot1 && <option value={b.timeslot1}>{b.timeslot1}</option>}
                {b.timeslot2 && <option value={b.timeslot2}>{b.timeslot2}</option>}
                {b.timeslot3 && <option value={b.timeslot3}>{b.timeslot3}</option>}
              </select>
              <button
                onClick={() => handleConfirmTimeslot(b.id)}
                disabled={!selectedTimes[b.id]} // Disable if no time is selected in the dropdown
                style={{ marginLeft: '0px' }}
              >
                ✅ Confirm This Time
              </button>
            </>
          )}

          <p>Concepts to cover: {b.concepts || "Not specified."}</p>
          <label>
            Status:
            <select
              value={b.status}
              onChange={e => updateBookingStatus(b.id, e.target.value)}
              // Optional: Disable status change if it's already "Completed" or "Cancelled"
              // disabled={b.status === "Completed" || b.status === "Cancelled"}
            >
              {["Pending", "Confirmed", "Completed", "Cancelled"].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>
      ))}
    </div>
  );
}