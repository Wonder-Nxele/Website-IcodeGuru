import { useState, useEffect } from "react";
import { init, send } from "@emailjs/browser";
import { auth } from "../firebase";
import "../css/Booking.css";
import { useLocation } from "react-router-dom";


// Initialize EmailJS
init("P8-e-A5kGEE7OsFYG");

export default function Booking() {
    const location = useLocation();
    const selectedModule = location.state?.module || "";  // fallback to empty string

    const [form, setForm] = useState({
    student_name: "",
    student_email: "",
    module_name: selectedModule,  // ← set initially from route
    date: "",
    timeslot1: "",
    timeslot2: "",
    timeslot3: "",
    hours: 1,
    concepts: "",
    });


  const [status, setStatus] = useState("");

  // Auto-fill email and name from Firebase auth
  useEffect(() => {
  const user = auth.currentUser;
  if (user) {
    setForm((prev) => ({
      ...prev,
      student_email: user.email || "",
      student_name: user.displayName || "Student",
      module_name: selectedModule || prev.module_name, // ← fix: preserve or reapply
    }));
  }
}, [selectedModule]);


  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    const really = window.confirm("Are you sure you want to submit?");
    if (!really) return;
    e.preventDefault();
    setStatus("Sending...");

    try {
      // 1. Send booking request to admin
      await send("service_f7wx5f4", "template_m4cftnb", form);

      // 2. Send confirmation email to the student
      await send("service_f7wx5f4", "template_k5dqchs", form);

      setStatus("Booking request sent! Check your email shortly.");

      // Reset form, but keep email/name for future use
      setForm((prev) => ({
        ...prev,
        date: "",
        timeslot1: "",
        timeslot2: "",
        timeslot3: "",
        hours: 1,
        concepts: "",
      }));
    } catch (err) {
      console.error(err);
      setStatus("Failed to send. Please try again.");
    }
  };

  return (
    <div className="page-content">
      <div className="booking-container">
        <h2>Book a Session</h2>
        <form onSubmit={handleSubmit}>

          {/* Hidden fields passed to EmailJS */}
          <input type="hidden" name="student_email" value={form.student_email} />
          <input type="hidden" name="student_name" value={form.student_name} />
            <label>
            Module:
            <input
                type="text"
                name="module_name"
                value={form.module_name}
                readOnly
            />
            </label>

          <label>
            Preferred Date:
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Time Slot 1:
            <input
              type="time"
              name="timeslot1"
              value={form.timeslot1}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Time Slot 2:
            <input
              type="time"
              name="timeslot2"
              value={form.timeslot2}
              onChange={onChange}
            />
          </label>

          <label>
            Time Slot 3:
            <input
              type="time"
              name="timeslot3"
              value={form.timeslot3}
              onChange={onChange}
            />
          </label>

          <label>
            Number of Hours:
            <input
              type="number"
              name="hours"
              min="1"
              max="8"
              value={form.hours}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Concepts to Cover:
            <textarea
              name="concepts"
              rows="4"
              value={form.concepts}
              onChange={onChange}
              placeholder="Explain what topics you want to focus on..."
            />
          </label>

          <button type="submit">Submit Booking</button>
        </form>
        {status && <p className="status">{status}</p>}
      </div>
    </div>
  );
}
