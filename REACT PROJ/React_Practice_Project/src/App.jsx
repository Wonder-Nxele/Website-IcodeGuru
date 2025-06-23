  import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; // Import useLocation
  import { useEffect } from "react"; // Import useEffect for potential future use, though not strictly needed for this specific logic

  import Home from "./pages/Home";
  import Signup from "./pages/Signup";
  import Login from "./pages/Login";
  import Offers from "./pages/WhatWeOffere";
  import ModuleDetail from "./pages/ModuleDetail";
  import About from "./pages/About";
  import Navbar from "./pages/NavBar";
  import Footer from "./pages/Footer";
  import Booking from "./pages/Booking";
  import Testimonial from "./pages/Testimonial";
  import LoginVerify from "./pages/LoginVerify";
  import ChangePassword from "./pages/ChangePassword";
  import ProtectedRoute from "./Components/ProtectedRoute";
  // Create a new component to handle conditional rendering of Navbar and Footer
  function AppContent() {
    const location = useLocation(); // Get the current location object

    // Define an array of paths where you DON'T want the Navbar/Footer
    const noNavFooterPaths = ["/verify_login"];

    // Check if the current path is in the noNavFooterPaths array
    const showNavAndFooter = !noNavFooterPaths.includes(location.pathname);

    return (
      <>
        {showNavAndFooter && <Navbar />} {/* Conditionally render Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/offers"
            element={
              <ProtectedRoute>
                <Offers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/:slug"
            element={
              <ProtectedRoute>
                <Offers />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonial />} />
          <Route path="/verify_login" element={<LoginVerify />} />
          <Route path="/change-password" element={<ChangePassword />} />
          {/* Add more routes as needed */}
        </Routes>
        {showNavAndFooter && <Footer />} {/* Conditionally render Footer */}
      </>
    );
  }

  export default function App() {
    return (
      <BrowserRouter>
        <AppContent /> {/* Render the new AppContent component */}
      </BrowserRouter>
    );
  }