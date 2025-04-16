import  { React, useEffect, useState } from 'react';
import './dashboard.css';

function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState({
    dateReceived: '',
    description: '',
    title: '',
  });
  const [editing, setEditing] = useState(false);
  const [currentAchievementId, setCurrentAchievementId] = useState(null);

  const fetchAchievements = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/achievements", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      console.log(data);
      setAchievements(data.achievements); 
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleAddAchievement = async () => {
    const response = await fetch("http://localhost:5000/api/v1/auth/create-achievement", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newAchievement),
    });

    if (response.ok) {
      setNewAchievement({ title: '', dateReceived: '', description: '' });
      fetchAchievements();
    }
  };

  const handleEditAchievement = async () => {
    const response = await fetch(`http://localhost:5000/api/v1/auth/update-achievement/${currentAchievementId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newAchievement),
    });

    if (response.ok) {
      setNewAchievement({ title: '', dateReceived: '', description: '' });
      setEditing(false);
      setCurrentAchievementId(null);
      fetchAchievements();
    }
  };

  const handleDeleteAchievement = async (id) => {
    const response = await fetch(`http://localhost:5000/api/v1/auth/delete-achievement/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      fetchAchievements();
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="main-container">
      <h2 className="header-title">My Achievements</h2>
      <div className="achievements-list">
        {achievements.length > 0 ? achievements.map((a) => (
          <div key={a._id} className="achievement-item dashboard-card">
            <div className="achievement-title">{a.title}</div>
            <div className="achievement-date">{formatDate(a.dateReceived)}</div>
            <div className="achievement-desc">{a.description}</div>
            <div className="achievement-actions">
              <button className="btn-edit" onClick={() => {
                setEditing(true);
                setCurrentAchievementId(a._id);
                setNewAchievement({
                  title: a.title,
                  dateReceived: formatDate(a.dateReceived),
                  description: a.description
                });
              }}>Edit</button>
              <button className="btn-delete" onClick={() => handleDeleteAchievement(a._id)}>Delete</button>
            </div>
          </div>
        )) : (
          <p>No achievements to show.</p>
        )}
      </div>

      <div className="achievement-form dashboard-card">
        <h3>{editing ? "Edit Achievement" : "Add New Achievement"}</h3>
        <input
          type="text"
          className="input-field"
          placeholder="Title"
          value={newAchievement.title}
          onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
        />
        <input
          type="date"
          className="input-field"
          value={newAchievement.dateReceived}
          onChange={(e) => setNewAchievement({ ...newAchievement, dateReceived: e.target.value })}
        />
        <textarea
          className="input-field"
          placeholder="Description"
          value={newAchievement.description}
          onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
        />
        <button className="btn-primary" onClick={editing ? handleEditAchievement : handleAddAchievement}>
          {editing ? "Save Changes" : "Add Achievement"}
        </button>
        {editing && (
          <button className="btn-cancel" onClick={() => {
            setEditing(false);
            setNewAchievement({ title: '', dateReceived: '', description: '' });
          }}>Cancel</button>
        )}
      </div>
    </div>
  );
}

export default AchievementsPage;

