import { useState, useEffect } from "react";
import { init, send } from "@emailjs/browser";
import { auth } from "../firebase";
import "../css/Booking.css";
// Make sure to import useNavigate if you're using it
import { useLocation, useNavigate } from "react-router-dom"; // <--- ADDED useNavigate
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// Initialize EmailJS
init("P8-e-A5kGEE7OsFYG");

// Module info map
const MODULE_INFO = {
  "Introduction To Calculus": {
    description: "Master limits, derivatives, and basic integration. This module is perfect for building a solid mathematical foundation.",
    suggestions: ["Limits & Continuity", "Differentiation", "Real-world Applications"],
    category: "Mathematics",
  },
  "Calculus and Linear Algebra": {
    description: "A combo of calculus and matrices. Ideal for engineering or science students tackling multivariable problems.",
    suggestions: ["Partial Derivatives", "Matrix Operations", "Determinants"],
    category: "Mathematics",
  },
  "Introduction to Programming With Python": {
    description: "Learn Python from scratch — variables, loops, functions, and data structures. No prior coding experience required!",
    suggestions: ["Loops & Conditionals", "Functions", "Lists & Dictionaries"],
    category: "Computer Science",
  },
  "Introduction to OOP With Java": {
    description: "Get started with Object-Oriented Programming in Java: classes, objects, inheritance, and encapsulation.",
    suggestions: ["Classes & Objects", "Inheritance", "Encapsulation"],
    category: "Computer Science",
  },
  "Java OOP and GUI": {
    description: "Build Java GUI applications using Swing or JavaFX while mastering core OOP principles.",
    suggestions: ["Swing Components", "Event Handling", "Polymorphism"],
    category: "Computer Science",
  },
  "Databases and Programming": {
    description: "Understand how to design and query databases using SQL, and connect them to real-world applications.",
    suggestions: ["SQL SELECTs", "JOINs", "ER Diagrams"],
    category: "Computer Science",
  },
  "Introduction to Statistics": {
    description: "Cover fundamentals of data analysis, probability, and statistical testing used in social and data sciences.",
    suggestions: ["Descriptive Stats", "Probability", "Hypothesis Testing"],
    category: "Statistics",
  },
  "Data Structures and Algorithms": {
    description: "Develop your understanding of how data is stored, accessed, and manipulated efficiently.",
    suggestions: ["Arrays & Linked Lists", "Sorting Algorithms", "Recursion"],
    category: "Computer Science",
  },
};

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate(); // <--- INITIALIZE useNavigate hook
  const routeModule = location.state?.module;
  const backupModule = localStorage.getItem("selectedModule");
  const selectedModule = routeModule || backupModule || "";

  const [form, setForm] = useState({
    student_name: "",
    student_email: "",
    module_name: selectedModule,
    date: "",
    timeslot1: "",
    timeslot2: "",
    timeslot3: "",
    hours: 1,
    concepts: "",
  });

  const [status, setStatus] = useState("");

  // Auto-fill Firebase info + store selected module in localStorage
  useEffect(() => {
    const user = auth.currentUser;
    if (selectedModule) {
      localStorage.setItem("selectedModule", selectedModule);
    }
    if (user) {
      setForm((prev) => ({
        ...prev,
        student_email: user.email || "",
        student_name: user.displayName || "Student",
        module_name: selectedModule || prev.module_name,
      }));
    }
  }, [selectedModule]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const really = window.confirm("Are you sure you want to submit?");
    if (!really) return;
    setStatus("Sending..."); // Set status to sending immediately

    // ⭐ FIX START: Define moduleCategory before using it ⭐
    const moduleCategory = MODULE_INFO[form.module_name]?.category || "Uncategorized";
    // ⭐ FIX END ⭐

    try {
      const adminResult = await send("service_f7wx5f4", "template_m4cftnb", form);
      const studentResult = await send("service_f7wx5f4", "template_xc5tg7z", form);

      if (adminResult.status !== 200 || studentResult.status !== 200) {
        throw new Error("EmailJS responded with a non-200 status.");
      }

      // Then add booking only if emails succeeded
      await addDoc(collection(db, "bookings"), {
        student_name: form.student_name,
        student_email: form.student_email,
        module_name: form.module_name,
        module_category: moduleCategory, // Now moduleCategory is defined!
        date: form.date,
        timeslot1: form.timeslot1,
        timeslot2: form.timeslot2,
        timeslot3: form.timeslot3,
        hours: form.hours,
        concepts: form.concepts,
        status: "Pending",
        createdAt: Timestamp.now(),
        uid: auth.currentUser?.uid,
      });

      setStatus("Booking request sent! Check your email shortly.");
      navigate("/student-dashboard"); // <--- Use the navigate function
      setForm((prev) => ({
        ...prev,
        date: "",
        timeslot1: "",
        timeslot2: "",
        timeslot3: "",
        hours: 1,
        concepts: "",
      }));
    } catch (error) {
      console.error("Booking submission error:", error);
      setStatus("Failed to send booking request. Please try again."); // More specific error message
    }
  };


  const moduleDetails = MODULE_INFO[selectedModule];

  return (
    <div className="page-content">
      <div className="booking-container">
        <h2>📚 Book a Tutoring Session</h2>
        <p style={{color:"ffd700"}}>Fill in your preferred schedule and what you'd like to cover. Our tutors will get back to you ASAP!</p>

        <div className="module-info">
          <h3>📘 Module: {selectedModule || "Not Selected"}</h3>
          {moduleDetails ? (
            <>
              <p className="module-description">{moduleDetails.description}</p>
              <div className="suggestions">
                <strong>💡 Common Topics:</strong>
                <ul>
                  {moduleDetails.suggestions.map((topic, idx) => (
                    <li key={idx}>{topic}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p>This module is one of our custom subjects. You can request any concept you want covered.</p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="student_email" value={form.student_email} />
          <input type="hidden" name="student_name" value={form.student_name} />

          <label>
            Preferred Date:
            <input type="date" name="date" value={form.date} onChange={onChange} required />
          </label>

          <label>
            Time Slot 1:
            <input type="time" name="timeslot1" value={form.timeslot1} onChange={onChange} required />
          </label>

          <label>
            Time Slot 2:
            <input type="time" name="timeslot2" value={form.timeslot2} onChange={onChange} />
          </label>

          <label>
            Time Slot 3:
            <input type="time" name="timeslot3" value={form.timeslot3} onChange={onChange} />
          </label>

          <label>
            Number of Hours:
            <input type="number" name="hours" min="1" max="8" value={form.hours} onChange={onChange} required />
          </label>

          <label>
            Concepts to Cover:
            <textarea
              name="concepts"
              rows="4"
              value={form.concepts}
              onChange={onChange}
              placeholder="Mention topics you'd like help with..."
            />
          </label>

          <button style={{ color: "#facc15" }} type="submit">Submit Booking</button>
        </form>

        {status && <p className="status">{status}</p>}
      </div>
    </div>
  );
}