import React from "react";
import "./MainPagePopup.scss";

const MainPagePopup = ({ record, onClose }) => {
  if (!record) return null;

  return (
    <div className="gradient-border-popup">
      <div className="record-popup">
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
            <span>{record.lang}</span>
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
        <div className="gradient-border-popup-btn">
          <button className="restart-btn">try again</button>
        </div>
      </div>
    </div>
  );
};

export default MainPagePopup;