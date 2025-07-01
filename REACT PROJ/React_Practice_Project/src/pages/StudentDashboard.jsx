import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy, // orderBy is imported but not used in fetchBookings, consider adding it if you want ordered results
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "../css/StudentDashboard.css";

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchBookings(currentUser.uid);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  const fetchBookings = async (uid) => {
    try {
      const q = query(
        collection(db, "bookings"),
        where("uid", "==", uid)
        // If you want to order bookings, uncomment the line below, e.g., by date or createdAt
        // orderBy("date", "asc") // or orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(data);
    } catch (err) {
      console.error("❌ Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.displayName || "Student"}</h2>

      <div className="dashboard-section">
        <h3>📅 Your Booking History</h3>
        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p> No sessions booked yet.</p>
        ) : (
          <ul className="booking-list">
            {bookings.map((b) => (
              <li key={b.id} className="booking-item">
                <strong>{b.module_name}</strong>
                <br />
                {b.date} — {b.hours} hour{b.hours > 1 ? "s" : ""}<br />

                {/* ⭐ START OF THE FIX ⭐ */}
                {b.status === "Confirmed" && b.confirmed_timeslot ? (
                  // If confirmed, display only the confirmed timeslot
                  <p>
                    Time Slot: <strong>{b.confirmed_timeslot}</strong>
                  </p>
                ) : (
                  // If not confirmed (e.g., Pending), display all proposed timeslots
                  <>
                    <p>Time Slot 1: {b.timeslot1 || "N/A"}</p>
                    {b.timeslot2 && <p>Time Slot 2: {b.timeslot2}</p>}
                    {b.timeslot3 && <p>Time Slot 3: {b.timeslot3}</p>}
                  </>
                )}
                {/* ⭐ END OF THE FIX ⭐ */}

                <span className={`status ${b.status.toLowerCase()}`}>
                  {b.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}