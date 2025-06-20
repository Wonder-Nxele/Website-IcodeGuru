import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

export default function Home() {
  const [message, setMessage] = useState(
    "iCode Guru is your one-stop tutoring hub designed to help students master programming and tech subjects with ease. " +
      "Whether you're struggling with code, preparing for exams, or just want to boost your skills — we've got you covered."
  );

  const navigate = useNavigate();

  const goToSignup = () => {
    localStorage.setItem("visitedHome", "true");
    navigate("/signup");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="page-content">
      <div className="home-container">
        <h1 className="home-title">Level Up with iCodeGuru</h1>
        <p className="home-intro">{message}</p>

        <div className="home-actions">
          <button className="btn-primary" onClick={goToSignup}>
            Sign Up
          </button>
          <button className="btn-secondary" onClick={goToLogin}>
            Login
          </button>
        </div>

        <section className="features">
          <h2>Why Choose iCodeGuru?</h2>
          <ul>
            <li>Personalized 1-on-1 tutoring sessions</li>
            <li>Flexible scheduling to fit your calendar</li>
            <li>Expert tutors in programming, math, and stats</li>
            <li>Affordable rates from R80–R100 per hour</li>
          </ul>
        </section>
      </div>

      {/* NEW VACATION NOTICE CONTAINER */}
      <div className="vacation-promo-container">
        <h2>🎉 We're Open During the Semester Break!</h2>
        <p>
          From <strong>30 June to 21 July</strong>, iCodeGuru will remain fully
          available to support you with your studies.
        </p>
        <p>
          Book any session during this period and enjoy a <strong>10% discount</strong> on
          all our modules!
        </p>
        <p style={{ marginTop: "15px" }}>
          Take advantage of the quiet period to catch up or get ahead. Let’s make your break count!
        </p>
      </div>
    </div>
  );
}
