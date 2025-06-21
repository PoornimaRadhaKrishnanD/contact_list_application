import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Contact List Application</h1>
      <form>
        <label>Name:</label>
        <input type="text" name="name" />

        <label>Phone:</label>
        <input type="text" name="phone" required />

        <label>Email:</label>
        <input type="email" name="email" />

        <div className="button-container">
          <input
            formaction="http://localhost:8080/save"
            formmethod="post"
            type="submit"
            value="Save Contact"
          />
          <input
            formaction="http://localhost:8080/show"
            formmethod="get"
            type="submit"
            value="Show Contact"
          />
          <input
            formaction="http://localhost:8080/showall"
            formmethod="get"
            type="submit"
            value="Show All Contacts"
          />
          <input
            formaction="http://localhost:8080/update"
            formmethod="post"
            type="submit"
            value="Update Contact"
          />
          <input
            formaction="http://localhost:8080/delete"
            formmethod="post"
            type="submit"
            value="Delete Contact"
          />
        </div>
      </form>
    </div>
  );
}

export default App;
