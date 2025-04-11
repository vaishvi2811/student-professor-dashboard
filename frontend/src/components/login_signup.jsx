import React, { useState } from 'react';
import { FaGraduationCap, FaCheckCircle, FaGoogle, FaMicrosoft, FaEye, FaEyeSlash } from 'react-icons/fa';
import './login_signup.css';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  // State for form tabs
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();
  

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    rollNum: '',
    password: '',
    class: {
        branch: '',
        sem: '',
    },
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
const handleLoginSubmit = async (e) => {
  e.preventDefault();

  if (!loginData.email || !loginData.password) {
    alert('Please fill in all fields');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/v1/auth/login', {
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

    const data = await response.json(); // Parse the response JSON
    const token = data.token; // Extract the token from the response

    // Save the token in localStorage for future use
    localStorage.setItem('token', token);

    alert('Login successful! Redirecting to dashboard...');
    navigate('/studentlanding'); // Redirect to StudentLanding page
  } catch (error) {
    alert(error.message);
  }
};

const handleSignupSubmit = async (e) => {
    e.preventDefault();
    console.log('Signup form submitted');

    const { name, email, rollNum, class:studentClass ,password } = signupData;

    // Validate required fields
  if (!name || !email || !rollNum || !studentClass?.branch || !studentClass?.sem || !password ) {
    alert('Please fill in all required fields');
    return;
  }

  // Validate email format
  if (!email.endsWith('vjti.ac.in')) {
    alert('Invalid email.');
    return;
  }

  // Validate roll number format
  const emailPrefix = email.split('@')[0];
  const lastTwoDigits = emailPrefix.match(/\d{2}$/);
  if (!lastTwoDigits || !rollNum.startsWith(lastTwoDigits[0])) {
    alert('Roll Number does not match email format.');
    return;
  }

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Allows cookies to be stored
        body: JSON.stringify({
          name,
          email,
          rollNum,
          password,
          class: {
            branch: studentClass.branch,
            sem: studentClass.sem,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Signup failed. Try again.');
      }

      alert('Account created successfully! Redirecting to dashboard...');
      navigate('/studentlanding');
    } catch (error) {
      alert(error.message);
    }
  };


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
              <label className="form-label" htmlFor="signup-name">
                Name
              </label>
              <input
                type="text"
                id="signup-name"
                name="name"
                className="form-input"
                placeholder="Your full name"
                value={signupData.name}
                onChange={handleSignupChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="signup-email">
                Email
              </label>
              <input type="email" id="signup-email" name="email" className="form-input" placeholder="Your academic email" value={signupData.email} onChange={handleSignupChange} />
            </div>

            <div className="form-group">
    <label className="form-label" htmlFor="signup-rollNum">
      Roll Number
    </label>
    <input
      type="text"
      id="signup-rollNum"
      name="rollNum"
      className="form-input"
      placeholder="Your roll number"
      value={signupData.rollNum}
      onChange={handleSignupChange}
    />
  </div>


  <div className="form-row">
  <div className="form-group">
    <label className="form-label" htmlFor="signup-branch">
      Branch
    </label>
    <select
      id="signup-branch"
      name="class.branch"
      className="form-input"
      value={signupData.class?.branch || ''}
      onChange={(e) =>
        setSignupData({
          ...signupData,
          class: { ...signupData.class, branch: e.target.value },
        })
      }
    >
      <option value="">Select your branch</option>
      <option value="Computer Science">Computer Science</option>
      <option value="Information Technology">Information Technology</option>
      <option value="Electronics">Electronics</option>
      <option value="Mechanical">Mechanical</option>
      <option value="Civil">Civil</option>
      <option value="Electrical">Electrical</option>
    </select>
  </div>

  <div className="form-group">
    <label className="form-label" htmlFor="signup-sem">
      Semester
    </label>
    <select
      id="signup-sem"
      name="class.sem"
      className="form-input"
      value={signupData.class?.sem || ''}
      onChange={(e) =>
        setSignupData({
          ...signupData,
          class: { ...signupData.class, sem: e.target.value },
        })
      }
    >
      <option value="">Select your semester</option>
      {[...Array(8)].map((_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </select>
  </div>
</div>

<div className="form-group">
  <label className="form-label" htmlFor="signup-password">
    Password
  </label>
  <div className="password-input-container">
    <input
      type={showPassword ? "text" : "password"} // Toggle between text and password
      id="signup-password"
      name="password"
      className="form-input"
      placeholder="Create a strong password"
      value={signupData.password}
      onChange={handleSignupChange}
    />
    <span
      className="password-toggle-icon"
      onClick={() => setShowPassword(!showPassword)} // Toggle visibility
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
</div>
  
            <button type="submit" className="btn">Create Account</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;