import React, { useEffect, useState } from "react";
import "./dashboard.css";

function ProfCoursePage() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    description: "",
    teacher: null,
    class: {
      branch: "",
      sem: "",
    },
  });
  const [editing, setEditing] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setCourses(data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Add a new course
  const handleAddCourse = async () => {
    if (!newCourse.courseName || !newCourse.description || !newCourse.class.branch || !newCourse.class.sem) {
      alert("Please fill in all fields.");
      return;
    }

    const payload = {
      name: newCourse.courseName,
      description: newCourse.description,
      teacher: newCourse.teacher?._id,
      class: newCourse.class,
    };

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/create-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setNewCourse({
          courseName: "",
          description: "",
          teacher: null,
          class: { branch: "", sem: "" },
        });
        fetchCourses();
      } else {
        console.error("Failed to create course");
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  // Edit an existing course
  const handleEditCourse = async () => {
    const payload = {
      name: newCourse.courseName,
      description: newCourse.description,
      teacher: newCourse.teacher?._id,
      class: newCourse.class,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/v1/auth/update-course/${currentCourseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setNewCourse({
          courseName: "",
          description: "",
          teacher: null,
          class: { branch: "", sem: "" },
        });
        setEditing(false);
        setCurrentCourseId(null);
        fetchCourses();
      } else {
        console.error("Failed to update course");
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // Delete a course
  const handleDeleteCourse = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/auth/delete-course/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        fetchCourses();
      } else {
        console.error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Search for professors
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(`http://localhost:5000/api/v1/auth/search-professor?name=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.professors || []);
      } else {
        console.error("Failed to fetch professors");
      }
    } catch (error) {
      console.error("Error searching professors:", error);
    }
  };

  // Add a teacher to the course
  const addTeacher = (teacher) => {
    setNewCourse({ ...newCourse, teacher });
    setSearchResults([]);
    setSearchQuery("");
  };

  return (
    <div className="main-container">
      <h2 className="header-title">My Courses</h2>

      <div className="achievements-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="achievement-item dashboard-card">
              <div className="achievement-title">{course.name}</div>
              <div className="achievement-desc">{course.description}</div>
              <div className="achievement-desc">
                <strong>Teacher:</strong> {course.teacher?.name || "None"}
              </div>
              <div className="achievement-desc">
                <strong>Class:</strong> {course.class.branch}, Semester {course.class.sem}
              </div>
              <div className="achievement-actions">
                <button
                  className="btn-edit"
                  onClick={() => {
                    setEditing(true);
                    setCurrentCourseId(course._id);
                    setNewCourse({
                      courseName: course.name || "",
                      description: course.description || "",
                      teacher: course.teacher || null,
                      class: course.class || { branch: "", sem: "" },
                    });
                  }}
                >
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDeleteCourse(course._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No courses to show.</p>
        )}
      </div>

      <div className="achievement-form dashboard-card">
        <h3>{editing ? "Edit Course" : "Add New Course"}</h3>
        <input
          type="text"
          className="input-field"
          placeholder="Course Name"
          value={newCourse.courseName}
          onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
        />
        <textarea
          className="input-field"
          placeholder="Course Description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
        />
        <div className="input-field">
          <input
            type="text"
            placeholder="Search professors by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <ul className="search-results">
            {searchResults.map((professor) => (
              <li key={professor._id} onClick={() => addTeacher(professor)}>
                {professor.name} ({professor.email})
              </li>
            ))}
          </ul>
        </div>
        <div className="contributors-list">
          <strong>Selected Teacher:</strong> {newCourse.teacher?.name || "None"}
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Branch</label>
            <select
              className="input-field"
              value={newCourse.class.branch}
              onChange={(e) =>
                setNewCourse({ ...newCourse, class: { ...newCourse.class, branch: e.target.value } })
              }
            >
              <option value="">Select Branch</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="Electrical">Electrical</option>
            </select>
          </div>
          <div className="form-group">
            <label>Semester</label>
            <select
              className="input-field"
              value={newCourse.class.sem}
              onChange={(e) =>
                setNewCourse({ ...newCourse, class: { ...newCourse.class, sem: e.target.value } })
              }
            >
              <option value="">Select Semester</option>
              {[...Array(8)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="btn-primary" onClick={editing ? handleEditCourse : handleAddCourse}>
          {editing ? "Save Changes" : "Add Course"}
        </button>
        {editing && (
          <button
            className="btn-cancel"
            onClick={() => {
              setEditing(false);
              setNewCourse({
                courseName: "",
                description: "",
                teacher: null,
                class: { branch: "", sem: "" },
              });
              setSearchResults([]);
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfCoursePage;