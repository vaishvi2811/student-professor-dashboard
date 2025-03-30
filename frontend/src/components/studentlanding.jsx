// import React, { useState } from 'react';
// import { FiHome, FiBook, FiAward, FiUsers, FiMail, FiCalendar, FiBell, FiUser } from 'react-icons/fi';
// import './studentlanding.css';
// import './sidebar.css';
// import './dashboard.css';

// function StudentLanding() {
//   const [activeTab, setActiveTab] = useState('dashboard');
  
//   // Mock data
//   const studentData = {
//     name: "Alex Johnson",
//     department: "Computer Science",
//     year: "Junior",
//     gpa: "3.8",
//     avatar: "/api/placeholder/100/100",
//     courses: [
//       { id: 1, code: "CS301", name: "Database Management Systems", professor: "Dr. Sarah Chen", grade: "A-" },
//       { id: 2, code: "CS302", name: "Web Development", professor: "Dr. Michael Rodriguez", grade: "A" },
//       { id: 3, code: "CS401", name: "Artificial Intelligence", professor: "Dr. James Wilson", grade: "B+" },
//     ],
//     achievements: [
//       { id: 1, title: "Hackathon Winner", date: "Nov 2024", description: "First place in University Hackathon" },
//       { id: 2, title: "Dean's List", date: "Fall 2024", description: "Academic Excellence" },
//       { id: 3, title: "Best Project Award", date: "Oct 2024", description: "For Mobile App Development course" },
//     ],
//     committees: [
//       { id: 1, name: "Student Council", role: "Technical Officer" },
//       { id: 2, name: "CS Department Committee", role: "Student Representative" },
//     ],
//     upcomingDeadlines: [
//       { id: 1, title: "DBMS Project Submission", course: "CS301", date: "April 15, 2025" },
//       { id: 2, title: "AI Research Paper", course: "CS401", date: "April 10, 2025" },
//     ]
//   };

//   return (
//     <div className="app-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="logo-container">
//           <div className="logo-icon">
//             <FiUser className="icon" />
//           </div>
//           <h1 className="app-title">StudentHub</h1>
//         </div>
        
//         <nav className="main-nav">
//           <ul>
//             <li className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('dashboard')}>
//               <a href="#" className="nav-link">
//                 <FiHome className="nav-icon" /> Dashboard
//               </a>
//             </li>
//             <li className={`nav-item ${activeTab === 'courses' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('courses')}>
//               <a href="#" className="nav-link">
//                 <FiBook className="nav-icon" /> Courses
//               </a>
//             </li>
//             <li className={`nav-item ${activeTab === 'achievements' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('achievements')}>
//               <a href="#" className="nav-link">
//                 <FiAward className="nav-icon" /> Achievements
//               </a>
//             </li>
//             <li className={`nav-item ${activeTab === 'committees' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('committees')}>
//               <a href="#" className="nav-link">
//                 <FiUsers className="nav-icon" /> Committees
//               </a>
//             </li>
//             <li className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('messages')}>
//               <a href="#" className="nav-link">
//                 <FiMail className="nav-icon" /> Messages
//               </a>
//             </li>
//             <li className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('calendar')}>
//               <a href="#" className="nav-link">
//                 <FiCalendar className="nav-icon" /> Calendar
//               </a>
//             </li>
//           </ul>
//         </nav>

//         <div className="user-profile">
//           <div className="profile-container">
//             <img src="/api/placeholder/40/40" className="profile-image" alt="Profile" />
//             <div className="profile-info">
//               <p className="profile-name">{studentData.name}</p>
//               <p className="profile-dept">{studentData.department}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Header */}
//         <header className="header">
//           <h2 className="header-title">Student Dashboard</h2>
//           <div className="header-actions">
//             <button className="action-button">
//               <FiBell className="action-icon" />
//             </button>
//             <div className="notification-container">
//               <span className="notification-badge">3</span>
//               <button className="action-button">
//                 <FiMail className="action-icon" />
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Content */}
//         <main className="main-container">
//           {/* Welcome Section */}
//           <div className="welcome-section">
//             <div className="welcome-content">
//               <img src="/api/placeholder/100/100" alt="Profile" className="welcome-profile-image" />
//               <div className="welcome-text">
//                 <h1 className="welcome-name">{studentData.name}</h1>
//                 <p className="welcome-info">{studentData.department} • {studentData.year}</p>
//                 <p className="gpa-badge">GPA: {studentData.gpa}</p>
//               </div>
//             </div>
//           </div>

