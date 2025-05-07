import React, { useState, useContext, useEffect } from "react";
import "./Leaderboard.scss";
import { FaClock, FaGlobe } from "react-icons/fa";
import Delete from "../../assets/icons/Delete";
import LeaderboardPopup from "../../popups/LeaderboardPopup/LeaderboardPopup";
import { usePopup } from "../../context/PopupContext/PopupProvider";
import { useUser } from "../../context/UserContext/UserProvider";

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
          className={`filter ${activeLang === "english" ? "active" : ""}`}
          onClick={() => onChangeLang("english")}
        >
          EN
        </button>
        <button
          className={`filter ${activeLang === "russian" ? "active" : ""}`}
          onClick={() => onChangeLang("russian")}
        >
          RU
        </button>
      </div>
    </div>
  </div>
);

const LeaderboardRow = ({
  record,
  index,
  currentUserId,
  onDelete,
  onClick,
}) => {
  const isCurrentUser = record.user_id === currentUserId;

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
          onClick={async (e) => {
            e.stopPropagation();
            await onDelete(record.id);
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
  const { user } = useUser();
  const [activeMetric, setActiveMetric] = useState("wpm");
  const [activeTime, setActiveTime] = useState(15);
  const [activeLang, setActiveLang] = useState("english");
  const [userRecords, setUserRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await window.api.call("getLeaderboardRecords", [
        activeTime,
        activeLang,
        activeMetric,
      ]);

      if (res.success) {
        setUserRecords(res.data);
      } else {
        console.error("Ошибка загрузки рекордов:", res.error);
      }
      setLoading(false);
    };

    fetchData();
  }, [activeTime, activeLang, activeMetric]);

  const handleDelete = async (recordId) => {
    try {
      const res = await window.api.call("deleteRecord", [recordId]);
      console.log("Результат удаления:", res);

      if (!res.success) {
        alert(res.error || "Ошибка при удалении");
        return;
      }

      // Удаляем из списка
      setUserRecords((prev) => prev.filter((r) => r.id !== recordId));
    } catch (err) {
      console.error("Ошибка удаления:", err);
    }
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
        {loading ? (
          <div className="loading">Загрузка...</div>
        ) : (
          <LeaderboardPanel
            records={userRecords}
            currentUserId={user.id}
            onDelete={handleDelete}
            onClickRow={handleRowClick}
          />
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
