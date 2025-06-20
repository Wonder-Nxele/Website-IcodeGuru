// src/pages/ChangePassword.jsx
import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import "../css/ChangePassword.css"; // Create this CSS file

export default function ChangePassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    setError(""); // Clear previous errors

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      setEmail(""); // Clear email field after sending
    } catch (err) {
      console.error("Error sending password reset email:", err.code, err.message);
      // More user-friendly error messages based on Firebase error codes
      if (err.code === "auth/invalid-email") {
        setError("Invalid email address. Please enter a valid email.");
      } else if (err.code === "auth/user-not-found") {
        setError("No user found with that email address.");
      } else {
        setError("Failed to send password reset email. Please try again.");
      }
    }
  };

  return (
    <div className="page-content"> {/* Use page-content for consistent spacing */}
      <div className="change-password-container">
        <h2>Forgot Password?</h2>
        <p>Enter your email address to receive a password reset link.</p>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleChangePassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Email</button>
        </form>

        <div className="change-password-links">
          <p>
            Remember your password? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}