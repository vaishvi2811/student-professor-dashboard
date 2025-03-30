import React, { useState } from 'react';
import { FiHome, FiUser, FiChevronRight, FiSearch, FiFilter, FiDownload, FiMail, FiBook, FiBarChart2 } from 'react-icons/fi';
import './coursestudents.css';
import { useParams } from "react-router-dom";


function CourseStudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const { id } = useParams(); 
  
  // Mock course data
  const courseData = {
    id: 1,
    code: "CS301",
    name: "Database Management Systems",
    semester: "Spring 2025",
    section: "A",
    totalStudents: 42,
    averageGrade: "B+",
    meetingTimes: "Mon/Wed 10:00 AM - 11:30 AM",
    location: "Science Building, Room 205"
  };
  
  // Mock student data
  const allStudents = [
    { id: 1, regId: "CS2023001", name: "Alex Johnson", department: "Computer Science", grade: "A", attendance: "92%", email: "ajohnson@university.edu", avatar: "/api/placeholder/40/40" },
    { id: 2, regId: "CS2023045", name: "Jamie Smith", department: "Computer Science", grade: "B+", attendance: "88%", email: "jsmith@university.edu", avatar: "/api/placeholder/40/40" },
    { id: 3, regId: "EE2023012", name: "Taylor Williams", department: "Electrical Engineering", grade: "A-", attendance: "95%", email: "twilliams@university.edu", avatar: "/api/placeholder/40/40" },
    { id: 4, regId: "CS2022089", name: "Morgan Brown", department: "Computer Science", grade: "B", attendance: "85%", email: "mbrown@university.edu", avatar: "/api/placeholder/40/40" },
    { id: 5, regId: "IS2023056", name: "Jordan Lee", department: "Information Systems", grade: "A", attendance: "98%", email: "jlee@university.edu", avatar: "/api/placeholder/40/40" },
    { id: 6, regId: "CS2023023", name: "Casey Miller", department: "Computer Science", grade: "C+", attendance: "75%", email: "cmiller@university.edu", avatar: "/api/placeholder/40/40" },
    { id: 7, regId: "IS2022078", name: "Riley Garcia", department: "Information Systems", grade: "B+", attendance: "90%", email: "rgarcia@university.edu", avatar: "/api/placeholder/40/40" },
    { id: 8, regId: "CS2023102", name: "Quinn Thompson", department: "Computer Science", grade: "A-", attendance: "93%", email: "qthompson@university.edu", avatar: "/api/placeholder/40/40" },
    { id: 9, regId: "EE2023034", name: "Avery Martinez", department: "Electrical Engineering", grade: "B", attendance: "87%", email: "amartinez@university.edu", avatar: "/api/placeholder/40/40" },
    { id: 10, regId: "CS2022112", name: "Reese Clark", department: "Computer Science", grade: "B-", attendance: "82%", email: "rclark@university.edu", avatar: "/api/placeholder/40/40" },
  ];
  
  // Filter students based on search query and department filter
  const filteredStudents = allStudents.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.regId.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesDepartment = 
      selectedDepartment === 'All' || 
      student.department === selectedDepartment;
      
    return matchesSearch && matchesDepartment;
  });
  
  // Get unique departments for filter
  const departments = ['All', ...new Set(allStudents.map(student => student.department))];
  
  const handleStudentClick = (studentId) => {
    // This would navigate to the student landing page in a real application
    console.log(`Navigating to student profile: ${studentId}`);
    // Example of how this would be implemented with react-router:
    // history.push(`/students/${studentId}`);
  };
  
  return (
    <div className="app-container">
      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="main-header">
          <div className="breadcrumb">
            <a href="#" className="breadcrumb-item"><FiHome /> Home</a>
            <FiChevronRight className="breadcrumb-separator" />
            <a href="#" className="breadcrumb-item">Courses</a>
            <FiChevronRight className="breadcrumb-separator" />
            <span className="breadcrumb-item active">{courseData.code}</span>
          </div>
          <div className="header-actions">
            <button className="icon-button">
              <FiMail />
            </button>
            <button className="icon-button">
              <FiBook />
            </button>
            <button className="icon-button">
              <FiBarChart2 />
            </button>
          </div>
        </header>

        {/* Course Header */}
        <div className="course-header">
          <div className="course-info">
            <div className="course-code">{courseData.code}</div>
            <h1 className="course-title">{courseData.name}</h1>
            <div className="course-meta">
              <span className="course-meta-item">{courseData.semester}</span>
              <span className="course-meta-item">Section {courseData.section}</span>
              <span className="course-meta-item">{courseData.meetingTimes}</span>
              <span className="course-meta-item">{courseData.location}</span>
            </div>
          </div>
          <div className="course-stats">
            <div className="stat-card">
              <div className="stat-value">{courseData.totalStudents}</div>
              <div className="stat-label">Students</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{courseData.averageGrade}</div>
              <div className="stat-label">Avg. Grade</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="course-tabs">
          <button className="tab-button active">Students</button>
          <button className="tab-button">Assignments</button>
          <button className="tab-button">Grades</button>
          <button className="tab-button">Materials</button>
          <button className="tab-button">Announcements</button>
        </div>

        {/* Student List */}
        <div className="students-container">
          {/* Search and Filters */}
          <div className="students-toolbar">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search students..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-container">
              <FiFilter className="filter-icon" />
              <select 
                className="filter-select"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <button className="export-button">
              <FiDownload className="button-icon" />
              Export List
            </button>
          </div>
          
          {/* Students Table */}
          <div className="table-container">
            <table className="students-table">
              <thead>
                <tr>
                  <th>Registration ID</th>
                  <th>Student Name</th>
                  <th>Department</th>
                  <th>Current Grade</th>
                  <th>Attendance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <tr key={student.id} onClick={() => handleStudentClick(student.id)}>
                    <td>{student.regId}</td>
                    <td>
                      <div className="student-info">
                        <img src={student.avatar} alt={student.name} className="student-avatar" />
                        <div className="student-details">
                          <div className="student-name">{student.name}</div>
                          <div className="student-email">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{student.department}</td>
                    <td>
                      <span className={`grade-badge grade-${student.grade.charAt(0).toLowerCase()}`}>
                        {student.grade}
                      </span>
                    </td>
                    <td>{student.attendance}</td>
                    <td>
                      <button className="view-profile-button">
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseStudentsPage;