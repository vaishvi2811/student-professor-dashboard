// import React, { useState } from 'react';
// import { FiHome, FiBook, FiUsers, FiFileText, FiAward, FiCalendar, FiMail, FiBell, FiUser, FiBarChart2 } from 'react-icons/fi';
// import './proflanding.css';

// function ProfessorLanding() {
//   const [activeTab, setActiveTab] = useState('dashboard');
  
//   // Mock data
//   const professorData = {
//     name: "Dr. Sarah Chen",
//     department: "Computer Science",
//     position: "Associate Professor",
//     office: "Science Building, Room 305",
//     email: "schen@university.edu",
//     avatar: "/api/placeholder/100/100",
    
//     courses: [
//       { id: 1, code: "CS301", name: "Database Management Systems", students: 42, averageGrade: "B+" },
//       { id: 2, code: "CS501", name: "Advanced Database Systems", students: 28, averageGrade: "A-" },
//       { id: 3, code: "CS201", name: "Introduction to Databases", students: 65, averageGrade: "B" }
//     ],
//     publications: [
//       { id: 1, title: "Efficient Query Processing in Distributed Database Systems", journal: "Journal of Database Management", year: 2024 },
//       { id: 2, title: "A New Approach to Database Security", conference: "International Conference on Database Systems", year: 2023 },
//     ],
//     committees: [
//       { id: 1, name: "Curriculum Development", role: "Chair" },
//       { id: 2, name: "Graduate Admissions", role: "Member" },
//       { id: 3, name: "Faculty Research", role: "Member" }
//     ],
//     upcomingEvents: [
//       { id: 1, title: "Office Hours", time: "Monday, 2-4 PM", location: "Office 305" },
//       { id: 2, title: "Faculty Meeting", time: "Tuesday, 10 AM", location: "Conference Room B" },
//       { id: 3, title: "Project Presentations", time: "Thursday, 1-5 PM", location: "Lab 202" }
//     ],
//     recentAnnouncements: [
//       { id: 1, course: "CS301", title: "Project Deadline Extended", date: "March 28, 2025", content: "The deadline for the final project has been extended to April 15th." },
//       { id: 2, course: "CS501", title: "Guest Lecture Next Week", date: "March 25, 2025", content: "We'll have a guest lecturer from Oracle discussing real-world database implementations." }
//     ]
//   };
  
//   // Component for each content section
//   const renderContent = () => {
//     switch(activeTab) {
//       case 'dashboard':
//         return renderDashboard();
//       case 'courses':
//         return (
//           <div className="tab-content">
//             <h2>My Courses</h2>
//             <div className="table-container">
//               <table className="data-table">
//                 <thead>
//                   <tr>
//                     <th>Course</th>
//                     <th>Students</th>
//                     <th>Avg. Grade</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {professorData.courses.map(course => (
//                     <tr key={course.id}>
//                       <td>
//                         <div className="course-info">
//                           <div className="course-code">{course.code}</div>
//                           <div className="course-name">{course.name}</div>
//                         </div>
//                       </td>
//                       <td className="student-count">{course.students} students</td>
//                       <td>
//                         <span className="grade-badge">
//                           {course.averageGrade}
//                         </span>
//                       </td>
//                       <td className="action-buttons">
//                         <button className="action-link">Manage</button>
//                         <button className="action-link">Grades</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );
//       case 'students':
//         return (
//           <div className="tab-content">
//             <h2>Student Management</h2>
//             <p>View and manage your students across all courses.</p>
//           </div>
//         );
//       case 'research':
//         return (
//           <div className="tab-content">
//             <h2>Research Publications</h2>
//             <div className="publications-list">
//               {professorData.publications.map(pub => (
//                 <div key={pub.id} className="publication-item">
//                   <div className="publication-title">{pub.title}</div>
//                   <div className="publication-details">
//                     {pub.journal || pub.conference} • {pub.year}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       case 'committees':
//         return (
//           <div className="tab-content">
//             <h2>Committee Assignments</h2>
//             <div className="committees-list">
//               {professorData.committees.map(committee => (
//                 <div key={committee.id} className="committee-item">
//                   <div className="committee-icon-container">
//                     <FiUsers className="committee-icon" />
//                   </div>
//                   <div className="committee-info">
//                     <div className="committee-name">{committee.name}</div>
//                     <div className="committee-role">{committee.role}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       case 'calendar':
//         return (
//           <div className="tab-content">
//             <h2>My Calendar</h2>
//             <div className="events-list">
//               {professorData.upcomingEvents.map(event => (
//                 <div key={event.id} className="event-item">
//                   <div className="event-title">{event.title}</div>
//                   <div className="event-time">{event.time}</div>
//                   <div className="event-location">{event.location}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       case 'messages':
//         return (
//           <div className="tab-content">
//             <h2>Messages</h2>
//             <p>You have 5 unread messages.</p>
//           </div>
//         );
//       default:
//         return renderDashboard();
//     }
//   };
  
