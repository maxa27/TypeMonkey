import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import PopupContext from "./PopupContext";
import "./PopupStyles.scss";

const PopupProvider = ({ children }) => {
  const [popupContent, setPopupContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = useCallback((content) => {
    setPopupContent(content);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closePopup = useCallback(() => {
    setIsOpen(false);
    setPopupContent(null);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closePopup();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closePopup]);

  // Accessibility: блокировка фоновых элементов
  useEffect(() => {
    const appRoot = document.getElementById("root");

    if (!appRoot) return;

    if (isOpen) {
      appRoot.setAttribute("aria-hidden", "true");
      appRoot.inert = true;
    } else {
      appRoot.removeAttribute("aria-hidden");
      appRoot.inert = false;
    }

    return () => {
      appRoot.removeAttribute("aria-hidden");
      appRoot.inert = false;
    };
  }, [isOpen]);

  return (
    <PopupContext.Provider value={{ openPopup, closePopup, isOpen }}>
      {children}
      {isOpen &&
        ReactDOM.createPortal(
          <div className="popup-overlay" onClick={closePopup}>
            <div
              className="popup-content"
              onClick={(e) => e.stopPropagation()}
            >
              {popupContent}
            </div>
          </div>,
          document.getElementById("popup-root")
        )}
    </PopupContext.Provider>
  );
  
};

export default PopupProvider;