//           {/* Dashboard Grid */}
//           <div className="dashboard-grid">
//             {/* Current Courses */}
//             <div className="dashboard-card courses-card">
//               <h2 className="card-title">
//                 <FiBook className="card-icon" /> Current Courses
//               </h2>
//               <div className="table-container">
//                 <table className="data-table">
//                   <thead>
//                     <tr>
//                       <th>Course</th>
//                       <th>Professor</th>
//                       <th>Grade</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {studentData.courses.map(course => (
//                       <tr key={course.id}>
//                         <td>
//                           <div className="course-info">
//                             <div className="course-code">{course.code}</div>
//                             <div className="course-name">{course.name}</div>
//                           </div>
//                         </td>
//                         <td className="professor">{course.professor}</td>
//                         <td>
//                           <span className="grade-badge">
//                             {course.grade}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Recent Achievements */}
//             <div className="dashboard-card achievements-card">
//               <h2 className="card-title">
//                 <FiAward className="card-icon" /> Recent Achievements
//               </h2>
//               <div className="achievements-list">
//                 {studentData.achievements.map(achievement => (
//                   <div key={achievement.id} className="achievement-item">
//                     <div className="achievement-title">{achievement.title}</div>
//                     <div className="achievement-date">{achievement.date}</div>
//                     <div className="achievement-desc">{achievement.description}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Committee Involvements */}
//             <div className="dashboard-card committees-card">
//               <h2 className="card-title">
//                 <FiUsers className="card-icon" /> Committee Roles
//               </h2>
//               <div className="committees-list">
//                 {studentData.committees.map(committee => (
//                   <div key={committee.id} className="committee-item">
//                     <div className="committee-icon-container">
//                       <FiUsers className="committee-icon" />
//                     </div>
//                     <div className="committee-info">
//                       <div className="committee-name">{committee.name}</div>
//                       <div className="committee-role">{committee.role}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Upcoming Deadlines */}
//             <div className="dashboard-card deadlines-card">
//               <h2 className="card-title">
//                 <FiCalendar className="card-icon" /> Upcoming Deadlines
//               </h2>
//               <div className="deadlines-list">
//                 {studentData.upcomingDeadlines.map(deadline => (
//                   <div key={deadline.id} className="deadline-item">
//                     <div className="deadline-info">
//                       <div className="deadline-title">{deadline.title}</div>
//                       <div className="deadline-course">{deadline.course}</div>
//                     </div>
//                     <div className="deadline-date">
//                       {deadline.date}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default StudentLanding;







import React, { useState } from 'react';
import { FiHome, FiBook, FiAward, FiUsers, FiMail, FiCalendar, FiBell, FiUser } from 'react-icons/fi';
import './studentlanding.css';
import './sidebar.css';
import './dashboard.css';