//   // Original dashboard content
//   const renderDashboard = () => (
//     <>
//       {/* Welcome Section */}
//       <div className="welcome-banner">
//         <div className="profile-section">
//           <img src="/api/placeholder/100/100" alt="Profile" className="user-avatar-large" />
//           <div className="profile-info">
//             <h1 className="profile-name">{professorData.name}</h1>
//             <p className="profile-title">{professorData.position} • {professorData.department}</p>
//             <div className="profile-stats">
//               <span className="stat-badge">
//                 <FiFileText className="stat-icon" /> 28 Publications
//               </span>
//               <span className="stat-badge">
//                 <FiUsers className="stat-icon" /> 135 Students
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Dashboard Grid */}
//       <div className="dashboard-grid">
//         {/* Current Courses */}
//         <div className="grid-item grid-item-large">
//           <div className="card-header">
//             <h2 className="card-title">
//               <FiBook className="card-icon" /> Current Courses
//             </h2>
//             <button className="text-link" onClick={() => setActiveTab('courses')}>View All Courses</button>
//           </div>
//           <div className="table-container">
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>Course</th>
//                   <th>Students</th>
//                   <th>Avg. Grade</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {professorData.courses.map(course => (
//                   <tr key={course.id}>
//                     <td>
//                       <div className="course-info">
//                         <div className="course-code">{course.code}</div>
//                         <div className="course-name">{course.name}</div>
//                       </div>
//                     </td>
//                     <td className="student-count">{course.students} students</td>
//                     <td>
//                       <span className="grade-badge">
//                         {course.averageGrade}
//                       </span>
//                     </td>
//                     <td className="action-buttons">
//                       <button className="action-link">Manage</button>
//                       <button className="action-link">Grades</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Performance Summary */}
//         <div className="grid-item">
//           <h2 className="card-title">
//             <FiBarChart2 className="card-icon" /> Teaching Statistics
//           </h2>
//           <div className="stats-container">
//             <div className="stat-item">
//               <div className="stat-header">
//                 <span className="stat-label">Student Satisfaction</span>
//                 <span className="stat-value">4.8/5.0</span>
//               </div>
//               <div className="progress-bar">
//                 <div className="progress-fill blue" style={{ width: '96%' }}></div>
//               </div>
//             </div>
            
//             <div className="stat-item">
//               <div className="stat-header">
//                 <span className="stat-label">Assignment Completion</span>
//                 <span className="stat-value">92%</span>
//               </div>
//               <div className="progress-bar">
//                 <div className="progress-fill green" style={{ width: '92%' }}></div>
//               </div>
//             </div>
            
//             <div className="stat-item">
//               <div className="stat-header">
//                 <span className="stat-label">Average Attendance</span>
//                 <span className="stat-value">89%</span>
//               </div>
//               <div className="progress-bar">
//                 <div className="progress-fill yellow" style={{ width: '89%' }}></div>
//               </div>
//             </div>
            
