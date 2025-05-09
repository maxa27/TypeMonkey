import React, { useEffect, useState, useRef } from "react";
import "./Profile.scss";
import { useUser } from "../../context/UserContext/UserProvider.jsx";

const Profile = () => {
  const { user, logout } = useUser();
  const [rank, setRank] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [inputData, setInputData] = useState(null)
  const [name, setName] = useState(null);

  useEffect(() => {
    if (!user) return;

    if (!name && !avatar) {
      setName(user.name);
      setAvatar(user.avatar);
      setInputData(user.name)
    }

    const fetchData = async () => {
      const saved = JSON.parse(localStorage.getItem("user"));
      const response = await window.api.call("getUserById", [saved.id]);
      const responseRank = await window.api.call("getBestUserRank", [saved.id]);

      if (responseRank.success) setRank(responseRank.data.rank);
      if (response.success) {
        setEmail(response.data.email);
        setAvatar(response.data.avatar);
      }
    };
    fetchData();
  }, [name, avatar, user]);

  const handleNameChange = async () => {
    const res = await window.api.call("updateUserName", [user.id, inputData]);
    if (res.success) {
      setIsEditingName(false);
      setName(inputData);
      user.name = inputData
      localStorage.setItem("user", JSON.stringify({ ...user, name: inputData }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;

      // 1. Сохраняем локально
      setAvatar(base64);

      // 2. Отправка в БД через API, если нужно:

      const res = await window.api.call("updateUserAvatar", [user.id, base64]);
      if (res.success) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, avatar: base64 })
        );
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <h3>profile</h3>
        <div className="profile-block">
          <div className="profile-pic-wrapper">
            <img className="profile-pic" src={avatar} alt="Profile" />
            <label htmlFor="avatar-upload" className="pic-overlay">
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
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </div>

          <div className="description">
            <div className="el-block">
              <p className="el-first">name</p>
              {isEditingName ? (
                <div className="edit-name-wrapper">
                  <input
                    className="name-input"
                    value={inputData}
                    onChange={(e) => {
                      setInputData(e.target.value)
                    }}
                  />
                  <button className="check-btn" onClick={handleNameChange}>
                    ✓
                  </button>
                </div>
              ) : (
                <div className="value-with-button">
                  <p className="el-second">{name}</p>
                  <button
                    className="change-btn"
                    onClick={() => {
                      setIsEditingName(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <g id="pencil_line" fill="none">
                        <path d="M24 0v24H0V0z" />
                        <path
                          className="pencil"
                          d="M16.035 3.015a3 3 0 0 1 4.099-.135l.144.135.707.707a3 3 0 0 1 .135 4.098l-.135.144L9.773 19.177a1.5 1.5 0 0 1-.562.354l-.162.047-4.454 1.028a1.001 1.001 0 0 1-1.22-1.088l.02-.113 1.027-4.455a1.5 1.5 0 0 1 .29-.598l.111-.125zm-.707 3.535-8.99 8.99-.636 2.758 2.758-.637 8.99-8.99-2.122-2.12Zm3.536-2.121a1 1 0 0 0-1.32-.083l-.094.083-.708.707 2.122 2.121.707-.707a1 1 0 0 0 .083-1.32l-.083-.094z"
                        />
                      </g>
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div className="el-block">
              <p className="el-first">email</p>
              <p className="el-second">{email || "не указано"}</p>
            </div>

            <div className="el-block">
              <p className="el-first">rank</p>
              <p className="el-second">{rank || "неизвестно"}</p>
            </div>
          </div>

          <button onClick={logout} className="logout-btn">
            выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
