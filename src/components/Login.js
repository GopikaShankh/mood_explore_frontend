import React, { useState } from 'react';
import Navbar from './navbar'; 
import './Signup.css'; 
import './Login.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token); 
      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <>

    <div className="login-page">
      
      <div className="login-right">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Welcome Back to MoodMoon<span>👋</span></h2>
          <p>Please Login with your details here</p>
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
            autoComplete='true'
          />
          <button type="submit" className="signup-button">Login</button>
          <p>If you don't have account <Link to="/signup" className="btn">SignUp</Link></p>
        </form>
      </div>
    </div>
  </>
    
  );
};

export default Login;
