import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Word from "../Word";
import Caret from "../Caret";

import "./TypeArea.scss";

export default function TypeArea({
  start,
  language,
  correctCharsRef,
  totalChars,
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(true);
  const [json, setJson] = useState(null);
  const inputRef = useRef("");

  const currentWordIndexRef = useRef(0);
  const currentLetterIndexRef = useRef(0);
  const currentWordLength = useRef(0);
  const currentLineRef = useRef(1);
  const letterRefs = useRef({});
  const caretRef = useRef(null);
  const containerRef = useRef(null);

  const getWord = (index = currentWordIndexRef.current) => {
    const wordEl = document.querySelector(`.word[data-index="${index}"]`);
    const letters = wordEl.querySelectorAll(".letter");
    let wordStr = "";
    letters.forEach((l) => (wordStr += l.textContent));

    return {
      word: wordStr,
      length: wordStr.length,
    };
  };

  const moveCaret = () => {
    const caretEl = caretRef.current;
    const containerEl = containerRef.current;
    const targetIndex =
      currentLetterIndexRef.current > 0 ? currentLetterIndexRef.current - 1 : 0;

    const letterEl =
      letterRefs.current?.[currentWordIndexRef.current]?.[targetIndex];

    if (!caretEl || !containerEl || !letterEl) return;

    const containerRect = containerEl.getBoundingClientRect();
    const letterRect = letterEl.getBoundingClientRect();

    const left =
      currentLetterIndexRef.current === 0
        ? letterRect.left - containerRect.left + containerEl.scrollLeft
        : letterRect.right - containerRect.left + containerEl.scrollLeft;

    const top = letterRect.top - containerRect.top + containerEl.scrollTop;

    caretEl.style.left = `${left}px`;
    caretEl.style.top = `${top}px`;

    const currentLine = Math.floor(top / 25);
    currentLineRef.current = currentLine;

    if (currentLineRef.current >= 2) {
      const scrollOffset = 43;
      const currentScrollTop = containerEl.scrollTop;
      const containerHeight = containerEl.clientHeight;

      if (top + scrollOffset >= currentScrollTop + containerHeight) {
        containerEl.scrollTo({
          top: currentScrollTop + scrollOffset,
          behavior: "smooth",
        });
      }
    }
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    if (key === " " || key === "Enter") {
      const wordEl = document.querySelector(
        `.word[data-index="${currentWordIndexRef.current}"]`
      );
      const wordStarted = wordEl && wordEl.classList.contains("started");
      if (
        currentLetterIndexRef.current === currentWordLength.current ||
        wordStarted
      ) {
        currentWordIndexRef.current += 1;
        currentLetterIndexRef.current = 0;

        setCurrentWordIndex(currentWordIndexRef.current);
        setCurrentLetterIndex(currentLetterIndexRef.current);
      }
      return;
    }

    if (key === "Backspace") {
      const currentIndex = currentWordIndexRef.current;

      if (currentLetterIndexRef.current === 0 && currentIndex > 0) {
        const prevIndex = currentIndex - 1;
        const prevLetters = letterRefs.current?.[prevIndex];

        const isLocked =
          prevLetters &&
          Object.values(prevLetters).every((el) =>
            el?.classList.contains("correct")
          );

        if (!isLocked) {
          const lettersWithTypes = Object.entries(prevLetters)
            .map(([key, el]) =>
              el.classList.contains("wrong") || el.classList.contains("correct")
                ? el
                : null
            )
            .filter((e) => e !== null);

          const maxDataIndex = lettersWithTypes.reduce((max, el) => {
            const dataIndex = parseInt(el.dataset.index);
            return dataIndex > max ? dataIndex : max;
          }, -1);

          currentWordIndexRef.current = prevIndex;
          currentLetterIndexRef.current = maxDataIndex + 1;

          setCurrentWordIndex(prevIndex);
          setCurrentLetterIndex(maxDataIndex + 1);
        }
      } else {
        const deleteIndex = currentLetterIndexRef.current - 1;
        const letterEl =
          letterRefs.current?.[currentWordIndexRef.current]?.[deleteIndex];

        if (letterEl) {
          totalChars.current -= 1;
          if (letterEl.classList.contains("correct")) {
            correctCharsRef.current -= 1;
          }
          letterEl.classList.remove("correct", "wrong");
        }

        currentLetterIndexRef.current = Math.max(0, deleteIndex);
        setCurrentLetterIndex(currentLetterIndexRef.current);
      }
      return;
    }

    if (key.length === 1) {
      if (inputRef.current === "") {
        start();
      }
      inputRef.current = key;

      const currentLetterEl =
        letterRefs.current?.[currentWordIndexRef.current]?.[
          currentLetterIndexRef.current
        ];

      if (currentLetterEl) {
        const expectedChar = currentLetterEl.textContent;
        if (key === expectedChar) {
          currentLetterEl.classList.add("correct");
          correctCharsRef.current += 1;
          totalChars.current += 1;
          currentLetterEl.classList.remove("wrong");
        } else {
          currentLetterEl.classList.add("wrong");
          totalChars.current += 1;
          currentLetterEl.classList.remove("correct");
        }
      }

      currentLetterIndexRef.current =
        currentLetterIndexRef.current + 1 > currentWordLength.current
          ? currentLetterIndexRef.current
          : currentLetterIndexRef.current + 1;

      setCurrentLetterIndex(currentLetterIndexRef.current);
    }
  };

  const handleClickOutside = (e) => {
    if (!containerRef.current.contains(e.target)) {
      setIsFocused(false);
    } else {
      setIsFocused(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const loadJson = async () => {
      const data = await import(`../../data/${language}/data.json`);
      setJson(data.default);
    };

    loadJson();
  }, [language]);

  useLayoutEffect(() => {
    if (!json) return;
    currentWordLength.current = getWord().length;
    moveCaret();
  }, [currentLetterIndex, currentWordIndex, isFocused, json]);

  return (
    <div
      className="words-grid"
      ref={containerRef}
      onClick={() => setIsFocused(true)}
    >
      {json?.words.slice(0, 150).map((w, key) => (
        <Word
          key={key}
          word={w}
          wordIndex={key}
          isActive={key === currentWordIndex}
          isFocused={isFocused}
          letterRefs={letterRefs}
          hasFinished={
            key === currentWordIndex &&
            currentLetterIndex === currentWordLength.current
          }
          isTyping={key === currentWordIndex && currentLetterIndex > 0}
        />
      ))}
      {isFocused && <Caret ref={caretRef} />}
    </div>
  );
}
