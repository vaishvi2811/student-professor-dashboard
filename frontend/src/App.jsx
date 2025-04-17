// import { Routes, Route, Navigate } from "react-router-dom";
// import StudentLanding from "./components/studentlanding2";
// import LoginSignup from "./components/studentLogin_signup";
// import ProfessorLanding from "./components/proflanding";

// // ProtectedRoute Component
// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists in localStorage
//   return isAuthenticated ? children : <Navigate to="/" replace />;
// };

// function App() {
//   return (
//     <Routes>
//       {/* Login/Signup Route (Public) */}
//       <Route path="/" element={<LoginSignup />} />

//       {/* Protected Route for StudentLanding */}
//       <Route
//         path="/studentlanding"
//         element={
//           <ProtectedRoute>
//             {/* <StudentLanding /> */}
//             <ProfessorLanding/>
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }

// export default App;




import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/homepage";
import LoginSignup from "./components/studentLogin_signup";
import ProfessorLogin from "./components/professorLogin";
import StudentLanding from "./components/studentlanding";
import ProfessorLanding from "./components/proflanding";

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Add your auth logic here
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage/>} />
      <Route path="/student" element={<LoginSignup />} />
      <Route path="/professor" element={<ProfessorLogin />} />

      {/* Protected Routes */}
      <Route
        path="/studentlanding"
        element={
          <ProtectedRoute>
            <StudentLanding />
          </ProtectedRoute>
        }
      />
      <Route
        path="/professorlanding"
        element={
          <ProtectedRoute>
            <ProfessorLanding />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;