import React, { useState } from "react";

const MoodForm = ({ onAddMood }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMood = {
      message,
      date: new Date().toISOString(),
    };
    onAddMood(newMood);
    setMessage("");
  };

  return (
    <div className="inputBox">
      <form onSubmit={handleSubmit}>
        <h2 id="sub">Submit Your Mood</h2>
        <div className="inputArea">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How are you feeling?"
            required></textarea>
          <button id="btn" type="submit">Add Mood</button>
        </div>
      </form>
    </div>
  );
};

export default MoodForm;
