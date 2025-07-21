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
      {/* HERO SECTION */}
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
            <li>✅ Personalized 1-on-1 tutoring for your exact module</li>
            <li>📆 Flexible scheduling (you choose the time slots!)</li>
            <li>📈 Personalized practical exercises and practice tets and exams</li>
            <li>👨‍🏫 Expert tutors in Python, Java, Stats, and more</li>
            <li>💰 Affordable rates — as low as R80/hour</li>
            <li>🧠 Boost your confidence before exams and assignments</li>
            <li>📈 Track your improvement and get rewards</li>
          </ul>
        </section>
      </div>

      {/* HOW IT WORKS SECTION */}
      <div className="home-container">
        <h2>📚 How iCodeGuru Works</h2>
        <ul>
          <li>🔍 Browse modules and choose what you need help with.</li>
          <li>📝 Book your session with your preferred date and time.</li>
          <li>📧 Receive confirmation by email + reminders.</li>
          <li>💻 Meet your tutor and level up in your subject!</li>
          <li>🏆 Receive performance tracking and special offers.</li>
        </ul>
      </div>

      {/* TESTIMONIALS */}
      <div className="home-container">
        <h2>🌟 What Students Say</h2>
        <ul>
          <li>💬 “I finally passed my stats module after struggling for 2 semesters. Thank you!” — *Zinhle M.*</li>
          <li>💬 “Booking was easy and the tutor explained everything clearly.” — *Lungelo D.*</li>
          <li>💬 “The best tutoring experience I've had, period.” — *Thabo K.*</li>
        </ul>
      </div>

      {/* SERVICES SECTION */}
      <div className="home-container">
        <h2>🧑‍🏫 Our Services</h2>
        <ul>
          <li>🎓 1-on-1 tutoring in programming, data structures, and more</li>
          <li>🧪 Practice tests and exam prep tailored for your module</li>
          <li>🎯 Concept revision and assignment guidance</li>
          <li>📢 Exclusive offers for registered students</li>
          <li>📊 Feedback system to help you grow</li>
        </ul>
      </div>

      {/* FAQ SECTION */}
      <div className="home-container">
        <h2>❓ Frequently Asked Questions</h2>
        <ul>
          <li><strong>Do I need to pay upfront?</strong> — No! You only pay when booking a session.</li>
          <li><strong>Can I reschedule?</strong> — Yes, just let us know at least 24 hours in advance.</li>
          <li><strong>Do you offer group sessions?</strong> — Yes!, we do.</li>
          <li><strong>How do I pay?</strong> — Payments are made via EFT .</li>
        </ul>
      </div>

      {/* CONTACT PROMO */}
      <div className="vacation-promo-container">
        <h2>📞 Have Questions or Need Help?</h2>
        <p>Send us a WhatsApp message at <strong>060 760 1329</strong> or email us at <strong>icodeguru.tutoring@gmail.com</strong></p>
        <p>We're happy to help you get started with iCodeGuru!</p>
      </div>
    </div>
  );
}
