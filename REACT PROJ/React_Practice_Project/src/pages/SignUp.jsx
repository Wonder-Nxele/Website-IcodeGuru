// src/pages/Signup.jsx
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Create the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update their profile
      await updateProfile(userCredential.user, { displayName: name });

      // Send email verification
      await sendEmailVerification(userCredential.user);

      alert(`Welcome, ${name}! Please check your email to verify your account.`);
      navigate("/verify_login");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      alert(`Signed up with Google as ${result.user.displayName}!`);
      navigate("/offers");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("visitedHome") !== "true") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="page-content">
      <div className="container">
        <h2>Signup</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSignup} style={{ width: '100%' }}>
          <input
            type="text"
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
            required
            style={{ marginBottom: "15px" }}
          />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
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


          <button type="submit" style={{ marginTop: "30px", width: "100%" }}>
            Create Account
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <p>or</p>
          <button
            onClick={handleGoogleSignup}
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
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}
// src/pages/Signup.jsx