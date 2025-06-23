import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return null; // Or show a loading spinner

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
