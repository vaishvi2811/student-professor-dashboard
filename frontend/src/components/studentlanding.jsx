import React, { useEffect, useState } from 'react';
import { FiHome, FiBook, FiAward, FiUsers, FiMail, FiCalendar, FiBell, FiUser } from 'react-icons/fi';
import './studentlanding.css';
import './sidebar.css';
import './dashboard.css';
    
function StudentLanding() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardRefreshKey, setDashboardRefreshKey] = useState(0);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab !== 'dashboard') return;
    const fetchStudentData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/auth/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch student data");
        const data = await response.json();

        // Convert sem to academic year label
        const yearMap = {
          "1": "Freshman", "2": "Freshman",
          "3": "Sophomore", "4": "Sophomore",
          "5": "Penultimate Year, TY", "6": "Penultimate Year, TY",
          "7": "Final Year", "8": "Final Year",
        };

        setStudentData({
          ...data,
          year: yearMap[data.sem] || "Unknown",
          gpa: " - ", // Static for now
          avatar: "/api/placeholder/100/100",
          upcomingDeadlines: [], // Add if you integrate assignments
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [activeTab, dashboardRefreshKey]);

  if (loading || !studentData) {
    return <div className="loading">Loading student dashboard...</div>;
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <div className="logo-icon"><FiUser className="icon" /></div>
          <h1 className="app-title">StudentHub</h1>
        </div>
        <nav className="main-nav">
          <ul>
            {["dashboard", "courses", "achievements", "committees", "messages", "calendar"].map(tab => (
              <li key={tab} className={`nav-item ${activeTab === tab ? 'active' : ''}`}
                  // onClick={() => setActiveTab(tab)}>
                  onClick={() => {
                    if (tab === 'dashboard') {
                      setDashboardRefreshKey(prev => prev + 1);  // force refresh
                    }
                    setActiveTab(tab);
                  }}>
                <a href="#" className="nav-link">
                  {{
                    dashboard: <FiHome />,
                    courses: <FiBook />,
                    achievements: <FiAward />,
                    committees: <FiUsers />,
                    messages: <FiMail />,
                    calendar: <FiCalendar />
                  }[tab]} {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="user-profile">
          <div className="profile-container">
            <img src={"https://cdn-icons-png.flaticon.com/512/159/159690.png"} 
            className="profile-image" alt="Profile" />
            <div className="profile-info">
              <p className="profile-name">{studentData.name}</p>
              <p className="profile-dept">{studentData.department}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h2 className="header-title">Student Dashboard</h2>
          <div className="header-actions">
            <button className="action-button"><FiBell className="action-icon" /></button>
            <div className="notification-container">
              <span className="notification-badge">3</span>
              <button className="action-button"><FiMail className="action-icon" /></button>
            </div>
          </div>
        </header>

        <main className="main-container">
          {activeTab === 'dashboard' && (
            <div className="welcome-section">
              <div className="welcome-content">
                <img src={"https://cdn-icons-png.flaticon.com/512/159/159690.png"} alt="Profile" className="welcome-profile-image" />
                <div className="welcome-text">
                  <h1 className="welcome-name">{studentData.name}</h1>
                  <p className="welcome-info">{studentData.department} • {studentData.year}</p>
                  <p className="gpa-badge">GPA: {studentData.gpa}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="dashboard-card courses-card">
              <h2 className="card-title"><FiBook className="card-icon" /> Current Courses</h2>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Professor</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.courses.map(course => (
                      <tr key={course.id}>
                        <td>
                          <div className="course-info">
                            <div className="course-code">{course.code}</div>
                            <div className="course-name">{course.name}</div>
                          </div>
                        </td>
                        <td className="professor">{course.professor}</td>
                        <td><span className="grade-badge">{course.grade}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="dashboard-card achievements-card">
              <h2 className="card-title"><FiAward className="card-icon" /> Recent Achievements</h2>
              <div className="achievements-list">
                {studentData.achievements.map(achievement => (
                  <div key={achievement.id} className="achievement-item">
                    <div className="achievement-title">{achievement.title}</div>
                    <div className="achievement-date">{achievement.date}</div>
                    <div className="achievement-desc">{achievement.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'committees' && (
            <div className="dashboard-card committees-card">
              <h2 className="card-title"><FiUsers className="card-icon" /> Committee Roles</h2>
              <div className="committees-list">
                {studentData.committees.map(committee => (
                  <div key={committee.id} className="committee-item">
                    <div className="committee-icon-container"><FiUsers className="committee-icon" /></div>
                    <div className="committee-info">
                      <div className="committee-name">{committee.name}</div>
                      <div className="committee-role">{committee.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="dashboard-card deadlines-card">
              <h2 className="card-title"><FiCalendar className="card-icon" /> Upcoming Deadlines</h2>
              <div className="deadlines-list">
                {studentData.upcomingDeadlines.length > 0 ? (
                  studentData.upcomingDeadlines.map(deadline => (
                    <div key={deadline.id} className="deadline-item">
                      <div className="deadline-info">
                        <div className="deadline-title">{deadline.title}</div>
                        <div className="deadline-course">{deadline.course}</div>
                      </div>
                      <div className="deadline-date">{deadline.date}</div>
                    </div>
                  ))
                ) : (
                  <p className="no-deadlines">No upcoming deadlines</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="dashboard-card messages-card">
              <h2 className="card-title"><FiMail className="card-icon" /> Messages</h2>
              <p>No messages yet. This feature is under development.</p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

export default StudentLanding;