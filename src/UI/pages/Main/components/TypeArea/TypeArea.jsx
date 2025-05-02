import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Word from "../Word";
import json from "../../data/russian/data.json";

import "./TypeArea.scss";

export default function TypeArea() {
  const isFocusedRef = useRef(true);
  const [isFocused, setIsFocused] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const caretIndent = useRef(0);
  const wordLengthRef = useRef(0);
  const wordRef = useRef("");
  const letterIndexRef = useRef(0);
  const inputRef = useRef("");
  const caretRef = useRef(null);
  const hasMounted = useRef(false);

  const getActiveWordElement = () => document.querySelector(".word.active");
  const getActiveWordLength = () =>
    getActiveWordElement()?.querySelectorAll(".letter").length || 0;
  const getActiveWord = () =>
    Array.from(getActiveWordElement()?.querySelectorAll(".letter") || [])
      .map((l) => l.textContent)
      .join("");

  const handleFocus = () => setIsFocused(true);

  const nextWord = () => {
    inputRef.current = "";
    caretIndent.current = 0;
    setCurrentLetterIndex(0);
    setCurrentWordIndex((prev) => prev + 1);
  };

  const moveCaretToLetter = (wordIndex, letterIndex) => {
    const letterSelector = `.word[data-index="${wordIndex}"] span[data-index="${
      letterIndex - 1
    }"]`;
    const letterEl = document.querySelector(letterSelector);

    if (!letterEl) return;

    const isCorrect = letterEl.textContent === inputRef.current;
    letterEl.classList.add(isCorrect ? "correct" : "wrong");

    const caretEl = document.querySelector(".caret");
    const letterRect = letterEl.getBoundingClientRect();
    caretIndent.current += letterRect.width;

    if (caretEl) {
      caretEl.style.left = `${caretIndent.current}px`;
    }
  };

  const handleTyping = (e) => {
    const { key } = e;

    if (key.length === 1) {
      inputRef.current = key;

      if (key === " ") {
        nextWord();
        return;
      }

      if (currentLetterIndex < wordLengthRef.current) {
        setCurrentLetterIndex((prev) => prev + 1);
      } else {
        nextWord();
      }
    }

    if (key === "Backspace" && letterIndexRef.current > 0) {
      const prevIndex = letterIndexRef.current - 1;
      const letterSelector = `.word[data-index="${currentWordIndex}"] span[data-index="${prevIndex}"]`;
      const letterEl = document.querySelector(letterSelector);

      if (letterEl) {
        letterEl.classList.remove("correct", "wrong");

        const letterRect = letterEl.getBoundingClientRect();
        caretIndent.current = Math.max(
          0,
          caretIndent.current - letterRect.width
        );

        const caretEl = document.querySelector(".caret");
        if (caretEl) {
          caretEl.style.left = `${caretIndent.current}px`;
        }

        setCurrentLetterIndex((prev) => {
          letterIndexRef.current = prev - 1;
          return letterIndexRef.current;
        });
      }
    }
  };

  useEffect(() => {
    isFocusedRef.current = isFocused;
  }, [isFocused]);

  useLayoutEffect(() => {
    if (!hasMounted.current) return;

    wordLengthRef.current = getActiveWordLength();
    wordRef.current = getActiveWord();
    letterIndexRef.current = currentLetterIndex;

    moveCaretToLetter(currentWordIndex, currentLetterIndex);
  }, [currentWordIndex, currentLetterIndex]);

  useEffect(() => {
    if (!hasMounted.current) {
      wordLengthRef.current = getActiveWordLength();
      hasMounted.current = true;
    }

    const handleClickOutside = (event) => {
      const wordsGrid = document.querySelector(".words-grid");
      if (wordsGrid && !wordsGrid.contains(event.target)) {
        setIsFocused(false);
      }
    };

    const handleKeyDown = (e) => {
      if (isFocusedRef.current) handleTyping(e);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="words-grid" onClick={handleFocus}>
      {json.words.slice(0, 150).map((w, key) => (
        <Word
          key={key}
          word={w}
          wordIndex={key}
          isActive={key === currentWordIndex}
          isFocused={isFocused}
          caretRef={caretRef}
        />
      ))}
    </div>
  );
}
