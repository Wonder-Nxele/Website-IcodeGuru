// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // This state is for Google login errors or general non-form errors
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/offers");
    }catch (err) {
      
      switch (err.code) {
        
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          alert("Incorrect email or password. Please try again.");
          break;

        case "auth/too-many-requests":
          alert("Too many login attempts. Please wait and try again later.");
          break;

        default:
          alert("Something went wrong. Please try again later.");
          break;
      }
    }

  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/offers");
    } catch (err) {
      console.error("Google Login Error:", err.code, err.message); // Log full error for debugging
      // Display error message from Firebase for Google login
      setError(err.message);
    }
  };

  return (
    <div className="page-content">
      <div className="container">
        <h2>Login</h2>
        {/* Display general error for Google login, or for any other non-form specific error */}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required // Added required attribute
          />
          <div style={{ position: "relative" /* Keep this */ }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              // REMOVE all these inline width/paddingRight styles from here
              // style={{ width: "106%", paddingRight: "40px", paddingLeft: "10px", height: "25px", borderRadius: "5px", fontSize: "16px" }}
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px", // Keep this for positioning relative to input
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "18px",
                color: "#007bff",
                userSelect: "none",
              }}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>


          <button type="submit" style={{ marginTop: "30px" }}>
            Login
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "15px", marginBottom: "0" }}>
          <Link to="/change-password" style={{ color: "#3d71e0", textDecoration: "none" }}>
            Forgot Password?
          </Link>
        </p>

        <hr style={{ margin: "30px 0", borderColor: "#fff" }} />

        <button
          onClick={handleGoogleLogin}
          style={{
            backgroundColor: "#007bff",
              color: "#fff",
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
          }}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}