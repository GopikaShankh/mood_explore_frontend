import React from 'react';
import './HomePage.css';
import './navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/dashboard");
    };
    const handleHistory = () => {
        navigate("/history");
    };

    return (
       <header className="header">
                <div className="logo">
                    <img src="logo1.png" alt="Mood App Logo" />
                    <h1>MOODMOON</h1>
                </div>
                <div className="nav-buttons">
                    <button onClick={handleLogin}>Home</button>
                    <button onClick={handleHistory}>History</button>
                </div>
            </header>
    );
};

export default Navbar;