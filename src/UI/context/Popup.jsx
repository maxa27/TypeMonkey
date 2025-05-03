import React, { createContext, useContext, useState, useEffect } from "react";

const PopupContext = React.createContext();

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};

export const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  const openPopup = (content) => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);

    document.body.style.position = "fixed";
    document.body.style.top = `-${currentScrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    setPopup(content);
  };

  const closePopup = () => {
    setPopup(null);
    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 10);
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
  };

  return (
    <PopupContext.Provider value={{ setPopup: openPopup, closePopup }}>
      {children}
      {popup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            {popup}
          </div>
        </div>
      )}
    </PopupContext.Provider>
  );
};