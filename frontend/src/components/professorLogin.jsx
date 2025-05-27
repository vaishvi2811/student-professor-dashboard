import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import './login_signup.css';

const ProfessorLogin = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/professor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Login failed. Check your credentials.');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);

      alert('Login successful! Redirecting to professor dashboard...');
      navigate('/professorlanding');
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
          <h1 className="sidebar-title">Welcome, Professor</h1>
          <p className="sidebar-text">
            Manage student records, grades, and course content all in one place.
          </p>
          <ul className="feature-list">
            <li className="feature-item">
              <FaCheckCircle className="feature-icon" />
              <span>Grade and review assignments</span>
            </li>
            <li className="feature-item">
              <FaCheckCircle className="feature-icon" />
              <span>Monitor class performance</span>
            </li>
            <li className="feature-item">
              <FaCheckCircle className="feature-icon" />
              <span>Communicate with students easily</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="login-form-container">
        <div className="form-header">
          <h2 className="form-title">Professor Login</h2>
          <p className="form-subtitle">Sign in to access your dashboard</p>
        </div>

        <form className="login-form active-form" onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your VJTI email"
              value={loginData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleChange}
              />
              <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit" className="form-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfessorLogin;
