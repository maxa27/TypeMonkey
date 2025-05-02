import React from "react";
import Caret from "../Caret";
import "./Word.scss";

const Word = React.memo(({ wordIndex, word, isActive, isFocused, caretRef = null }) => {
  let letterIndex = 0;
  return (
    <div
      className={`word${isActive ? " active" : ""}`}
      data-index={wordIndex}
      key={wordIndex}
    >
      {isFocused && isActive ? <Caret ref={caretRef}/> : null}
      {word.split("").map((l) => {
        const letter = (
          <span
            className="letter"
            data-index={letterIndex}
            key={`${wordIndex}-${letterIndex}`}
          >
            {l}
          </span>
        );
        letterIndex += 1;
        return letter;
      })}
    </div>
  );
});

export default Word;
