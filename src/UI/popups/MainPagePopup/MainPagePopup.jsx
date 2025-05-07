import React from "react";
import { useUser } from "../../context/UserContext/UserProvider";
import "./MainPagePopup.scss";

const MainPagePopup = ({ record, onClose }) => {
  const { user } = useUser();
  // if (!record) return null;
  console.log(record);
  

  return (
    <div className="gradient-border-popup">
      <div className="record-popup">
        <button className="close-btn" onClick={onClose}>
          {" "}
        </button>
        <img src={record.avatar} alt="reden" className="avatar" />

        <div className="stats">
          <div className="stat acc">
            <p>acc</p>
            <strong>{record.accuracy}%</strong>
          </div>

          <div className="stat name">
            <h2>{user.name}</h2>
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
        <div className="gradient-border-popup-btn">
          <button className="restart-btn">try again</button>
        </div>
      </div>
    </div>
  );
};

export default MainPagePopup;
