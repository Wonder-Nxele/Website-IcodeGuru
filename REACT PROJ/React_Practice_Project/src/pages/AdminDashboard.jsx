import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "../css/AdminDashboard.css";

export default function AdminDashboard() {
  const [modules, setModules] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newModule, setNewModule] = useState({ name: "", price: "", category: "" });
  // selectedTimes state holds the value chosen in the dropdown for *each* booking
  const [selectedTimes, setSelectedTimes] = useState({});

  const moduleRef = collection(db, "modules");
  const bookingsRef = collection(db, "bookings");

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const snapshot = await getDocs(moduleRef);
        setModules(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching modules:", error);
        alert("Failed to fetch modules."); // Using alert as requested
      }
    };

    const fetchBookings = async () => {
      try {
        const snapshot = await getDocs(bookingsRef);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(data);

        // Pre-fill selectedTimes state based on existing confirmed_timeslot from fetched data
        // This ensures dropdown shows already confirmed time if it exists
        const defaultSelections = {};
        data.forEach(b => {
          defaultSelections[b.id] = b.confirmed_timeslot || "";
        });
        setSelectedTimes(defaultSelections);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Failed to fetch bookings."); // Using alert as requested
      }
    };

    fetchModules();
    fetchBookings();
  }, []); // Empty dependency array means it runs once on component mount

  const addModule = async () => {
    if (!newModule.name || !newModule.price || !newModule.category) {
      alert("Please fill in all module fields."); // Using alert as requested
      return;
    }
    try {
      await addDoc(moduleRef, newModule);
      setNewModule({ name: "", price: "", category: "" });
      alert("Module added successfully!"); // Using alert as requested
      // Re-fetch modules to update the list, or directly update state for better UX
      const snapshot = await getDocs(moduleRef);
      setModules(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error adding module:", error);
      alert("Failed to add module."); // Using alert as requested
    }
  };

  const updateModule = async (id, updatedData) => {
    try {
      await updateDoc(doc(db, "modules", id), updatedData);
      alert("Module updated successfully!"); // Using alert as requested
      // Update state directly for better UX
      setModules(prevModules =>
        prevModules.map(mod => (mod.id === id ? { ...mod, ...updatedData } : mod))
      );
    } catch (error) {
      console.error("Error updating module:", error);
      alert("Failed to update module."); // Using alert as requested
    }
  };

  const deleteModule = async (id) => {
    if (!window.confirm("Are you sure you want to delete this module?")) return; // Confirmation with window.confirm
    try {
      await deleteDoc(doc(db, "modules", id));
      setModules(modules.filter(mod => mod.id !== id));
      alert("Module deleted successfully!"); // Using alert as requested
    } catch (error) {
      console.error("Error deleting module:", error);
      alert("Failed to delete module."); // Using alert as requested
    }
  };

  // Centralized function to update booking data in Firestore and local state
  // This helps keep state and Firestore in sync for various booking updates
  const updateBookingData = async (id, updatePayload) => {
    try {
      await updateDoc(doc(db, "bookings", id), updatePayload);
      // Update the local state to reflect the changes immediately
      setBookings(prevBookings =>
        prevBookings.map(b => (b.id === id ? { ...b, ...updatePayload } : b))
      );
      return true; // Indicate success
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update booking status."); // Using alert as requested
      return false; // Indicate failure
    }
  };

  const updateBookingStatus = async (id, newStatus) => {
    await updateBookingData(id, { status: newStatus });
  };

  // New handler for confirming a timeslot
  const handleConfirmTimeslot = async (bookingId) => {
    const timeToConfirm = selectedTimes[bookingId];

    if (!timeToConfirm) {
      alert("Please select a timeslot to confirm."); // Using alert as requested
      return;
    }

    // Update the booking with the confirmed timeslot and set status to "Confirmed"
    const success = await updateBookingData(bookingId, {
      confirmed_timeslot: timeToConfirm,
      status: "Confirmed",
    });

    if (success) {
      alert(`Time confirmed: ${timeToConfirm}`); // Using alert as requested
      // After confirmation, the `confirmed_timeslot` in the booking object will drive the UI,
      // so no further change to `selectedTimes` for this specific booking ID is explicitly needed here.
    }
  };


  return (
    <div className="admin-dashboard">
      <h2 style={{ color: "#3b82f6" }}>📊 Admin Dashboard</h2>

      <section>
        <h2 style={{ color: "#3b82f6" }}>📚 Manage Modules</h2>
        <input placeholder="Module name" value={newModule.name} onChange={e => setNewModule({ ...newModule, name: e.target.value })} />
        <input placeholder="Price" type="number" value={newModule.price} onChange={e => setNewModule({ ...newModule, price: e.target.value })} />
        <input placeholder="Category" value={newModule.category} onChange={e => setNewModule({ ...newModule, category: e.target.value })} />
        <button onClick={addModule}>Add Module</button>

        {modules.map(mod => (
          <div key={mod.id} className="module-card">
            <p><strong>{mod.name}</strong> - R{mod.price} - {mod.category}</p>
            <button onClick={() => updateModule(mod.id, { ...mod, price: parseInt(mod.price) + 10 })}>+R10</button>
            <button onClick={() => deleteModule(mod.id)}>Delete</button>
          </div>
        ))}
      </section>

      <section>
        <h2 style={{ color: "#3b82f6" }}>🗓️ Bookings</h2>
        {bookings.length === 0 ? (
          <p style={{ color: "white" }}>No bookings available.</p>
        ) : (
          bookings.map(b => (
            <div key={b.id} className="booking-card">
              <p style={{ color: "white" }}>
                <strong>{b.student_name}</strong> booked <strong>{b.module_name}</strong>
              </p>
              <p style={{ color: "white" }}>Status: {b.status}</p>

              {/* Status Dropdown */}
              <select
                style={{ color: "blue", backgroundColor: "#e0f2ff" }}
                value={b.status} // Controlled by booking status
                onChange={(e) => updateBookingStatus(b.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              {/* ⭐ START TIMESLOT CONFIRMATION LOGIC FIX ⭐ */}
              <div style={{ marginTop: "10px" }}>
                {b.confirmed_timeslot ? (
                  // If a timeslot is already confirmed, display it
                  <p style={{ marginTop: "8px", color: "#facc15" }}>
                    Confirmed Time: <strong>{b.confirmed_timeslot}</strong>
                  </p>
                ) : (
                  // Otherwise, show the timeslot selection dropdown and confirm button
                  // ONLY if there are timeslots available to choose from
                  (b.timeslot1 || b.timeslot2 || b.timeslot3) && (
                    <>
                      <label style={{ color: "white", display: "block" }}>Select a time to confirm:</label>
                      <select
                        style={{ marginTop: "5px", marginRight: "10px", color: "blue", backgroundColor: "#e0f2ff" }}
                        // Value of the select is controlled by selectedTimes state for this booking
                        value={selectedTimes[b.id] || ""}
                        onChange={(e) =>
                          setSelectedTimes((prev) => ({
                            ...prev,
                            [b.id]: e.target.value,
                          }))
                        }
                        // Disable the dropdown if no timeslots are available
                        disabled={!(b.timeslot1 || b.timeslot2 || b.timeslot3)}
                      >
                        <option value="">-- Choose a timeslot --</option>
                        {b.timeslot1 && <option value={b.timeslot1}>{b.timeslot1}</option>}
                        {b.timeslot2 && <option value={b.timeslot2}>{b.timeslot2}</option>}
                        {b.timeslot3 && <option value={b.timeslot3}>{b.timeslot3}</option>}
                      </select>

                      <button
                        onClick={() => handleConfirmTimeslot(b.id)}
                        style={{
                          backgroundColor: "#3b82f6",
                          color: "white",
                          padding: "6px 12px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        // Disable the button if no timeslot is selected in the dropdown
                        disabled={!selectedTimes[b.id]}
                      >
                        ✅ Confirm Time
                      </button>
                    </>
                  )
                )}
              </div>
              {/* ⭐ END TIMESLOT CONFIRMATION LOGIC FIX ⭐ */}

            </div>
          ))
        )}
      </section>
    </div>
  );
}