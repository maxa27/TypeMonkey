import React, { useState, useContext } from "react";
import "./Leaderboard.scss";
import { FaClock, FaGlobe } from "react-icons/fa";
import Delete from "../../assets/icons/Delete";
import LeaderboardPopup from "../../popups/LeaderboardPopup/LeaderboardPopup";
import { usePopup } from "../../context/PopupContext/PopupProvider";

const records = [
  {
    id: 1,
    name: "qu1xx",
    wpm: 304.76,
    accuracy: 98.96,
    time: 15,
    lang: "en",
    avatar: "/avatars/1.png",
  },
  {
    id: 2,
    name: "Trvlxx",
    wpm: 254.3,
    accuracy: 93.2,
    time: 30,
    lang: "ru",
    avatar: "/avatars/2.png",
  },
  {
    id: 3,
    name: "reden",
    wpm: 242.52,
    accuracy: 97.56,
    time: 60,
    lang: "en",
    avatar: "/avatars/3.png",
  },
  {
    id: 4,
    name: "Fragifty",
    wpm: 222.46,
    accuracy: 94.56,
    time: 30,
    lang: "ru",
    avatar: "/avatars/4.png",
  },
  {
    id: 5,
    name: "wleha",
    wpm: 150.23,
    accuracy: 96.86,
    time: 15,
    lang: "en",
    avatar: "/avatars/5.png",
  },
  {
    id: 6,
    name: "Nova",
    wpm: 198.12,
    accuracy: 92.15,
    time: 15,
    lang: "ru",
    avatar: "/avatars/6.png",
  },
  {
    id: 7,
    name: "Ghost",
    wpm: 175.5,
    accuracy: 91.0,
    time: 60,
    lang: "en",
    avatar: "/avatars/7.png",
  },
  {
    id: 8,
    name: "Lunar",
    wpm: 189.3,
    accuracy: 94.7,
    time: 60,
    lang: "ru",
    avatar: "/avatars/8.png",
  },
  {
    id: 9,
    name: "CyberZen",
    wpm: 210.1,
    accuracy: 95.5,
    time: 30,
    lang: "en",
    avatar: "/avatars/9.png",
  },
  {
    id: 10,
    name: "AlphaX",
    wpm: 225.8,
    accuracy: 90.3,
    time: 15,
    lang: "en",
    avatar: "/avatars/10.png",
  },
  {
    id: 11,
    name: "Bolt",
    wpm: 241.6,
    accuracy: 98.2,
    time: 60,
    lang: "ru",
    avatar: "/avatars/11.png",
  },
  {
    id: 12,
    name: "Hexa",
    wpm: 203.4,
    accuracy: 93.8,
    time: 30,
    lang: "en",
    avatar: "/avatars/12.png",
  },
  {
    id: 13,
    name: "Skyline",
    wpm: 220.7,
    accuracy: 95.1,
    time: 15,
    lang: "ru",
    avatar: "/avatars/13.png",
  },
  {
    id: 14,
    name: "Orbit",
    wpm: 180.9,
    accuracy: 90.9,
    time: 30,
    lang: "en",
    avatar: "/avatars/14.png",
  },
  {
    id: 15,
    name: "Phantom",
    wpm: 194.3,
    accuracy: 92.6,
    time: 60,
    lang: "ru",
    avatar: "/avatars/15.png",
  },
  {
    id: 16,
    name: "Neo",
    wpm: 215.7,
    accuracy: 97.3,
    time: 15,
    lang: "en",
    avatar: "/avatars/16.png",
  },
  {
    id: 17,
    name: "Raven",
    wpm: 208.5,
    accuracy: 91.9,
    time: 60,
    lang: "ru",
    avatar: "/avatars/17.png",
  },
  {
    id: 18,
    name: "Pixel",
    wpm: 232.8,
    accuracy: 94.8,
    time: 30,
    lang: "en",
    avatar: "/avatars/18.png",
  },
  {
    id: 19,
    name: "Draco",
    wpm: 246.2,
    accuracy: 96.4,
    time: 60,
    lang: "en",
    avatar: "/avatars/19.png",
  },
  {
    id: 20,
    name: "Blaze",
    wpm: 259.1,
    accuracy: 97.9,
    time: 15,
    lang: "ru",
    avatar: "/avatars/20.png",
  },
];

