import React, { useState } from 'react';
import  './Signup.css';  
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/signup', {
        name,
        email,
        password,
      });
      // Check if response has data and display the message
      if (response && response.data) {
        alert(response.data.message);
        navigate('/login');
      } else {
        alert('Signup successful, but no message from the server.');
      }
    } catch (error) {
      // Safely check if the error contains a response and an error message
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('An error occurred during signup.');
      }
    }
  };

  return (
    
    <>
    <div className="signup-page">
     
      <div className="signup-right">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Welcome to MoodMoon<span>👋</span></h2>
          <p>Please SignUp with your details here</p>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="signup-button">SignUp</button>
          <p>Already have account <Link to="/login" className="btn">Login</Link></p>
        </form>
      </div>
    </div>
  </>
  );
};

export default Signup;
