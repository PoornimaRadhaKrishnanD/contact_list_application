import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function AllContacts() {
  const [contacts, setContacts] = useState([]);
  const fetchContacts = () => {
    fetch('http://localhost:8080/showall')
      .then(res => res.json())
      .then(data => {
        const sortedData = data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setContacts(sortedData);
      });
  };
  useEffect(() => {
    fetchContacts();
  }, []);
  const handleDelete = async (phone) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const response = await fetch('http://localhost:8080/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone })
        });
        if (response.ok) {
          alert("Contact deleted (soft-delete).");
          fetchContacts();
        } else {
          alert("Failed to delete contact.");
        }
      } catch (err) {
        console.error(err);
        alert("Error deleting contact.");
      }
    }
  };
  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = '#0056b3';
  };
  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = 'transparent';
  };
  return (
    <div style={containerStyle}>
      <div style={innerContainerStyle}>
        <h2 style={headerStyle}>📒 All Contacts</h2>
        <div style={navBarStyle}>
          <Link to="/" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>🏠 Home</Link>
          <Link to="/show" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>🔍 Show Contact</Link>
          <Link to="/all" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>📋 All Contacts</Link>
          <Link to="/deleted" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>🗑️ Deleted Contacts</Link>
        </div>
        <ul style={ulStyle}>
          {contacts.map((c, i) => (
            <li key={i} style={liStyle}>
              <div style={contactContentStyle}>
                <div>
                  <strong>{c.name}</strong><br />
                  📞 {c.phone}<br />
                  📧 {c.email}
                </div>
                <button style={deleteButtonStyle} onClick={() => handleDelete(c.phone)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  backgroundColor: '#f4f4f9',
  padding: '20px',
  fontFamily: 'Arial, sans-serif'
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
  textAlign: 'center'
};
const headerStyle = {
  marginBottom: '20px',
  textAlign: 'center',
  color: '#333',
  fontSize: '28px'
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
  boxShadow: '0 2px 10px rgba(16, 15, 15, 0.1)'
};
const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'bold',
  padding: '5px 10px',
  borderRadius: '6px',
  transition: 'background 0.3s ease',
  backgroundColor: 'transparent'
};
const ulStyle = {
  listStyleType: 'none',
  padding: '0',
  width: '100%',
  maxWidth: '500px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
};
const liStyle = {
  padding: '12px 20px',
  borderBottom: '1px solid #eee',
  fontSize: '16px'
};
const contactContentStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};
const deleteButtonStyle = {
  backgroundColor: '#ff4d4d',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer'
};
export default AllContacts;