const SortingPanel = ({
  activeMetric,
  onChangeMetric,
  activeTime,
  onChangeTime,
  activeLang,
  onChangeLang,
}) => (
  <div className="sorting-panel-container">
    <h3>sorting</h3>
    <div className="sorting-panel">
      <div className="filters time-filters">
        {[15, 30, 60].map((time) => (
          <button
            key={time}
            className={`filter ${activeTime === time ? "active" : ""}`}
            onClick={() => onChangeTime(time)}
          >
            <FaClock /> time {time}
          </button>
        ))}
      </div>
      <div className="filters extra-filters">
        <button
          className={`filter ${activeMetric === "wpm" ? "active" : ""}`}
          onClick={() => onChangeMetric("wpm")}
        >
          <FaGlobe /> all-time wpm
        </button>
        <button
          className={`filter ${activeMetric === "accuracy" ? "active" : ""}`}
          onClick={() => onChangeMetric("accuracy")}
        >
          <FaGlobe /> all-time accuracy
        </button>
      </div>
      <div className="filters language-filters">
        <button
          className={`filter ${activeLang === "en" ? "active" : ""}`}
          onClick={() => onChangeLang("en")}
        >
          EN
        </button>
        <button
          className={`filter ${activeLang === "ru" ? "active" : ""}`}
          onClick={() => onChangeLang("ru")}
        >
          RU
        </button>
      </div>
    </div>
  </div>
);

const LeaderboardRow = ({ record, index, currentUserId, onDelete, onClick }) => {
  const isCurrentUser = record.id === currentUserId;

  return (
    <div
      className={`row ${isCurrentUser ? "current-user" : ""}`}
      onClick={onClick}
    >
      <div className="name">
        <img src={record.avatar} alt={record.name} className="avatar" />
        <span>{record.name}</span>
      </div>
      <span>{record.wpm}</span>
      <span>{record.accuracy}%</span>
      <span>#{index + 1}</span>

      {isCurrentUser && (
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(record.id);
          }}
        >
          <Delete />
        </button>
      )}
    </div>
  );
};


const LeaderboardPanel = ({ records, currentUserId, onDelete }) => {
  const { openPopup, closePopup } = usePopup();

  const handleRowClick = (record, index) => {
    openPopup(
      <LeaderboardPopup
        record={{
          ...record,
          rank: index + 1,
          characters: "101/3/1", // или получай это из record
        }}
        onClose={closePopup}
      />
    );
  };

  return (
    <div className="leaderboard-table-container">
      <h3>leaderboard</h3>
      <div className="leaderboard-table">
        <div className="header">
          <span>name</span>
          <span>wpm</span>
          <span>accuracy</span>
          <span>#</span>
        </div>
        <div className="records">
          {records.map((record, index) => (
            <LeaderboardRow
              key={record.id}
              record={record}
              index={index}
              currentUserId={currentUserId}
              onDelete={onDelete}
              onClick={() => handleRowClick(record, index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const [activeMetric, setActiveMetric] = useState("wpm");
  const [activeTime, setActiveTime] = useState(15);
  const [activeLang, setActiveLang] = useState("en");
  const [userRecords, setUserRecords] = useState(records);

  const handleDelete = (id) => {
    setUserRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const handleRowClick = (record) => {
    setPopup(
      <div className="popup-user-info">
        <h3>{record.name}</h3>
        <img
          src={record.avatar}
          alt={record.name}
          style={{ width: 100, borderRadius: "50%" }}
        />
        <p>WPM: {record.wpm}</p>
        <p>Accuracy: {record.accuracy}%</p>
        <p>Language: {record.lang.toUpperCase()}</p>
        <p>Time: {record.time} sec</p>
        <button onClick={closePopup}>Закрыть</button>
      </div>
    );
  };

  const filtered = userRecords
    .filter((r) => r.time === activeTime && r.lang === activeLang)
    .sort((a, b) => b[activeMetric] - a[activeMetric]);

  return (
    <div className="leaderboard-page">
      <div className="leaderboard">
        <SortingPanel
          activeMetric={activeMetric}
          onChangeMetric={setActiveMetric}
          activeTime={activeTime}
          onChangeTime={setActiveTime}
          activeLang={activeLang}
          onChangeLang={setActiveLang}
        />
        <LeaderboardPanel
          records={filtered}
          currentUserId={1}
          onDelete={handleDelete}
          onClickRow={handleRowClick}
        />
      </div>
    </div>
  );
};

export default Leaderboard;
// const handleDelete = async (recordId) => {
//     const res = await window.api.call('deleteRecord', [recordId]);
//     if (res.success) {
//         console.log('Рекорд удалён');
//     } else {
//         console.error('Ошибка удаления:', res.error);
//     }
// };
