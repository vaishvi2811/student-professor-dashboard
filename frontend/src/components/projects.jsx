import React, { useEffect, useState } from 'react';
import './dashboard.css';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    projectName: '',
    startDate: '',
    endDate: '',
    about: '',
    contributors: [],
  });
  const [editing, setEditing] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/projects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async () => {
    const payload = {
      name: newProject.projectName,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      description: newProject.about,
      contributors: newProject.contributors.map(c => c._id),
    };

    const response = await fetch("http://localhost:5000/api/v1/auth/add-project", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setNewProject({ projectName: '', startDate: '', endDate: '', about: '', contributors: [] });
      setSearchResults([]);
      fetchProjects();
    }
  };

  const handleEditProject = async () => {
    const payload = {
      name: newProject.projectName,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      description: newProject.about,
      contributors: newProject.contributors.map(c => c._id),
    };

    const response = await fetch(`http://localhost:5000/api/v1/auth/update-project/${currentProjectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setNewProject({ projectName: '', startDate: '', endDate: '', about: '', contributors: [] });
      setSearchResults([]);
      setEditing(false);
      setCurrentProjectId(null);
      fetchProjects();
    }
  };

  const handleDeleteProject = async (id) => {
    const response = await fetch(`http://localhost:5000/api/v1/auth/delete-project/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      fetchProjects();
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    const response = await fetch(`http://localhost:5000/api/v1/auth/search-student?name=${searchQuery}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setSearchResults(data.students || []);
  };

  const addContributor = (student) => {
    if (!newProject.contributors.some(c => c._id === student._id)) {
      setNewProject({ ...newProject, contributors: [...newProject.contributors, student] });
    }
  };

  const removeContributor = (studentId) => {
    setNewProject({
      ...newProject,
      contributors: newProject.contributors.filter(c => c._id !== studentId),
    });
  };

  return (
    <div className="main-container">
      <h2 className="header-title">My Projects</h2>

      <div className="achievements-list">
        {projects.length > 0 ? projects.map((p) => (
          <div key={p._id} className="achievement-item dashboard-card">
            <div className="achievement-title">{p.name}</div>
            <div className="achievement-date">{new Date(p.startDate).toLocaleDateString()} - {new Date(p.endDate).toLocaleDateString()}</div>
            <div className="achievement-desc">{p.description}</div>
            <div className="achievement-desc">
              <strong>Contributors:</strong> {p.contributors.map(c => c.name).join(', ') || 'None'}
            </div>
            <div className="achievement-actions">
              <button className="btn-edit" onClick={() => {
                setEditing(true);
                setCurrentProjectId(p._id);
                setNewProject({
                  projectName: p.name || '',
                  startDate: p.startDate ? new Date(p.startDate).toISOString().split('T')[0] : '',
                  endDate: p.endDate ? new Date(p.endDate).toISOString().split('T')[0] : '',
                  about: p.description || '',
                  contributors: p.contributors || [],
                });
              }}>Edit</button>
              <button className="btn-delete" onClick={() => handleDeleteProject(p._id)}>Delete</button>
            </div>
          </div>
        )) : (
          <p>No projects to show.</p>
        )}
      </div>

      <div className="achievement-form dashboard-card">
        <h3>{editing ? "Edit Project" : "Add New Project"}</h3>
        <input
          type="text"
          className="input-field"
          placeholder="Project Name"
          value={newProject.projectName}
          onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
        />
        <label>Start Date:</label>
        <input
          type="date"
          className="input-field"
          value={newProject.startDate}
          onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
        />
        <label>End Date:</label>
        <input
          type="date"
          className="input-field"
          value={newProject.endDate}
          onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
        />
        <textarea
          className="input-field"
          placeholder="About the project"
          value={newProject.about}
          onChange={(e) => setNewProject({ ...newProject, about: e.target.value })}
        />

        <div className="input-field">
          <input
            type="text"
            placeholder="Search students by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <ul className="search-results">
            {searchResults.map((student) => (
              <li key={student._id} onClick={() => addContributor(student)}>
                {student.name} ({student.email})
              </li>
            ))}
          </ul>
        </div>

        <div className="contributors-list">
          <strong>Selected Contributors:</strong>
          <ul>
            {newProject.contributors.map((c) => (
              <li key={c._id}>
                {c.name}
                <button onClick={() => removeContributor(c._id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>

        <button className="btn-primary" onClick={editing ? handleEditProject : handleAddProject}>
          {editing ? "Save Changes" : "Add Project"}
        </button>
        {editing && (
          <button className="btn-cancel" onClick={() => {
            setEditing(false);
            setNewProject({ projectName: '', startDate: '', endDate: '', about: '', contributors: [] });
            setSearchResults([]);
          }}>Cancel</button>
        )}
      </div>
      {console.log(projects)}
    </div>
  );
}

export default ProjectsPage;
