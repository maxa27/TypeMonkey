import { useState } from "react";
import WorldIcon from "../../../../assets/icons/World";
import "./Controls.scss";

export default function Controls() {
  const [time, setTime] = useState(30);
  const [language, setLanguage] = useState("russian");

  const selectTime = (newTime) => {
    setTime(newTime);
  };

  const selectLanguage = () => {
    language === "russian" ? setLanguage("english") : setLanguage("russian");
  };

  return (
    <div className="gradient-border">
      <div className="select-controls">
        <div className="language" onClick={selectLanguage}>
          <div className="icon">
            <WorldIcon />
          </div>
          {language}
        </div>
        <div className="time-periods">
          <div
            className={`time ${15 === time ? " selected" : ""}`}
            onClick={() => selectTime(15)}
          >
            15
          </div>
          <div
            className={`time ${30 === time ? " selected" : ""}`}
            onClick={() => selectTime(30)}
          >
            30
          </div>
          <div
            className={`time ${60 === time ? " selected" : ""}`}
            onClick={() => selectTime(60)}
          >
            60
          </div>
        </div>
      </div>
    </div>
  );
}
