import { Link } from "react-router-dom";
import "./Header.scss";
import MinimizeIcon from "../../assets/icons/Minimize";
import CloseIcon from "../../assets/icons/Close";

const Header = () => {

  const close = () => {
    window.WindowAPI.closeWin();
  };

  const minimize = () => {
    window.WindowAPI.minimizeWin();
  };

  return (
    <div className="header">
      <div className="drag-area"></div>
      <div className="logo">
        <img src="/monkey.png" alt="TypeMonkey" />
        TypeMonkey
      </div>
      <div className="controls">
        <div className="minimize" onClick={minimize}>
          <MinimizeIcon />
        </div>
        <div className="close" onClick={close}>
          <CloseIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
