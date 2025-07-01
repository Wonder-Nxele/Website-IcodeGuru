import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "../css/NavBar.css"; // Ensure this CSS file exists and is linked

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardPath, setDashboardPath] = useState("/student-dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      if (user) {
        const uid = user.uid;
        if (uid === "RLBh9GOJbwdcTWSLmS17XwACdI92") {
          setDashboardPath("/admin-dashboard");
        } else if (
          ["lTxCibiDDxaguh6hdlUTXjr9wEj1", "CLecIlf8FWWUg7C0jeREjgTyrA22", "5kzeQ1a0lqfJfstXPgaaQzgELRA2"].includes(uid)
        ) {
          setDashboardPath("/tutor-dashboard");
        } else {
          setDashboardPath("/student-dashboard");
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault(); // Prevent the Link from navigating immediately
    const really = window.confirm("Are you sure you want to log out?");
    if (!really) return; // user cancelled

    try {
      await signOut(auth);
      setIsLoggedIn(false); // Update state to reflect logged out status
      navigate("/"); // Navigate to the home page after successful logout
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  let companyName = "iCodeGuru</>";
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="brand">{companyName}</span>
      </div>

      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <Link to="/about">About</Link>
            <Link to="/offers">Courses</Link>
            <Link to={dashboardPath}>Dashboard</Link>
            <Link to="/" className="logout-button" onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/testimonials">Testimonials</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
