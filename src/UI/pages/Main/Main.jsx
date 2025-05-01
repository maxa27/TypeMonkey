import React from "react";
import json from'./data/russian/data.json'
import "./Main.scss";

const Main = () => {
  return (
    <div className="main">
      <div className="select-controls"></div>
      <div className="words-grid">
        {json.words.map((e) => <div className="word">{e.split('').map((l) => <letter>{l}</letter>)}</div>)}
      </div>
      <div className="hotkey-hint"></div>
    </div>
  );
};

export default Main;
