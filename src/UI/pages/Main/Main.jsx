import React, { useState, useEffect, useRef } from "react";
import "./Main.scss";

import RefreshIcon from "../../assets/icons/Refresh";
import Controls from "./components/Controls";
import TypeArea from "./components/TypeArea";
import MainPagePopup from "../../popups/MainPagePopup/MainPagePopup";
import { usePopup } from "../../context/PopupContext/PopupProvider";

const Main = () => {
  const [time, setTime] = useState(30);
  const [language, setLanguage] = useState("russian")
  const [timerTime, setTimerTime] = useState(time);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const correctCharsRef = useRef(0);
  const totalChars = useRef(0);
  const { openPopup, closePopup } = usePopup();

  function calculateTypingStats() {
    if (time === 0) {
      return {
        wpm: 0.0,
        rawWpm: 0.0,
        accuracy: 0.0,
      };
    }

    const wpm = (correctCharsRef.current * 60) / (5 * time);
    const rawWpm = (totalChars.current * 60) / (5 * time);
    const accuracy = correctCharsRef.current > 0 ? (correctCharsRef.current / totalChars.current) * 100 : 0.0;

    return {
      wpm: parseFloat(wpm.toFixed(2)),
      rawWpm: parseFloat(rawWpm.toFixed(2)),
      accuracy: parseFloat(accuracy.toFixed(2)),
      characters: `${totalChars.current}/${correctCharsRef.current}/${totalChars.current - correctCharsRef.current}`,
      time,
      lang: language,
    };
  }

  const refresh = () => {
    setRefreshKey((prev) => prev + 1);
    setIsStarted(false);
    setTimerTime(time);
    correctCharsRef.current = 0;
    totalChars.current = 0;
  };

  const tabPressed = useRef(false);

  const start = () => {
    if (!isStarted) {
      setIsStarted(true);
    }
  };

  const finish = () => {
    const record = calculateTypingStats()
    openPopup(
      <MainPagePopup
        onClose={() => {
          closePopup();
          refresh()
        }}
        record={record}
      />
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        tabPressed.current = true;
        e.preventDefault();
      } else if (e.key === "Enter" && tabPressed.current) {
        refresh();
        tabPressed.current = false;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "Tab") {
        tabPressed.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    const interval = setInterval(() => {
      setTimerTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted]);

  useEffect(() => {
    if (isStarted && timerTime <= 0) {
      setIsStarted(false);
      finish();
    }
  }, [timerTime, isStarted]);

  return (
    <div className="main">
      <div className="wrapper">
        {!isStarted ? (
          <Controls time={time} setTime={setTime} setTimerTime={setTimerTime} language={language} setLanguage={setLanguage} />
        ) : (
          <div className="timer">{timerTime}</div>
        )}
        <TypeArea key={refreshKey} start={start} finish={finish} language={language} correctCharsRef={correctCharsRef} totalChars={totalChars} />
        <div className="refresh" onClick={refresh}>
          <RefreshIcon />
        </div>
      </div>
      <div className="hotkey-hint">
        <div className="hint">
          <span className="key">tab</span>+<span className="key">enter</span>
        </div>
        <p className="equals">=</p>
        <p>restart test</p>
      </div>
    </div>
  );
};

export default Main;
