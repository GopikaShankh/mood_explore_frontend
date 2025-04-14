import React, { useState, useEffect } from "react";
import axios from "axios";
import MoodForm from "./MoodForm";
import { Link } from "react-router-dom";
import './HomePage.css';
import Navbar from "./navbar";
import { jwtDecode } from 'jwt-decode'; 
const Dashboard = () => {
    const [moods, setMoods] = useState([]);

    // Fetch moods from the backend
    const fetchMoods = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;


        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            const response = await axios.get(`http://localhost:8080/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMoods(response.data);
        } catch (error) {
            console.error("Error fetching moods:", error);
        }
    };

    useEffect(() => {
        fetchMoods();
    }, []);

    // Add a new mood
    const addMood = async (mood) => {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }

        const decodedToken = jwtDecode(token); 
        const userId = decodedToken.id;

        try {
            const response = await axios.post("http://localhost:8080/", {
                user_id: userId,
                mood: mood.mood,
                message: mood.message // Ensure message is included
            },{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            setMoods([...moods, response.data]);
            console.log('Mood added:', response.data);
            fetchMoods();
        } catch (error) {
            console.error("Error adding mood:", error);
            if (error.response) {
                if (error.response.data) {
                  alert(error.response.data.error || 'An error occurred while logging your workout.');
                  console.log(error.response.data);
                  console.log(error.response.status, error.response.data.error || 'An error occurred while logging your workout.');
                } else {
                  alert('An error occurred: ' + error.message);
                }
              } else {
                alert('Network error or server not reachable. Please try again.');
              }
        }
    };


    // Get the latest mood
    const latestMood = moods.length > 0 ? moods[0] : null;

    return (
        <div id="bg">
            <Navbar />
            <MoodForm onAddMood={addMood} />
            <div className="result-container">
                <h2>Current Mood</h2>
                {latestMood ? (
                    <ul className="mood">
                        <li key={latestMood._id}>
                            <h3>Mood: {latestMood.mood}</h3>
                            <p>Message: {latestMood.message}</p>
                            <p>Date: {new Date(latestMood.date).toLocaleString()}</p>
                            <h4>Suggestions:</h4>
                            <ul className="suggestions">
                                {latestMood.suggestions.map((suggestion, index) => (
                                    <li key={index}>{suggestion}</li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                ) : (
                    <p>No mood to display</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
