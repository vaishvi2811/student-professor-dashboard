import { Routes, Route, Navigate } from "react-router-dom";
import StudentLanding from "./components/studentlanding2";
import LoginSignup from "./components/login_signup";
import ProfessorLanding from "./components/proflanding";

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
            {/* <StudentLanding /> */}
            <ProfessorLanding/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;


// import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./components/Home";
// import LoginSignup from "./components/LoginSignup";
// import StudentLanding from "./components/studentlanding2";
// import ProfessorLanding from "./components/professorlanding";

// // ProtectedRoute Component
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/" replace />;
// };

// function App() {
//   return (
//     <Routes>
//       {/* Home page with buttons for student/professor login */}
//       <Route path="/" element={<Home />} />

//       {/* Separate login pages */}
//       <Route path="/student-login" element={<LoginSignup userType="student" />} />
//       <Route path="/professor-login" element={<LoginSignup userType="professor" />} />

//       {/* Protected landing pages */}
//       <Route
//         path="/studentlanding"
//         element={
//           <ProtectedRoute>
//             <StudentLanding />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/professorlanding"
//         element={
//           <ProtectedRoute>
//             <ProfessorLanding />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }

// export default App;