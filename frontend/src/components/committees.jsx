import React, { useState } from 'react';
import './dashboard.css';

function CommitteesPage() {
  const [committees, setCommittees] = useState([
    {
      id: 1,
      name: 'CSI VJTI',
      duration: 'Aug 2023 - Present',
      position: 'Executive Member',
    },
    {
      id: 2,
      name: 'IEEE VJTI',
      duration: 'July 2022 - June 2023',
      position: 'Design Head',
    },
    {
      id: 3,
      name: 'GDSC VJTI',
      duration: 'Aug 2022 - May 2023',
      position: 'Web Development Lead',
    },
  ]);

  const [newCommittee, setNewCommittee] = useState({
    name: '',
    duration: '',
    position: '',
  });

  const [editing, setEditing] = useState(false);
  const [currentCommitteeId, setCurrentCommitteeId] = useState(null);

  const handleAddCommittee = () => {
    const newId = committees.length > 0 ? committees[committees.length - 1].id + 1 : 1;
    const newEntry = { id: newId, ...newCommittee };
    setCommittees([...committees, newEntry]);
    setNewCommittee({ name: '', duration: '', position: '' });
  };

  const handleEditCommittee = () => {
    const updatedCommittees = committees.map((c) =>
      c.id === currentCommitteeId ? { ...c, ...newCommittee } : c
    );
    setCommittees(updatedCommittees);
    setEditing(false);
    setCurrentCommitteeId(null);
    setNewCommittee({ name: '', duration: '', position: '' });
  };

  const handleDeleteCommittee = (id) => {
    const filtered = committees.filter((c) => c.id !== id);
    setCommittees(filtered);
  };

  return (
    <div className="main-container">
      <h2 className="header-title">My Committees</h2>
      <div className="achievements-list">
        {committees.length > 0 ? (
          committees.map((c) => (
            <div key={c.id} className="achievement-item dashboard-card">
              <div className="achievement-title">{c.name}</div>
              <div className="achievement-date">{c.duration}</div>
              <div className="achievement-desc">{c.position}</div>
              <div className="achievement-actions">
                <button
                  className="btn-edit"
                  onClick={() => {
                    setEditing(true);
                    setCurrentCommitteeId(c.id);
                    setNewCommittee({
                      name: c.name,
                      duration: c.duration,
                      position: c.position,
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteCommittee(c.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No committees to show.</p>
        )}
      </div>

      <div className="achievement-form dashboard-card">
        <h3>{editing ? 'Edit Committee' : 'Add New Committee'}</h3>
        <input
          type="text"
          className="input-field"
          placeholder="Committee Name"
          value={newCommittee.name}
          onChange={(e) =>
            setNewCommittee({ ...newCommittee, name: e.target.value })
          }
        />
        <input
          type="text"
          className="input-field"
          placeholder="Duration (e.g. Jan 2022 - Dec 2022)"
          value={newCommittee.duration}
          onChange={(e) =>
            setNewCommittee({ ...newCommittee, duration: e.target.value })
          }
        />
        <input
          type="text"
          className="input-field"
          placeholder="Position"
          value={newCommittee.position}
          onChange={(e) =>
            setNewCommittee({ ...newCommittee, position: e.target.value })
          }
        />
        <button
          className="btn-primary"
          onClick={editing ? handleEditCommittee : handleAddCommittee}
        >
          {editing ? 'Save Changes' : 'Add Committee'}
        </button>
        {editing && (
          <button
            className="btn-cancel"
            onClick={() => {
              setEditing(false);
              setNewCommittee({ name: '', duration: '', position: '' });
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default CommitteesPage;