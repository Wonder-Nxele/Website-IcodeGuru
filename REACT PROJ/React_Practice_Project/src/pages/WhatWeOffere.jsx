import "../css/WhatWeOffer.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function WhatWeOffer() {
  const navigate = useNavigate();

  const modules = [
    // Computer Science Modules
    { name: "Introduction to Programming With Python", price: 80, category: "Computer Science" },
    { name: "Introduction to OOP With Java", price: 90, category: "Computer Science" },
    { name: "Java OOP and GUI", price: 90, category: "Computer Science" },
    { name: "Databases and Programming", price: 80, category: "Computer Science" },
    { name: "Data Structures and Algorithms", price: 90, category: "Computer Science" },

    // Mathematics Modules
    { name: "Introduction To Calculus", price: 90, category: "Mathematics" },
    { name: "Calculus and Linear Algebra", price: 90, category: "Mathematics" },

    // Statistics Module
    { name: "Introduction to Statistics", price: 80, category: "Statistics" },
  ];

  const groupedModules = modules.reduce((acc, mod) => {
    if (!acc[mod.category]) acc[mod.category] = [];
    acc[mod.category].push(mod);
    return acc;
  }, {});

  return (
    <div className="offers-container">
      <h1>What We Offer</h1>
      <h2 style={{ color: "#3d71e0" }}>
        Browse the modules available and click to learn more or book a session.
      </h2>

      {/* Computer Science Section */}
      <section className="module-section">
        <h2 className="category-title">💻 Computer Science Modules</h2>
        <p className="category-description">
          Whether you're starting out or diving deeper into development, our Computer Science modules cover Python, Java, data structures, and more.
        </p>
        <div className="module-grid">
          {groupedModules["Computer Science"].map((mod, index) => (
            <Link
              to="/booking"
              state={{ module: mod.name }}
              className="module-card"
              key={index}
            >
              <h3>{mod.name}</h3>
              <p>Price: R{mod.price}/hour</p>
              <button>Book Now</button>
            </Link>
          ))}
        </div>
      </section>

      {/* Mathematics Section */}
      <section className="module-section">
        <h2 className="category-title">📐 Mathematics Modules</h2>
        <p className="category-description">
          Strengthen your math foundation with our tutoring in calculus and linear algebra—perfect for science and engineering students.
        </p>
        <div className="module-grid">
          {groupedModules["Mathematics"].map((mod, index) => (
            <Link
              to="/booking"
              state={{ module: mod.name }}
              className="module-card"
              key={index}
            >
              <h3>{mod.name}</h3>
              <p>Price: R{mod.price}/hour</p>
              <button>Book Now</button>
            </Link>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="module-section">
        <h2 className="category-title">📊 Statistics Module</h2>
        <p className="category-description">
          Need help understanding data and probability? This module is ideal for business, health science, and CS students alike.
        </p>
        <div className="module-grid">
          {groupedModules["Statistics"].map((mod, index) => (
            <Link
              to="/booking"
              state={{ module: mod.name }}
              className="module-card"
              key={index}
            >
              <h3>{mod.name}</h3>
              <p>Price: R{mod.price}/hour</p>
              <button>Book Now</button>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
