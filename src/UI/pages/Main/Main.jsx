import React, { useState, useEffect, useRef } from "react";
import "./Main.scss";

import RefreshIcon from "../../assets/icons/Refresh";
import Controls from "./components/Controls";
import TypeArea from "./components/TypeArea";

const Main = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const refresh = () => setRefreshKey((prev) => prev + 1);

  const tabPressed = useRef(false);

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

  return (
    <div className="main">
      <div className="wrapper">
        <Controls />
        <TypeArea key={refreshKey}/>
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
