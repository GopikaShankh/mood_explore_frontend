import React from "react";
import './App.css';
import './MoodList.css'

const MoodList = ({ moods, onDeleteMood }) => {
   
    return (
        <div className="moodList">
            <h2>Mood List</h2>
            {moods.length === 0 ? (
                <p>No moods to display</p>
            ) : (
                <ul>
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
                            <button onClick={() => onDeleteMood(mood._id)}>Delete</button>
                        </li>

                    ))}
                </ul>
            )}
        </div>
    );
};

export default MoodList;
