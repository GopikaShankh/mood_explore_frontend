import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import "./History.css";
import "./HomePage.css";
import { jwtDecode } from 'jwt-decode'; 

const History = () => {
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
            if (error.response && error.response.status === 404) {
                console.error("Moods not found:", error);
            } else {
                console.error("Error fetching moods:", error);
            }
        }
    };
    
    // Delete a mood
    // Delete a mood
    const deleteMood = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            const response = await axios.delete(`http://localhost:8080/${userId}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Mood deleted:', response.data);
            // Refresh the mood list after deletion
            fetchMoods();
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error("Mood not found:", error);
            } else {
                console.error("Error deleting mood:", error);
            }
        }
    };


    useEffect(() => {
        fetchMoods();
    }, []);

    return (
        <div className="bg">
            <Navbar />
            <h2 id="moodhistory">Mood History</h2>
            {moods.length > 0 ? (
                <ul id="list" className="contain">
                    {moods.map((mood) => (
                        <li key={mood._id}>
                            <h3>Mood: {mood.mood}</h3>
                            <p>Message: {mood.message}</p>
                            <p>Date: {new Date(mood.date).toLocaleString()}</p>
                            <h4>Suggestions:</h4>
                            <ul>
                                {mood.suggestions.map((suggestion, index) => (
                                    <li key={index}>{suggestion}</li>
                                ))}
                            </ul>
                            <button onClick={() => deleteMood(mood._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No moods available.</p>
            )}
        </div>
    );
};

export default History;
