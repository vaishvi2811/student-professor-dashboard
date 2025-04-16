import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiBookOpen, FiClipboard, FiBarChart2, FiCalendar, FiMessageCircle } from 'react-icons/fi';
import './homepage.css';


function HomePage() {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-section">
          <div className="logo-icon-wrapper">
            <FiBookOpen className="logo-icon" />
          </div>
          <h1 className="logo-text">EduPortal</h1>
        </div>
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item"><a href="#features">Features</a></li>
            <li className="nav-item"><a href="#about">About</a></li>
            <li className="nav-item"><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <button className="login-btn">Log In</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </header>

      <main className="home-main">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to EduPortal</h1>
            <p className="hero-subtitle">A comprehensive platform for students and professors to manage academic life</p>
            
            <div className="user-selection">
              <div className="selection-card">
                <div className="selection-icon student-icon">
                  <FiUser />
                </div>
                <h2 className="selection-title">Student Dashboard</h2>
                <p className="selection-description">
                  Track your courses, assignments, grades, and participate in class activities
                </p>
                <Link to="/student" className="selection-button student-button">
                  Enter Student Portal
                </Link>
              </div>
              
              <div className="selection-card">
                <div className="selection-icon professor-icon">
                  <FiUser />
                </div>
                <h2 className="selection-title">Professor Dashboard</h2>
                <p className="selection-description">
                  Manage your courses, publish materials, track student progress, and provide feedback
                </p>
                <Link to="/professor" className="selection-button professor-button">
                  Enter Professor Portal
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <h2 className="section-title">Platform Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FiClipboard />
              </div>
              <h3 className="feature-title">Course Management</h3>
              <p className="feature-description">
                Organize courses, materials, and assignments in one centralized location
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FiBarChart2 />
              </div>
              <h3 className="feature-title">Progress Tracking</h3>
              <p className="feature-description">
                Monitor academic performance with detailed analytics and progress reports
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FiCalendar />
              </div>
              <h3 className="feature-title">Schedule & Deadlines</h3>
              <p className="feature-description">
                Keep track of important dates, classes, and assignment due dates
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FiMessageCircle />
              </div>
              <h3 className="feature-title">Communication</h3>
              <p className="feature-description">
                Direct messaging between students and professors for quick assistance
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="about-content">
            <h2 className="section-title">About EduPortal</h2>
            <p className="about-text">
              EduPortal is designed to streamline academic processes for both students and professors. Our platform brings together course management, academic progress tracking, and communication tools to enhance the educational experience.
            </p>
            <p className="about-text">
              Whether you're a student trying to keep track of assignments and grades, or a professor managing multiple courses and student cohorts, EduPortal provides the tools you need to succeed in today's digital learning environment.
            </p>
          </div>
          <div className="about-image">
            <img src="/api/placeholder/500/300" alt="Students using EduPortal" />
          </div>
        </section>
      </main>

      <footer id="contact" className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">EduPortal</h3>
            <p className="footer-description">
              Making education management simpler and more effective.
            </p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <ul className="footer-list">
              <li className="footer-item">support@eduportal.example.com</li>
              <li className="footer-item">+1 (555) 123-4567</li>
              <li className="footer-item">123 Education Ave, Knowledge City</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-list">
              <li className="footer-item"><a href="#features">Features</a></li>
              <li className="footer-item"><a href="#about">About</a></li>
              <li className="footer-item"><a href="/privacy">Privacy Policy</a></li>
              <li className="footer-item"><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="copyright">
          <p>&copy; 2025 EduPortal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;