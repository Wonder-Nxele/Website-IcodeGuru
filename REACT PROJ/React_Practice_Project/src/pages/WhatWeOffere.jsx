import "../css/WhatWeOffer.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function WhatWeOffer() {
    const navigate = useNavigate();

  const modules = [
    { name: "Introduction To Calculus", price: 90 },
    { name: "Calculus and Linear Algebra", price: 90 },
    { name: "Introduction to Programming With Python", price: 80 },
    { name: "Introduction to OOP With Java", price:90 },
    { name: "Java OOP and GUI", price: 90 },
    { name: "Databases and Programming", price: 80 },
    { name: "Introduction to Statistics", price: 80 },
    {name: "FET Mathematics", price:100},
    {name: "FET Physical Science", price:100},
  ];
//   useEffect(() => {
//     if (localStorage.getItem("visitedHome") !== "true") {
//       navigate("/login"); // redirect if not from home
//     }
//   }, [navigate]);

  return (
    <div className="offers-container">
      <h1>What We Offer</h1>
      <h2 style={{color: "#3d71e0"}}>Browse the modules available and click to learn more or book a session.</h2>

      <div className="module-grid">
        {modules.map((mod, index) => (
          <Link
            to="/booking"
            state={{ module: mod.name }}  // ← pass module name
            className="module-card"
            key={index}
          >
            <h3>{mod.name}</h3>
            <p>Price: R{mod.price}/hour</p>
            <button>Book Now</button>
          </Link>

        ))}
      </div>
    </div>
  );
}
