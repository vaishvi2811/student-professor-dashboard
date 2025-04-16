import React, { useEffect, useState } from 'react';
import './dashboard.css';

function RecentPublications() {
  const [publications, setPublications] = useState([]);
  const [newPublication, setNewPublication] = useState({
    title: '',
    journal: '',
    publicationDate: '',
    description: '',
  });
  const [editing, setEditing] = useState(false);
  const [currentPubId, setCurrentPubId] = useState(null);

  const fetchPublications = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/publications', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setPublications(data.publications);
    } catch (err) {
      console.error('Error fetching publications:', err);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  const handleAddPublication = async () => {
    const response = await fetch('http://localhost:5000/api/v1/auth/create-publication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(newPublication),
    });

    if (response.ok) {
      setNewPublication({ title: '', journal: '', publicationDate: '', description: '' });
      fetchPublications();
    }
  };

  const handleEditPublication = async () => {
    const response = await fetch(`http://localhost:5000/api/v1/auth/update-publication/${currentPubId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(newPublication),
    });

    if (response.ok) {
      setNewPublication({ title: '', journal: '', publicationDate: '', description: '' });
      setEditing(false);
      setCurrentPubId(null);
      fetchPublications();
    }
  };

  const handleDeletePublication = async (id) => {
    const response = await fetch(`http://localhost:5000/api/v1/auth/delete-publication/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      fetchPublications();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPublication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="main-container">
      <h2 className="header-title">Recent Publications</h2>

      <div className="form-section">
        <input
          type="text"
          name="title"
          value={newPublication.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="form-input"
        />
        <input
          type="text"
          name="journal"
          value={newPublication.journal}
          onChange={handleInputChange}
          placeholder="Journal Name"
          className="form-input"
        />
        <input
          type="date"
          name="publicationDate"
          value={newPublication.publicationDate}
          onChange={handleInputChange}
          className="form-input"
        />
        <input
          type="text"
          name="description"
          value={newPublication.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="form-input"
        />

        {editing ? (
          <button className="form-button" onClick={handleEditPublication}>
            Update
          </button>
        ) : (
          <button className="form-button" onClick={handleAddPublication}>
            Add
          </button>
        )}
      </div>

      <div className="list-section">
        {publications.map((pub) => (
          <div key={pub._id} className="entry-card">
            <h3>{pub.title}</h3>
            <p><strong>Journal:</strong> {pub.journal}</p>
            <p><strong>Date:</strong> {formatDate(pub.publicationDate)}</p>
            <p><strong>Description:</strong> {pub.description}</p>
            <div className="card-buttons">
              <button
                onClick={() => {
                  setNewPublication({
                    title: pub.title,
                    journal: pub.journal,
                    publicationDate: formatDate(pub.publicationDate),
                    description: pub.description,
                  });
                  setCurrentPubId(pub._id);
                  setEditing(true);
                }}
                className="edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePublication(pub._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentPublications;
