// src/components/ContactForm.jsx
import React, { useState } from 'react';
import useContactApi from '../hooks/useContactApi';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const { sendRequest, data, error } = useContactApi();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = (endpoint) => {
    const method = endpoint === 'show' || endpoint === 'showall' ? 'GET' : 'POST';
    sendRequest(endpoint, method, formData);
  };

  return (
    <div>
      <h2>Contact Form</h2>
      <input name="name" placeholder="Name" onChange={handleChange} /><br />
      <input name="phone" placeholder="Phone" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br /><br />

      <button onClick={() => handleClick('save')}>Save</button>
      <button onClick={() => handleClick('update')}>Update</button>
      <button onClick={() => handleClick('delete')}>Delete</button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default ContactForm;
