import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useContactApi from '../hooks/useContactApi';
const Home = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const { data, error, callApi } = useContactApi();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAction = (action) => {
    const endpoint = action;
    const method = action === 'showall' ? 'GET' : 'POST';
    const body = method === 'POST' ? formData : null;
    callApi(endpoint, method, body);
  };
  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = '#0056b3';
  };
  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = 'transparent';
  };
  return (
    <div style={{
      display: 'flex', height: '100vh', width: '100vw', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f9', padding: '20px'
    }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '600px', textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>
          Welcome to Contact Manager 📱
        </h2>
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '30px', padding: '5px 10px', backgroundColor: 'skyblue', borderRadius: '10px', width: '100%', boxShadow: '0 2px 10px rgba(16, 15, 15, 0.1)'
        }}>
          <Link to="/" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>🏠 Home</Link>
          <Link to="/show" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>🔍 Show Contact</Link>
          <Link to="/all" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>📋 All Contacts</Link>
          <Link to="/deleted" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>🗑️ Deleted Contacts</Link>
        </div>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} style={inputStyle} />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required style={inputStyle} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={inputStyle} />
        <div style={{
          marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center'
        }}>
          <button onClick={() => handleAction('save')} style={buttonGreen}>💾 Save</button>
          <button onClick={() => handleAction('update')} style={buttonOrange}>✏️ Update</button>
          <button onClick={() => handleAction('delete')} style={buttonRed}>🗑️ Delete</button>
        </div>
        {data && <pre style={{ marginTop: '20px', color: '#333', textAlign: 'left' }}>{JSON.stringify(data, null, 2)}</pre>}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>
    </div>
  );
};
const inputStyle = {
  padding: '10px', width: '100%', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px'
};
const linkStyle = {
  color: 'white', textDecoration: 'none', fontWeight: 'bold', padding: '5px 10px', borderRadius: '6px', transition: 'background 0.3s ease', backgroundColor: 'transparent'
};
const buttonBase = {
  padding: '10px 15px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
};
const buttonGreen = { ...buttonBase, backgroundColor: '#4CAF50' };
const buttonOrange = { ...buttonBase, backgroundColor: '#FFA500' };
const buttonRed = { ...buttonBase, backgroundColor: '#f44336' };
export default Home;