function StudentLanding() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock data
  const studentData = {
    name: "Alex Johnson",
    department: "Computer Science",
    year: "Junior",
    gpa: "3.8",
    avatar: "/api/placeholder/100/100",
    courses: [
      { id: 1, code: "CS301", name: "Database Management Systems", professor: "Dr. Sarah Chen", grade: "A-" },
      { id: 2, code: "CS302", name: "Web Development", professor: "Dr. Michael Rodriguez", grade: "A" },
      { id: 3, code: "CS401", name: "Artificial Intelligence", professor: "Dr. James Wilson", grade: "B+" },
    ],
    achievements: [
      { id: 1, title: "Hackathon Winner", date: "Nov 2024", description: "First place in University Hackathon" },
      { id: 2, title: "Dean's List", date: "Fall 2024", description: "Academic Excellence" },
      { id: 3, title: "Best Project Award", date: "Oct 2024", description: "For Mobile App Development course" },
    ],
    committees: [
      { id: 1, name: "Student Council", role: "Technical Officer" },
      { id: 2, name: "CS Department Committee", role: "Student Representative" },
    ],
    upcomingDeadlines: [
      { id: 1, title: "DBMS Project Submission", course: "CS301", date: "April 15, 2025" },
      { id: 2, title: "AI Research Paper", course: "CS401", date: "April 10, 2025" },
    ],
    messages: [
      { id: 1, from: "Dr. Sarah Chen", subject: "Project Feedback", preview: "Your database design looks good, but consider...", time: "Yesterday" },
      { id: 2, from: "Academic Office", subject: "Registration Open", preview: "Fall 2025 registration is now open...", time: "2 days ago" },
    ]
  };

  // Component map for different tabs
  const tabComponents = {
    dashboard: (
      <>
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <img src="/api/placeholder/100/100" alt="Profile" className="welcome-profile-image" />
            <div className="welcome-text">
              <h1 className="welcome-name">{studentData.name}</h1>
              <p className="welcome-info">{studentData.department} • {studentData.year}</p>
              <p className="gpa-badge">GPA: {studentData.gpa}</p>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Current Courses */}
          <div className="dashboard-card courses-card">
            <h2 className="card-title">
              <FiBook className="card-icon" /> Current Courses
            </h2>
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
                      <td>
                        <span className="grade-badge">
                          {course.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="dashboard-card achievements-card">
            <h2 className="card-title">
              <FiAward className="card-icon" /> Recent Achievements
            </h2>
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

          {/* Committee Involvements */}
          <div className="dashboard-card committees-card">
            <h2 className="card-title">
              <FiUsers className="card-icon" /> Committee Roles
            </h2>
            <div className="committees-list">
              {studentData.committees.map(committee => (
                <div key={committee.id} className="committee-item">
                  <div className="committee-icon-container">
                    <FiUsers className="committee-icon" />
                  </div>
                  <div className="committee-info">
                    <div className="committee-name">{committee.name}</div>
                    <div className="committee-role">{committee.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="dashboard-card deadlines-card">
            <h2 className="card-title">
              <FiCalendar className="card-icon" /> Upcoming Deadlines
            </h2>
            <div className="deadlines-list">
              {studentData.upcomingDeadlines.map(deadline => (
                <div key={deadline.id} className="deadline-item">
                  <div className="deadline-info">
                    <div className="deadline-title">{deadline.title}</div>
                    <div className="deadline-course">{deadline.course}</div>
                  </div>
                  <div className="deadline-date">
                    {deadline.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    ),
    
    courses: (
      <div className="full-content-card">
        <h2 className="card-title">
          <FiBook className="card-icon" /> My Courses
        </h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Professor</th>
                <th>Grade</th>
                <th>Actions</th>
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
                  <td>
                    <span className="grade-badge">
                      {course.grade}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    
    achievements: (
      <div className="full-content-card">
        <h2 className="card-title">
          <FiAward className="card-icon" /> My Achievements
        </h2>
        <div className="achievements-list full-list">
          {studentData.achievements.map(achievement => (
            <div key={achievement.id} className="achievement-item large">
              <div className="achievement-title">{achievement.title}</div>
              <div className="achievement-date">{achievement.date}</div>
              <div className="achievement-desc">{achievement.description}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    
    committees: (
      <div className="full-content-card">
        <h2 className="card-title">
          <FiUsers className="card-icon" /> My Committees
        </h2>
        <div className="committees-list full-list">
          {studentData.committees.map(committee => (
            <div key={committee.id} className="committee-item large">
              <div className="committee-icon-container">
                <FiUsers className="committee-icon" />
              </div>
              <div className="committee-info">
                <div className="committee-name">{committee.name}</div>
                <div className="committee-role">{committee.role}</div>
                <button className="action-btn">Committee Portal</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    
    messages: (
      <div className="full-content-card">
        <h2 className="card-title">
          <FiMail className="card-icon" /> Messages
        </h2>
        <div className="messages-list">
          {studentData.messages.map(message => (
            <div key={message.id} className="message-item">
              <div className="message-from">{message.from}</div>
              <div className="message-subject">{message.subject}</div>
              <div className="message-preview">{message.preview}</div>
              <div className="message-time">{message.time}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    
    calendar: (
      <div className="full-content-card">
        <h2 className="card-title">
          <FiCalendar className="card-icon" /> Academic Calendar
        </h2>
        <div className="deadlines-list full-list">
          {studentData.upcomingDeadlines.map(deadline => (
            <div key={deadline.id} className="deadline-item large">
              <div className="deadline-info">
                <div className="deadline-title">{deadline.title}</div>
                <div className="deadline-course">{deadline.course}</div>
              </div>
              <div className="deadline-date">
                {deadline.date}
              </div>
            </div>
          ))}
          <div className="deadline-item large">
            <div className="deadline-info">
              <div className="deadline-title">Final Exams</div>
              <div className="deadline-course">All Courses</div>
            </div>
            <div className="deadline-date">
              May 10-20, 2025
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <div className="logo-icon">
            <FiUser className="icon" />
          </div>
          <h1 className="app-title">StudentHub</h1>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}>
              <a href="#" className="nav-link">
                <FiHome className="nav-icon" /> Dashboard
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'courses' ? 'active' : ''}`}
                onClick={() => setActiveTab('courses')}>
              <a href="#" className="nav-link">
                <FiBook className="nav-icon" /> Courses
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'achievements' ? 'active' : ''}`}
                onClick={() => setActiveTab('achievements')}>
              <a href="#" className="nav-link">
                <FiAward className="nav-icon" /> Achievements
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'committees' ? 'active' : ''}`}
                onClick={() => setActiveTab('committees')}>
              <a href="#" className="nav-link">
                <FiUsers className="nav-icon" /> Committees
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
                onClick={() => setActiveTab('messages')}>
              <a href="#" className="nav-link">
                <FiMail className="nav-icon" /> Messages
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`}
                onClick={() => setActiveTab('calendar')}>
              <a href="#" className="nav-link">
                <FiCalendar className="nav-icon" /> Calendar
              </a>
            </li>
          </ul>
        </nav>

        <div className="user-profile">
          <div className="profile-container">
            <img src="/api/placeholder/40/40" className="profile-image" alt="Profile" />
            <div className="profile-info">
              <p className="profile-name">{studentData.name}</p>
              <p className="profile-dept">{studentData.department}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <h2 className="header-title">
            {activeTab === 'dashboard' ? 'Student Dashboard' : 
             activeTab === 'courses' ? 'My Courses' :
             activeTab === 'achievements' ? 'My Achievements' :
             activeTab === 'committees' ? 'My Committees' :
             activeTab === 'messages' ? 'Messages' : 'Academic Calendar'}
          </h2>
          <div className="header-actions">
            <button className="action-button">
              <FiBell className="action-icon" />
            </button>
            <div className="notification-container">
              <span className="notification-badge">3</span>
              <button className="action-button">
                <FiMail className="action-icon" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="main-container">
          {/* Render content based on active tab */}
          {tabComponents[activeTab]}
        </main>
      </div>
    </div>
  );
}

export default StudentLanding;