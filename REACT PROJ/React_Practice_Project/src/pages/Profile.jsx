import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  signOut,
  onAuthStateChanged,
  deleteUser,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
} from "firebase/firestore";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [enrollment, setEnrollment] = useState({});
  const [availableModules, setAvailableModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newModule, setNewModule] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        try {
          const enrollmentRef = doc(db, "enrollments", firebaseUser.uid);
          const enrollmentSnap = await getDoc(enrollmentRef);
          if (enrollmentSnap.exists()) {
            setEnrollment(enrollmentSnap.data());
          }

          const modulesSnap = await getDocs(collection(db, "modules"));
          const modulesList = modulesSnap.docs.map((doc) => doc.data().name);
          setAvailableModules(modulesList);
        } catch (error) {
          console.error("Error fetching data:", error);
          alert("Failed to load profile data.");
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account?"
    );
    if (!confirmed || !user) return;

    try {
      await setDoc(doc(db, "enrollments", user.uid), {}, { merge: false });
      await deleteUser(user);
      alert("Your account has been deleted.");
      navigate("/login");
    } catch (error) {
      console.error("Account deletion error:", error);
      alert("Failed to delete account. Please log in again.");
    }
  };

  const handleEnroll = async () => {
    if (!newModule) return alert("Please select a module to enroll.");
    const confirmEnroll = window.confirm(
      `Are you sure you want to enroll in "${newModule}"?`
    );
    if (!confirmEnroll) return;

    const updatedModules = [...(enrollment.modules || []), newModule];

    try {
      await setDoc(doc(db, "enrollments", user.uid), {
        uid: user.uid,
        name: user.displayName || "Anonymous",
        email: user.email,
        modules: updatedModules,
      });
      setEnrollment((prev) => ({ ...prev, modules: updatedModules }));
      setNewModule("");
      alert(`Enrolled in "${newModule}" successfully.`);
    } catch (error) {
      console.error("Enrollment error:", error);
      alert("Failed to enroll. Try again later.");
    }
  };

  const handleDisenroll = async (module) => {
    const confirmDisenroll = window.confirm(
      `Are you sure you want to remove "${module}" from your modules?`
    );
    if (!confirmDisenroll) return;

    const updatedModules = (enrollment.modules || []).filter((m) => m !== module);

    try {
      await setDoc(doc(db, "enrollments", user.uid), {
        uid: user.uid,
        email: user.email,
        modules: updatedModules,
      });
      setEnrollment((prev) => ({ ...prev, modules: updatedModules }));
      alert(`Module "${module}" removed successfully.`);
    } catch (error) {
      console.error("Disenrollment error:", error);
      alert("Failed to remove module.");
    }
  };

  if (loading) {
    return (
      <div className="page-content">
        <div className="container">
          <p style={{ fontStyle: "italic" }}>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="container" style={styles.container}>
        <h2 style={{ color: "gold" }}>Your Profile</h2>

        <div style={styles.section}>
          <p>
            <strong>Name:</strong> {user?.displayName || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email || "N/A"}
          </p>
        </div>

        <div style={styles.section}>
          <strong>Selected Modules:</strong>
          {enrollment?.modules?.length ? (
            <ul style={styles.moduleList}>
              {enrollment.modules.map((mod, index) => (
                <li key={index} style={styles.moduleItem}>
                  {mod}
                  <button
                    onClick={() => handleDisenroll(mod)}
                    style={styles.removeButton}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "gray" }}>No modules enrolled yet.</p>
          )}
        </div>

        <div style={styles.section}>
          <label htmlFor="modules"><strong>Enroll in a Module:</strong></label>
          <div style={styles.moduleForm}>
            <select
              id="modules"
              value={newModule}
              onChange={(e) => setNewModule(e.target.value)}
              style={styles.select}
            >
              <option value="">--Select a module--</option>
              {availableModules
                .filter((mod) => !(enrollment.modules || []).includes(mod))
                .map((mod, index) => (
                  <option key={index} value={mod}>
                    {mod}
                  </option>
                ))}
            </select>
            <button onClick={handleEnroll} style={styles.enrollButton}>
              Enroll
            </button>
          </div>
        </div>

        <div style={styles.actions}>
          <button onClick={handleDeleteAccount} style={styles.deleteButton}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    padding: "20px",
    margin: "0 auto",
  },
  section: {
    marginBottom: "30px",
  },
  moduleList: {
    listStyle: "none",
    paddingLeft: 0,
  },
  moduleItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f4f4f4",
    padding: "8px 12px",
    margin: "6px 0",
    borderRadius: "5px",
  },
  removeButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "4px 10px",
    borderRadius: "4px",
    fontSize: "12px",
    cursor: "pointer",
  },
  moduleForm: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
  },
  select: {
    flex: 1,
    padding: "6px",
    minWidth: "150px",
  },
  enrollButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  actions: {
    marginTop: "40px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "15px",
  },
  logoutButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
