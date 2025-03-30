import React, { useState } from 'react';
import { FaGraduationCap, FaCheckCircle, FaGoogle, FaMicrosoft } from 'react-icons/fa';
import './login_signup.css';

const LoginSignup = () => {
  // State for form tabs
  const [activeTab, setActiveTab] = useState('login');
  
  // State for user type in signup
  const [userType, setUserType] = useState('student');
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    department: '',
    password: '',
    confirmPassword: ''
  });
  
  // Handle login form input changes
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle signup form input changes
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  };
  
  // Handle login form submission
//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
    
//     if (!loginData.email || !loginData.password) {
//       alert('Please fill in all fields');
//       return;
//     }
    
//     // Here you would typically make an API call to authenticate
//     console.log('Login attempt:', loginData);
    
//     // For demo purposes
//     alert('Login successful! Redirecting to dashboard...');
//     // Navigate to dashboard (implement with react-router)
//   };
  
const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Allows cookies to be stored
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed. Check your credentials.');
      }

      alert('Login successful! Redirecting to dashboard...');
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      alert(error.message);
    }
  };

//   // Handle signup form submission
//   const handleSignupSubmit = (e) => {
//     e.preventDefault();
    
//     const { firstName, lastName, email, password, confirmPassword } = signupData;
//     const studentId = signupData.studentId;
//     const department = signupData.department;
    
//     if (!firstName || !lastName || !email || !password || !confirmPassword) {
//       alert('Please fill in all required fields');
//       return;
//     }
    
//     if (password !== confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }
    
//     if (userType === 'student' && !studentId) {
//       alert('Please enter your student ID');
//       return;
//     }
    
//     if (userType === 'professor' && !department) {
//       alert('Please enter your department');
//       return;
//     }
    
//     // Here you would typically make an API call to register the user
//     console.log('Signup attempt:', {
//       ...signupData,
//       role: userType
//     });
    
//     // For demo purposes
//     alert('Account created successfully! Redirecting to dashboard...');
//     // Navigate to dashboard (implement with react-router)
//   };

const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword, studentId, department } = signupData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (userType === 'student' && !studentId) {
      alert('Please enter your student ID');
      return;
    }

    if (userType === 'professor' && !department) {
      alert('Please enter your department');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Allows cookies to be stored
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role: userType,
          studentId: userType === 'student' ? studentId : null,
          department: userType === 'professor' ? department : null,
        }),
      });

      if (!response.ok) {
        throw new Error('Signup failed. Try again.');
      }

      alert('Account created successfully! Redirecting to dashboard...');
      window.location.href = '/dashboard';
    } catch (error) {
      alert(error.message);
    }
  };


//   return (
//     <div className="login-container">
//       <div className="login-sidebar">
//         <div className="logo-container">
//           <div className="logo-icon-container">
//             <FaGraduationCap className="logo-icon" />
//           </div>
//           <div className="logo-text">EduDash</div>
//         </div>
//         <div className="sidebar-content">
//           <h1 className="sidebar-title">Welcome to your academic dashboard</h1>
//           <p className="sidebar-text">Streamline your academic journey with our comprehensive dashboard designed for both students and professors.</p>
//           <ul className="feature-list">
//             <li className="feature-item">
//               <FaCheckCircle className="feature-icon" />
//               <span>Track course progress and grades</span>
//             </li>
//             <li className="feature-item">
//               <FaCheckCircle className="feature-icon" />
//               <span>Manage assignments and deadlines</span>
//             </li>
//             <li className="feature-item">
//               <FaCheckCircle className="feature-icon" />
//               <span>Direct communication between students and professors</span>
//             </li>
//             <li className="feature-item">
//               <FaCheckCircle className="feature-icon" />
//               <span>Access course materials and resources</span>
//             </li>
//           </ul>
//         </div>
//       </div>
      
//       <div className="login-form-container">
//         <div className="form-header">
//           <h2 className="form-title">Access Your Dashboard</h2>
//           <p className="form-subtitle">Sign in to your account or create a new one</p>
//         </div>
        
//         <div className="form-tabs">
//           <div 
//             className={`form-tab ${activeTab === 'login' ? 'active' : ''}`} 
//             onClick={() => setActiveTab('login')}
//           >
//             Login
//           </div>
//           <div 
//             className={`form-tab ${activeTab === 'signup' ? 'active' : ''}`} 
//             onClick={() => setActiveTab('signup')}
//           >
//             Sign Up
//           </div>
//         </div>
        
//         {activeTab === 'login' ? (
//           <form className="login-form active-form" onSubmit={handleLoginSubmit}>
//             <div className="form-group">
//               <label className="form-label" htmlFor="login-email">Email</label>
//               <input 
//                 type="email" 
//                 id="login-email"
//                 name="email" 
//                 className="form-input" 
//                 placeholder="Your email address"
//                 value={loginData.email}
//                 onChange={handleLoginChange}
//               />
//             </div>
            
//             <div className="form-group">
//               <label className="form-label" htmlFor="login-password">Password</label>
//               <input 
//                 type="password" 
//                 id="login-password"
//                 name="password" 
//                 className="form-input" 
//                 placeholder="Your password"
//                 value={loginData.password}
//                 onChange={handleLoginChange}
//               />
//             </div>
            
//             <div className="forgot-password">
//               <a href="#">Forgot password?</a>
//             </div>
            
//             <div className="remember-me">
//               <input 
//                 type="checkbox" 
//                 id="remember-me"
//                 name="rememberMe"
//                 checked={loginData.rememberMe}
//                 onChange={handleLoginChange}
//               />
//               <label htmlFor="remember-me">Remember me for 30 days</label>
//             </div>
            
//             <button type="submit" className="btn">Login</button>
            
