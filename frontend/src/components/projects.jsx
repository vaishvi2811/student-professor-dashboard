// import { React, useEffect, useState } from 'react';
// import './dashboard.css';

// function ProjectsPage() {
//   const [projects, setProjects] = useState([]);
//   const [newProject, setNewProject] = useState({
//     projectName: '',
//     timeline: '',
//     about: '',
//     contributors: '',
//   });
//   const [editing, setEditing] = useState(false);
//   const [currentProjectId, setCurrentProjectId] = useState(null);

//   const fetchProjects = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/v1/auth/projects", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       const data = await response.json();
//       setProjects(data.projects); 
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const handleAddProject = async () => {
//     const response = await fetch("http://localhost:5000/api/v1/auth/create-project", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify(newProject),
//     });

//     if (response.ok) {
//       setNewProject({ projectName: '', timeline: '', about: '', contributors: '' });
//       fetchProjects();
//     }
//   };

//   const handleEditProject = async () => {
//     const response = await fetch(`http://localhost:5000/api/v1/auth/update-project/${currentProjectId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify(newProject),
//     });

//     if (response.ok) {
//       setNewProject({ projectName: '', timeline: '', about: '', contributors: '' });
//       setEditing(false);
//       setCurrentProjectId(null);
//       fetchProjects();
//     }
//   };

//   const handleDeleteProject = async (id) => {
//     const response = await fetch(`http://localhost:5000/api/v1/auth/delete-project/${id}`, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     if (response.ok) {
//       fetchProjects();
//     }
//   };

//   return (
//     <div className="main-container">
//       <h2 className="header-title">My Projects</h2>
//       <div className="achievements-list">
//         {projects.length > 0 ? projects.map((p) => (
//           <div key={p._id} className="achievement-item dashboard-card">
//             <div className="achievement-title">{p.projectName}</div>
//             <div className="achievement-date">{p.timeline}</div>
//             <div className="achievement-desc">{p.about}</div>
//             {p.contributors && <div className="achievement-desc"><strong>Contributors:</strong> {p.contributors}</div>}
//             <div className="achievement-actions">
//               <button className="btn-edit" onClick={() => {
//                 setEditing(true);
//                 setCurrentProjectId(p._id);
//                 setNewProject({
//                   projectName: p.projectName,
//                   timeline: p.timeline,
//                   about: p.about,
//                   contributors: p.contributors || '',
//                 });
//               }}>Edit</button>
//               <button className="btn-delete" onClick={() => handleDeleteProject(p._id)}>Delete</button>
//             </div>
//           </div>
//         )) : (
//           <p>No projects to show.</p>
//         )}
//       </div>

//       <div className="achievement-form dashboard-card">
//         <h3>{editing ? "Edit Project" : "Add New Project"}</h3>
//         <input
//           type="text"
//           className="input-field"
//           placeholder="Project Name"
//           value={newProject.projectName}
//           onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
//         />
//         <input
//           type="text"
//           className="input-field"
//           placeholder="Timeline (e.g. Nov 2024 - Jan 2025)"
//           value={newProject.timeline}
//           onChange={(e) => setNewProject({ ...newProject, timeline: e.target.value })}
//         />
//         <textarea
//           className="input-field"
//           placeholder="About the Project"
//           value={newProject.about}
//           onChange={(e) => setNewProject({ ...newProject, about: e.target.value })}
//         />
//         <input
//           type="text"
//           className="input-field"
//           placeholder="Contributors (comma separated)"
//           value={newProject.contributors}
//           onChange={(e) => setNewProject({ ...newProject, contributors: e.target.value })}
//         />
//         <button className="btn-primary" onClick={editing ? handleEditProject : handleAddProject}>
//           {editing ? "Save Changes" : "Add Project"}
//         </button>
//         {editing && (
//           <button className="btn-cancel" onClick={() => {
//             setEditing(false);
//             setNewProject({ projectName: '', timeline: '', about: '', contributors: '' });
//           }}>Cancel</button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProjectsPage;

// with timeline, above is without timeline
import React, { useEffect, useState } from 'react';
import './dashboard.css';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    projectName: '',
    startDate: '',
    endDate: '',
    about: '',
    contributors: '',
  });
  const [editing, setEditing] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);

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
    const timeline = `${newProject.startDate} - ${newProject.endDate}`;
    const payload = { ...newProject, timeline };
    delete payload.startDate;
    delete payload.endDate;

    const response = await fetch("http://localhost:5000/api/v1/auth/create-project", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setNewProject({ projectName: '', startDate: '', endDate: '', about: '', contributors: '' });
      fetchProjects();
    }
  };

  const handleEditProject = async () => {
    const timeline = `${newProject.startDate} - ${newProject.endDate}`;
    const payload = { ...newProject, timeline };
    delete payload.startDate;
    delete payload.endDate;

    const response = await fetch(`http://localhost:5000/api/v1/auth/update-project/${currentProjectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setNewProject({ projectName: '', startDate: '', endDate: '', about: '', contributors: '' });
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

  return (
    <div className="main-container">
      <h2 className="header-title">My Projects</h2>
      <div className="achievements-list">
        {projects.length > 0 ? projects.map((p) => (
          <div key={p._id} className="achievement-item dashboard-card">
            <div className="achievement-title">{p.projectName}</div>
            <div className="achievement-date">{p.timeline}</div>
            <div className="achievement-desc">{p.about}</div>
            <div className="achievement-desc">
              <strong>Contributors:</strong> {p.contributors || 'None'}
            </div>
            <div className="achievement-actions">
              <button className="btn-edit" onClick={() => {
                setEditing(true);
                setCurrentProjectId(p._id);
                const [start, end] = (p.timeline || '').split(' - ');
                setNewProject({
                  projectName: p.projectName || '',
                  startDate: start || '',
                  endDate: end || '',
                  about: p.about || '',
                  contributors: p.contributors || '',
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
        <div className="date-picker-group">
          <label>Start Date:</label>
          <input
            type="date"
            className="input-field"
            value={newProject.startDate}
            onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
          />
        </div>
        <div className="date-picker-group">
          <label>End Date:</label>
          <input
            type="date"
            className="input-field"
            value={newProject.endDate}
            onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
          />
        </div>
        <textarea
          className="input-field"
          placeholder="About the project"
          value={newProject.about}
          onChange={(e) => setNewProject({ ...newProject, about: e.target.value })}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Contributors (comma-separated)"
          value={newProject.contributors}
          onChange={(e) => setNewProject({ ...newProject, contributors: e.target.value })}
        />
        <button className="btn-primary" onClick={editing ? handleEditProject : handleAddProject}>
          {editing ? "Save Changes" : "Add Project"}
        </button>
        {editing && (
          <button className="btn-cancel" onClick={() => {
            setEditing(false);
            setNewProject({ projectName: '', startDate: '', endDate: '', about: '', contributors: '' });
          }}>Cancel</button>
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;

