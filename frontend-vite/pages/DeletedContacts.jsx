import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function DeletedContacts() {
  const [deletedContacts, setDeletedContacts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:8080/deleted')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
        setDeletedContacts(sorted);
      });
  }, []);
  const handleRestore = (contact) => {
    const { _id, ...rest } = contact;
    fetch('http://localhost:8080/restore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: rest.phone, name: rest.name, email: rest.email })
    })
      .then(res => {
        if (res.ok) {
          return fetch(`http://localhost:8080/deleted/${_id}`, {
            method: 'DELETE',
          });
        } else {
          throw new Error('Failed to add back to contacts.');
        }
      })
      .then(() => {
        setDeletedContacts(prev => prev.filter(c => c._id !== _id));
        navigate('/all');
      })
      .catch(err => {
        console.error(err);
        alert('Something went wrong while restoring the contact.');
      });
  };
  return (
    <div style={containerStyle}>
      <div style={innerContainerStyle}>
        <h2 style={headerStyle}>🗑️ Deleted Contacts</h2>
        <div style={navBarStyle}>
          <Link to="/" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>🏠 Home</Link>
          <Link to="/show" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>🔍 Show Contact</Link>
          <Link to="/all" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>📋 All Contacts</Link>
          <Link to="/deleted" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>🗑️ Deleted Contacts</Link>
        </div>
        <div style={contentStyle}>
          {deletedContacts.length === 0 ? (
            <p style={noContactsStyle}>No deleted contacts found.</p>
          ) : (
            <ul style={listStyle}>
              {deletedContacts.map((contact, index) => (
                <li key={index} style={listItemStyle}>
                  <div>
                    <strong>{contact.name}</strong><br />
                    📞 {contact.phone}<br />
                    📧 {contact.email}
                  </div>
                  <button
                    onClick={() => handleRestore(contact)}
                    style={buttonStyle}
                  >
                    Restore
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
const containerStyle = {
  display: 'flex',
  height: '100vh',
  width: '100vw',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f4f4f9',
  padding: '20px',
};
const innerContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '600px',
  textAlign: 'center',
};
const headerStyle = {
  marginBottom: '20px',
  color: '#333',
};
const navBarStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '30px',
  padding: '5px 10px',
  backgroundColor: 'skyblue',
  borderRadius: '10px',
  width: '100%',
  boxShadow: '0 2px 10px rgba(16, 15, 15, 0.1)',
};
const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'bold',
  padding: '5px 10px',
  borderRadius: '6px',
  transition: 'background 0.3s ease',
  backgroundColor: 'transparent',
};
const contentStyle = {
  width: '100%',
  maxWidth: '600px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
const noContactsStyle = {
  fontSize: '16px',
  color: '#888',
};
const listStyle = {
  listStyle: 'none',
  padding: 0,
  width: '100%',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
};
const listItemStyle = {
  padding: '12px 20px',
  borderBottom: '1px solid #eee',
  fontSize: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};
const buttonStyle = {
  padding: '6px 12px',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};
const handleMouseEnter = (e) => {
  e.target.style.backgroundColor = '#0056b3';
};
const handleMouseLeave = (e) => {
  e.target.style.backgroundColor = 'transparent';
};
export default DeletedContacts;