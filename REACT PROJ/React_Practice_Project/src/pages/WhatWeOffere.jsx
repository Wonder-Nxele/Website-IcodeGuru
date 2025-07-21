import "../css/WhatWeOffer.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function WhatWeOffer() {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [groupedModules, setGroupedModules] = useState({});

  // Fetch modules from Firestore on mount
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const snapshot = await getDocs(collection(db, "modules"));
        const data = snapshot.docs.map(doc => doc.data());
        setModules(data);

        // Group by category
        const grouped = data.reduce((acc, mod) => {
          if (!acc[mod.category]) acc[mod.category] = [];
          acc[mod.category].push(mod);
          return acc;
        }, {});
        setGroupedModules(grouped);
      } catch (err) {
        console.error("Error fetching modules:", err);
      }
    };

    fetchModules();
  }, []);

  return (
    <div className="offers-container">
      <h1>What We Offer</h1>

      {/* Computer Science Section */}
      {groupedModules["Computer Science"] && (
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
      )}

      {/* Mathematics Section */}
      {groupedModules["Mathematics"] && (
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
      )}

      {/* Statistics Section */}
      {groupedModules["Statistics"] && (
        <section className="module-section">
          <h2 className="category-title">📊 Statistics Module</h2>
          <p className="category-description">
            Need help understanding data and probability?
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
      )}
    </div>
  );
}
