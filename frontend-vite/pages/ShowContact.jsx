import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const ShowContact = () => {
  const [searchType, setSearchType] = useState('phone');
  const [searchQuery, setSearchQuery] = useState('');
  const [contact, setContact] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSearch = async () => {
    if (!searchQuery) {
      setErrorMessage('Please enter a search query.');
      return;
    }
    setErrorMessage('');
    try {
      const response = await fetch(`http://localhost:8080/search/${searchType}/${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          setContact(null);
          setErrorMessage(data.message);
        } else {
          setContact(data);
        }
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.error(error);
      setContact(null);
      setErrorMessage('Contact Not Found. Please try again.');
    }
  };
  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = '#0056b3';
  };
  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = 'transparent';
  };
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f4f4f9',
      padding: '20px'
    }}>
      <div style={{
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
      }}>
        <h2 style={{
          marginBottom: '20px',
          textAlign: 'center',
          fontSize: '28px',
          fontWeight: 'bold',
          color: 'black'
        }}>
          <span style={{ WebkitTextFillColor: 'initial' }}>📇</span> Search for a Contact
        </h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '30px',
          padding: '5px 10px',
          backgroundColor: 'skyblue',
          borderRadius: '10px',
          width: '100%',
          boxShadow: '0 2px 10px rgba(11, 7, 7, 0.1)'
        }}>
          <Link to="/" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>🏠 Home</Link>
          <Link to="/show" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>🔍 Show Contact</Link>
          <Link to="/all" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>📋 All Contacts</Link>
          <Link to="/deleted" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>🗑️ Deleted Contacts</Link>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            style={{
              padding: '8px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              minWidth: '100px'
            }}
          >
            <option value="phone">Phone</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Enter ${searchType}`}
            style={{
              padding: '8px',
              width: '200px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '10px 15px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Search
          </button>
        </div>
        {errorMessage && <div style={{
          color: 'red',
          marginTop: '10px',
          fontSize: '14px'
        }}>{errorMessage}</div>}
        {contact && (
          <div style={{
            marginTop: '20px',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '8px',
            backgroundColor: 'white',
            width: '300px',
            textAlign: 'center'
          }}>
            <h3 style={{
              marginBottom: '15px',
              color: '#333'
            }}>Contact Information</h3>
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Phone:</strong> {contact.phone}</p>
            <p><strong>Email:</strong> {contact.email}</p>
          </div>
        )}
      </div>
    </div>
  );
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
export default ShowContact;