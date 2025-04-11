import { Routes, Route, Navigate } from "react-router-dom";
import StudentLanding from "./components/studentlanding";
import LoginSignup from "./components/login_signup";

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists in localStorage
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Routes>
      {/* Login/Signup Route (Public) */}
      <Route path="/" element={<LoginSignup />} />

      {/* Protected Route for StudentLanding */}
      <Route
        path="/studentlanding"
        element={
          <ProtectedRoute>
            <StudentLanding />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;