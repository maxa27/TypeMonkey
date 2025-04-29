import React from "react";
import './Profile.scss';
import ProfilePic from "../../assets/ProfilePic.jpg";

const InfoBlock = ({ label, value }) => (
    <div className="el-block">
      <p className="el-first">{label}</p>
      {label === "name" ? (
        <div className="value-with-button">
          <p className="el-second">{value}</p>
          <button className="change-btn">change name</button>
        </div>
      ) : (
        <p className="el-second">{value}</p>
      )}
    </div>
  );
  

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-container">
        <h3>profile</h3>
        <div className="profile-block">
          <div className="profile-pic-wrapper">
            <img className="profile-pic" src={ProfilePic} alt="Profile" />
            <div className="pic-overlay">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M15.232 5.232l3.536 3.536M4 20h4.586a1 1 0 0 0 .707-.293l9.9-9.9a1 1 0 0 0 0-1.414l-3.536-3.536a1 1 0 0 0-1.414 0l-9.9 9.9A1 1 0 0 0 4 15.414V20z" />
              </svg>
            </div>
          </div>
          <div className="description">
            <InfoBlock label="name" value="qu1xx" />
            <InfoBlock label="email" value="lexicplexik000@gmail.com" />
            <InfoBlock label="rank" value="#1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
