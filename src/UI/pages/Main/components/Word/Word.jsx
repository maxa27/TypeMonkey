import React, { useEffect, useState } from "react";
import "./Word.scss";

const Word = React.memo(
  ({ wordIndex, word, isActive, hasFinished, letterRefs, isTyping }) => {
    const [locked, setLocked] = useState(false);
    const [started, setStarted] = useState(false);

    useEffect(() => {
      if (!letterRefs.current[wordIndex]) {
        letterRefs.current[wordIndex] = {};
      }
    }, [wordIndex, letterRefs]);

    useEffect(() => {
      const letters = letterRefs.current[wordIndex];
      if (!letters) return;

      const entries = Object.entries(letters);
      if (entries.length === 0) return;

      const allCorrect = entries.every(([_, el]) =>
        el?.classList.contains("correct")
      );
      const anyMarked = entries.some(([_, el]) =>
        el?.classList.contains("correct") || el?.classList.contains("wrong")
      );

      if (allCorrect) {
        setLocked(true);
        setStarted(false)
      } else if (anyMarked) {
        setStarted(true);
      }
    }, [hasFinished, isTyping, locked]);

    return (
      <div
        className={`word${isActive ? " active" : ""}${locked ? " locked" : ""}${started && !locked ? " started" : ""}`}
        data-index={wordIndex}
      >
        {word.split("").map((l, letterIndex) => (
          <span
            className="letter"
            data-index={letterIndex}
            key={`${wordIndex}-${letterIndex}`}
            ref={(el) => {
              if (!letterRefs.current[wordIndex]) {
                letterRefs.current[wordIndex] = {};
              }
              letterRefs.current[wordIndex][letterIndex] = el;
            }}
          >
            {l}
          </span>
        ))}
      </div>
    );
  }
);

export default Word;
