import React, { useEffect, useState } from 'react';
import { FiHome, FiBook, FiAward, FiUsers, FiMail, FiCalendar, FiBell, FiUser } from 'react-icons/fi';
import AchievementsPage from './achievements';
import ProjectsPage from './projects';
import './studentlanding.css';
import './sidebar.css';
import './dashboard.css';
import SearchBar from './searchbar';

function StudentLanding() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardRefreshKey, setDashboardRefreshKey] = useState(0);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchStudentData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/auth/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch student data");
        const data = await response.json();

        const yearMap = {
          "1": "Freshman", "2": "Freshman",
          "3": "Sophomore", "4": "Sophomore",
          "5": "Penultimate Year, TY", "6": "Penultimate Year, TY",
          "7": "Final Year", "8": "Final Year",
        };

        setStudentData({
          ...data,
          year: yearMap[data.sem] || "Unknown",
          gpa: " - ",
          avatar: "/api/placeholder/100/100",
          upcomingDeadlines: [],
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
            {["dashboard", "courses", "achievements", "committees", "projects", "messages", "calendar"].map(tab => (
              <li key={tab} className={`nav-item ${activeTab === tab ? 'active' : ''}`}
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
                    projects: <FiCalendar />,
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
            <img src={"https://cdn-icons-png.flaticon.com/512/159/159690.png"} className="profile-image" alt="Profile" />
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
            <>
              {/* Welcome Section */}
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

              {/* Dashboard Grid */}
              <div className="dashboard-grid">
                {/* Courses */}
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
                        {studentData.courses?.map(course => (
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

                {/* Achievements */}
                <div className="dashboard-card achievements-card">
                  <h2 className="card-title"><FiAward className="card-icon" /> Recent Achievements</h2>
                  <div className="achievements-list">
                    {studentData.achievements?.map(achievement => (
                      <div key={achievement.id} className="achievement-item">
                        <div className="achievement-title">{achievement.title}</div>
                        <div className="achievement-date">{achievement.date}</div>
                        <div className="achievement-desc">{achievement.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Committees */}
                <div className="dashboard-card committees-card">
                  <h2 className="card-title"><FiUsers className="card-icon" /> Committee Roles</h2>
                  <div className="committees-list">
                    {studentData.committees?.map(committee => (
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

                {/* Projects */}
              <div className="dashboard-card projects-card">
                <h2 className="card-title"><FiCalendar className="card-icon" /> Projects</h2>
                <div className="projects-list">
                  {studentData.projects?.map(project => (
                    <div key={project.id} className="project-item">
                      <div className="project-title">{project.title}</div>
                      <div className="project-desc">{project.description}</div>
                      <div className="project-tech"><strong>Tech Stack:</strong> {project.techStack}</div>
                    </div>
                  ))}
                </div>
              </div>

              </div>
            </>
          )}

          {activeTab === 'achievements' && <AchievementsPage />}
          {activeTab === 'projects' && <ProjectsPage projects={studentData.projects} />}


          {["courses", "committees", "messages", "calendar"].includes(activeTab) && (
            <div className="tab-placeholder">
              <h3>You're viewing the <strong>{activeTab}</strong> tab. Content coming soon!</h3>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default StudentLanding;