//             <div className="divider">
//               <span>or continue with</span>
//             </div>
            
//             <div className="social-login">
//               <button type="button" className="social-btn">
//                 <FaGoogle className="social-icon" />
//                 Google
//               </button>
//               <button type="button" className="social-btn">
//                 <FaMicrosoft className="social-icon" />
//                 Microsoft
//               </button>
//             </div>
//           </form>
//         ) : (
//           <form className="signup-form active-form" onSubmit={handleSignupSubmit}>
//             <div className="user-type-toggle">
//               <div 
//                 className={`user-type-option ${userType === 'student' ? 'active' : ''}`} 
//                 onClick={() => setUserType('student')}
//               >
//                 Student
//               </div>
//               <div 
//                 className={`user-type-option ${userType === 'professor' ? 'active' : ''}`} 
//                 onClick={() => setUserType('professor')}
//               >
//                 Professor
//               </div>
//             </div>
            
//             <div className="form-row">
//               <div className="form-group">
//                 <label className="form-label" htmlFor="signup-firstname">First Name</label>
//                 <input 
//                   type="text" 
//                   id="signup-firstname"
//                   name="firstName" 
//                   className="form-input" 
//                   placeholder="First name"
//                   value={signupData.firstName}
//                   onChange={handleSignupChange}
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label className="form-label" htmlFor="signup-lastname">Last Name</label>
//                 <input 
//                   type="text" 
//                   id="signup-lastname"
//                   name="lastName" 
//                   className="form-input" 
//                   placeholder="Last name"
//                   value={signupData.lastName}
//                   onChange={handleSignupChange}
//                 />
//               </div>
//             </div>
            
//             <div className="form-group">
//               <label className="form-label" htmlFor="signup-email">Email</label>
//               <input 
//                 type="email" 
//                 id="signup-email"
//                 name="email" 
//                 className="form-input" 
//                 placeholder="Your academic email"
//                 value={signupData.email}
//                 onChange={handleSignupChange}
//               />
//             </div>
            
//             {userType === 'student' && (
//               <div className="form-group">
//                 <label className="form-label" htmlFor="student-id">Student ID</label>
//                 <input 
//                   type="text" 
//                   id="student-id"
//                   name="studentId" 
//                   className="form-input" 
//                   placeholder="Your student ID"
//                   value={signupData.studentId}
//                   onChange={handleSignupChange}
//                 />
//               </div>
//             )}
            
//             {userType === 'professor' && (
//               <div className="form-group">
//                 <label className="form-label" htmlFor="department">Department</label>
//                 <input 
//                   type="text" 
//                   id="department"
//                   name="department" 
//                   className="form-input" 
//                   placeholder="Your department"
//                   value={signupData.department}
//                   onChange={handleSignupChange}
//                 />
//               </div>
//             )}
            
//             <div className="form-group">
//               <label className="form-label" htmlFor="signup-password">Password</label>
//               <input 
//                 type="password" 
//                 id="signup-password"
//                 name="password" 
//                 className="form-input" 
//                 placeholder="Create a strong password"
//                 value={signupData.password}
//                 onChange={handleSignupChange}
//               />
//             </div>
            
//             <div className="form-group">
//               <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
//               <input 
//                 type="password" 
//                 id="confirm-password"
//                 name="confirmPassword" 
//                 className="form-input" 
//                 placeholder="Confirm your password"
//                 value={signupData.confirmPassword}
//                 onChange={handleSignupChange}
//               />
//             </div>
            
//             <button type="submit" className="btn">Create Account</button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginSignup;


return (
    <div className="login-container">
      <div className="login-sidebar">
        <div className="logo-container">
          <div className="logo-icon-container">
            <FaGraduationCap className="logo-icon" />
          </div>
          <div className="logo-text">EduDash</div>
        </div>
        <div className="sidebar-content">
          <h1 className="sidebar-title">Welcome to your academic dashboard</h1>
          <p className="sidebar-text">
            Streamline your academic journey with our comprehensive dashboard designed for both students and professors.
          </p>
          <ul className="feature-list">
            <li className="feature-item">
              <FaCheckCircle className="feature-icon" />
              <span>Track course progress and grades</span>
            </li>
            <li className="feature-item">
              <FaCheckCircle className="feature-icon" />
              <span>Manage assignments and deadlines</span>
            </li>
            <li className="feature-item">
              <FaCheckCircle className="feature-icon" />
              <span>Direct communication between students and professors</span>
            </li>
            <li className="feature-item">
              <FaCheckCircle className="feature-icon" />
              <span>Access course materials and resources</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="login-form-container">
        <div className="form-header">
          <h2 className="form-title">Access Your Dashboard</h2>
          <p className="form-subtitle">Sign in to your account or create a new one</p>
        </div>

        <div className="form-tabs">
          <div className={`form-tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>
            Login
          </div>
          <div className={`form-tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>
            Sign Up
          </div>
        </div>

        {activeTab === 'login' ? (
          <form className="login-form active-form" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">
                Email
              </label>
              <input type="email" id="login-email" name="email" className="form-input" placeholder="Your email address" value={loginData.email} onChange={handleLoginChange} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-password">
                Password
              </label>
              <input type="password" id="login-password" name="password" className="form-input" placeholder="Your password" value={loginData.password} onChange={handleLoginChange} />
            </div>

            <button type="submit" className="btn">Login</button>
          </form>
        ) : (
          <form className="signup-form active-form" onSubmit={handleSignupSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-email">
                Email
              </label>
              <input type="email" id="signup-email" name="email" className="form-input" placeholder="Your academic email" value={signupData.email} onChange={handleSignupChange} />
            </div>

            <button type="submit" className="btn">Create Account</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;