import React from "react";
import { useUser } from "../../context/UserContext/UserProvider";
import "./MainPagePopup.scss";

const MainPagePopup = ({ record, onClose }) => {
  const { user } = useUser();
  // if (!record) return null;

  return (
    <div className="gradient-border-popup">
      <div className="record-popup">
        <button className="close-btn" onClick={onClose}>
          {" "}
        </button>
        <img src={"https://i.pinimg.com/736x/be/fe/3d/befe3d6afd4f82019769063e93346167.jpg"} alt="reden" className="avatar" />

        <div className="stats">
          <div className="stat acc">
            <p>acc</p>
            <strong>{record.accuracy}%</strong>
          </div>

          <div className="stat name">
            <h2>reden</h2>
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
            <strong>#1</strong>
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
