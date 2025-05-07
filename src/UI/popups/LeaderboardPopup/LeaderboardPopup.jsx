import React from "react";
import "./LeaderboardPopup.scss";

const LeaderboardPopup = ({ record, onClose }) => {
  if (!record) return null;

  return (
    <div className="gradient-border-popup">
      <div className="leaderboard-record-popup">
        <button className="close-btn" onClick={onClose}>
          {" "}
        </button>
        <img src={record.avatar} alt={record.name} className="avatar" />

        <div className="stats">
          <div className="stat acc">
            <p>acc</p>
            <strong>{record.accuracy}%</strong>
          </div>

          <div className="stat name">
            <h2>{record.name}</h2>
          </div>

          <div className="stat wpm">
            <p>wpm</p>
            <strong>{record.wpm}</strong>
          </div>

          <div className="stat test">
            <p>test type</p>
            <strong>time {record.time}</strong>
            <span>{record.language}</span>
          </div>

          <div className="stat leaderboard">
            <p>leaderboard</p>
            <strong>#{record.rank}</strong>
          </div>

          <div className="stat chars">
            <p>characters</p>
            <strong>{record.characters}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPopup;