//             <div className="stat-item">
//               <div className="stat-header">
//                 <span className="stat-label">Grading Progress</span>
//                 <span className="stat-value">78%</span>
//               </div>
//               <div className="progress-bar">
//                 <div className="progress-fill orange" style={{ width: '78%' }}></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Recent Publications */}
//         <div className="grid-item">
//           <div className="card-header">
//             <h2 className="card-title">
//               <FiFileText className="card-icon" /> Recent Publications
//             </h2>
//             <button className="text-link" onClick={() => setActiveTab('research')}>View All</button>
//           </div>
//           <div className="publications-list">
//             {professorData.publications.map(pub => (
//               <div key={pub.id} className="publication-item">
//                 <div className="publication-title">{pub.title}</div>
//                 <div className="publication-details">
//                   {pub.journal || pub.conference} • {pub.year}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Upcoming Events */}
//         <div className="grid-item">
//           <h2 className="card-title">
//             <FiCalendar className="card-icon" /> Upcoming Events
//           </h2>
//           <div className="events-list">
//             {professorData.upcomingEvents.map(event => (
//               <div key={event.id} className="event-item">
//                 <div className="event-title">{event.title}</div>
//                 <div className="event-time">{event.time}</div>
//                 <div className="event-location">{event.location}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Committee Roles */}
//         <div className="grid-item">
//           <h2 className="card-title">
//             <FiUsers className="card-icon" /> Committee Involvement
//           </h2>
//           <div className="committees-list">
//             {professorData.committees.map(committee => (
//               <div key={committee.id} className="committee-item">
//                 <div className="committee-icon-container">
//                   <FiUsers className="committee-icon" />
//                 </div>
//                 <div className="committee-info">
//                   <div className="committee-name">{committee.name}</div>
//                   <div className="committee-role">{committee.role}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recent Announcements */}
//         <div className="grid-item">
//           <div className="card-header">
//             <h2 className="card-title">
//               <FiBell className="card-icon" /> Recent Announcements
//             </h2>
//             <button className="text-link">Create New</button>
//           </div>
//           <div className="announcements-list">
//             {professorData.recentAnnouncements.map(announcement => (
//               <div key={announcement.id} className="announcement-item">
//                 <div className="announcement-header">
//                   <span className="course-badge">{announcement.course}</span>
//                   <span className="announcement-date">{announcement.date}</span>
//                 </div>
//                 <div className="announcement-title">{announcement.title}</div>
//                 <div className="announcement-content">{announcement.content}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
  
//   return (
//     <div className="app-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="sidebar-header">
//           <div className="logo-container">
//             <FiUser className="logo-icon" />
//           </div>
//           <h1 className="logo-text">FacultyPortal</h1>
//         </div>
        
//         <nav className="sidebar-nav">
//           <ul>
//             <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
//               <a href="#dashboard">
//                 <FiHome className="nav-icon" /> Dashboard
//               </a>
//             </li>
//             <li className={activeTab === 'courses' ? 'active' : ''} onClick={() => setActiveTab('courses')}>
//               <a href="#courses">
//                 <FiBook className="nav-icon" /> Courses
//               </a>
//             </li>
//             <li className={activeTab === 'students' ? 'active' : ''} onClick={() => setActiveTab('students')}>
//               <a href="#students">
//                 <FiUsers className="nav-icon" /> Students
//               </a>
//             </li>
//             <li className={activeTab === 'research' ? 'active' : ''} onClick={() => setActiveTab('research')}>
//               <a href="#research">
//                 <FiFileText className="nav-icon" /> Research
//               </a>
//             </li>
//             <li className={activeTab === 'committees' ? 'active' : ''} onClick={() => setActiveTab('committees')}>
//               <a href="#committees">
//                 <FiUsers className="nav-icon" /> Committees
//               </a>
//             </li>
//             <li className={activeTab === 'calendar' ? 'active' : ''} onClick={() => setActiveTab('calendar')}>
//               <a href="#calendar">
//                 <FiCalendar className="nav-icon" /> Calendar
//               </a>
//             </li>
//             <li className={activeTab === 'messages' ? 'active' : ''} onClick={() => setActiveTab('messages')}>
//               <a href="#messages">
//                 <FiMail className="nav-icon" /> Messages
//               </a>
//             </li>
//           </ul>
//         </nav>

