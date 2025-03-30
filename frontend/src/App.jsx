// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import StudentLanding from './components/studentlanding'
// import ProfessorLanding from './components/proflanding'
// import HomePage from './components/homepage'
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { Routes, Route, Link } from "react-router-dom";

// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import SearchBar from './components/searchbar'
// import CourseStudentsPage from './components/coursestudents'
// import LoginSignup from './components/login_signup'

// function App() {
//   return (

//       <Routes>
//         {/* Home Route */}
//         <Route 
//           path="/" 
//           element={
//             <>
//               <LoginSignup/>
//               <SearchBar />
//               <HomePage />
//               <CourseStudentsPage/>
//             </>
//           } 
//         />

//         {/* Separate Routes for Pages */}
//         <Route path="/student" element={<StudentLanding />} />
//         <Route path="/professor" element={<ProfessorLanding />} />
//         {/* <Route path="/coursestudents" element={<CourseStudentsPage />} /> */}
//         <Route path="/courses/:id" element={<CourseStudentsPage />} />
//       </Routes>
      
//   );
// }

// export default App;





import { Routes, Route } from "react-router-dom";
import StudentLanding from "./components/studentlanding";
import ProfessorLanding from "./components/proflanding";
import HomePage from "./components/homepage";
import SearchBar from "./components/searchbar";
import CourseStudentsPage from "./components/coursestudents";
import LoginSignup from "./components/login_signup";
import ProtectedRoute from "./components/ProtectedRoute"; // Import Protected Route

function App() {
  return (
    <Routes>
      {/* Login/Signup Route (Public) */}
      <Route path="/" element={<LoginSignup />} />

      {/* Protected Homepage Route */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <>
              <SearchBar />
              <HomePage />
              <CourseStudentsPage />
            </>
          </ProtectedRoute>
        }
      />

      {/* Protected Routes for Student & Professor Pages */}
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <StudentLanding />
          </ProtectedRoute>
        }
      />
      <Route
        path="/professor"
        element={
          <ProtectedRoute>
            <ProfessorLanding />
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses/:id"
        element={
          <ProtectedRoute>
            <CourseStudentsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;