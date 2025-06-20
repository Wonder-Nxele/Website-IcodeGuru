// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function LoginVerify() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
      navigate("/offers");
    } catch (err) {
      alert("Incorrect email or email. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      alert("Logged in with Google!");
      navigate("/offers");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-content">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div style={{ position: "relative",width: '100%' /* Keep this */ }}>
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
                right: "5px", // Keep this for positioning relative to input
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
        </form>

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
            <button
            onClick={() => navigate("/")}
            style={{
                marginTop: "20px",
                ackgroundColor: "#007bff",
                color: "#fff",
                width: "100%",
                top: "10px",
                padding: "5px",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                cursor: "pointer",
            }}
            >
            Go Back to Home
        </button>


      </div>
    </div>
  );
}
