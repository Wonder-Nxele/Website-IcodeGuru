import { useParams, Link } from "react-router-dom";
import "../css/ModuleDetail.css"; // reuse the same layout/styles

// A lookup table for your modules (names, prices, and optional descriptions)
const MODULES = {
  "introduction-to-calculus": {
    name: "Introduction To Calculus",
    price: 90,
    description:
      "Get started with the fundamentals of limits, derivatives, and integrals.",
  },
  "calculus-and-linear-algebra": {
    name: "Calculus and Linear Algebra",
    price: 90,
    description:
      "Combine calculus techniques with vector spaces and matrices for powerful applications.",
  },
  "introduction-to-programming-with-python": {
    name: "Introduction to Programming With Python",
    price: 80,
    description:
      "Learn Python basics: syntax, control structures, functions, and simple projects.",
  },
  "introduction-to-oop-with-java": {
    name: "Introduction to OOP With Java",
    price: 90,
    description:
      "Understand classes, objects, inheritance, and polymorphism in Java.",
  },
  "java-oop-and-gui": {
    name: "Java OOP and GUI",
    price: 90,
    description:
      "Build desktop applications using Java Swing, event-driven programming, and OOP principles.",
  },
  "databases-and-programming": {
    name: "Databases and Programming",
    price: 80,
    description:
      "Explore SQL, relational design, and integration with code via JDBC or other libraries.",
  },
  "introduction-to-statistics": {
    name: "Introduction to Statistics",
    price: 80,
    description:
      "Cover descriptive statistics, probability, distributions, and hypothesis testing.",
  },
  "fet-mathematics": {
    name: "FET Mathematics",
    price: 100,
    description:
      "Advanced FET-level math topics: functions, trigonometry, and data handling.",
  },
  "fet-physical-science": {
    name: "FET Physical Science",
    price: 100,
    description:
      "Physics and chemistry fundamentals at FET level, with practical examples.",
  },
};

export default function ModuleDetail() {
  const { slug } = useParams();
  const mod = MODULES[slug];

  if (!mod) {
    return (
      <div className="module-detail-container">
        <h2>Module Not Found</h2>
        <p>
          We couldn’t find the module you requested.{" "}
          <Link to="/offers">Back to offers</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="page-content">
    <div className="module-detail-container">
      <h1>{mod.name}</h1>
      <p className="description">{mod.description}</p>
      <p className="price">
        <strong>Price:</strong> R{mod.price}/hour
      </p>
      <button className="book-button" onClick={() => (window.location = "/booking")}>
        Book Now
      </button>
      <p className="back-link">
        <Link to="/offers">← Back to all modules</Link>
      </p>
    </div>
    </div>
  );
}