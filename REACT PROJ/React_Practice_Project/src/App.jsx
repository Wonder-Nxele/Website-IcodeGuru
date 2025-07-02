import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// 
import QAPage from "./pages/QAPage";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
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
import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Auth protection
import ProtectedRoute from "./Components/ProtectedRoute";

// Component to conditionally show Navbar/Footer
function AppContent() {
  const location = useLocation();

  // Paths without nav & footer
  const noNavFooterPaths = ["/verify_login"];

  const showNavAndFooter = !noNavFooterPaths.includes(location.pathname);

  return (
    <>
      {showNavAndFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify_login" element={<LoginVerify />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/testimonials" element={<Testimonial />} />

        {/* Protected Routes */}
        <Route
          path="/offers"
          element={
            <ProtectedRoute>
              <Offers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules/:slug"
          element={
            <ProtectedRoute>
              <ModuleDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qa"
          element={
            <ProtectedRoute>
              <QAPage />
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
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tutor-dashboard"
          element={
            <ProtectedRoute>
              <TutorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {showNavAndFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