//         <div className="sidebar-footer">
//           <div className="user-info">
//             <img src="/api/placeholder/40/40" className="user-avatar-small" alt="Profile" />
//             <div className="user-details">
//               <p className="user-name">{professorData.name}</p>
//               <p className="user-role">{professorData.department}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Header */}
//         <header className="main-header">
//           <h2 className="page-title">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
//           <div className="header-actions">
//             <button className="icon-button">
//               <FiBell />
//             </button>
//             <div className="notification-icon">
//               <span className="notification-badge">5</span>
//               <button className="icon-button">
//                 <FiMail />
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Content */}
//         <main className="dashboard-content">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default ProfessorLanding;


import React, { useEffect, useState } from 'react';
import {
  FiHome, FiBookOpen, FiUsers, FiMail, FiCalendar, FiBell, FiUser
} from 'react-icons/fi';
import './proflanding.css' ; 
import './sidebar.css' ; 
import './dashboard.css' ; 
import CoursesPage from './profCoursePage';

function ProfessorLanding() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardRefreshKey, setDashboardRefreshKey] = useState(0);
  const [professorData, setProfessorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessorData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/auth/professor-dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch professor data");
        const data = await response.json();

        setProfessorData({
          ...data,
          avatar: "/api/placeholder/100/100",
          upcomingTasks: [],
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProfessorData();
  }, [activeTab, dashboardRefreshKey]);

  if (loading || !professorData) {
    return <div className="loading">Loading professor dashboard...</div>;
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <div className="logo-icon"><FiUser className="icon" /></div>
          <h1 className="app-title">ProfPortal</h1>
        </div>
        <nav className="main-nav">
          <ul>
            {["dashboard", "courses", "students", "research", "messages", "calendar"].map(tab => (
              <li key={tab} className={`nav-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => {
                  if (tab === 'dashboard') setDashboardRefreshKey(prev => prev + 1);
                  setActiveTab(tab);
                }}>
                <a href="#" className="nav-link">
                  {{
                    dashboard: <FiHome />,
                    courses: <FiBookOpen />,
                    students: <FiUsers />,
                    research: <FiCalendar />,
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
            <img src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"} className="profile-image" alt="Profile" />
            <div className="profile-info">
              <p className="profile-name">{professorData.name}</p>
              <p className="profile-dept">{professorData.department}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h2 className="header-title">Professor Dashboard</h2>
          <div className="header-actions">
            <button className="action-button"><FiBell className="action-icon" /></button>
            <div className="notification-container">
              <span className="notification-badge">2</span>
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
                  <img src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Profile" className="welcome-profile-image" />
                  <div className="welcome-text">
                    <h1 className="welcome-name">{professorData.name}</h1>
                    <p className="welcome-info">{professorData.department}</p>
                  </div>
                </div>
              </div>

              {/* Dashboard Grid */}
              <div className="dashboard-grid">
                {/* Courses Taught */}
                <div className="dashboard-card courses-card">
                  <h2 className="card-title"><FiBookOpen className="card-icon" /> Courses Taught</h2>
                  <div className="table-container">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Course Code</th>
                          <th>Course Name</th>
                          <th>Semester</th>
                        </tr>
                      </thead>
                      <tbody>
                        {professorData.courses?.map(course => (
                          <tr key={course.id}>
                            <td>{course.code}</td>
                            <td>{course.name}</td>
                            <td>{course.semester}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Research */}
                <div className="dashboard-card research-card">
                  <h2 className="card-title"><FiCalendar className="card-icon" /> Research Work</h2>
                  <ul className="list-section">
                    {professorData.research?.map((res, idx) => (
                      <li key={idx}>
                        <strong>{res.title}</strong><br />
                        <span>{res.date} • {res.journal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Students Supervised */}
                <div className="dashboard-card students-card">
                  <h2 className="card-title"><FiUsers className="card-icon" /> Students Supervised</h2>
                  <ul className="list-section">
                    {professorData.students?.map((stud, idx) => (
                      <li key={idx}>
                        {stud.name} – {stud.projectTitle}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}

          {activeTab === 'courses' && <CoursesPage />}

          {/* Future Tabs like Messages, Calendar, etc. can be rendered conditionally here */}
        </main>
      </div>
    </div>
  );
}

export default ProfessorLanding;
