import { Link } from "react-router-dom";
import "./Header.scss";
import MinimizeIcon from "../../assets/icons/Minimize";
import CloseIcon from "../../assets/icons/Close";

const Header = () => {
  return (
    <div className="header">
      <div className="drag-area"></div>
      <div className="logo">
        <img src="../../../../public/monkey.png" alt="" />
        TypeMonkey
      </div>
      <div className="controls">
        <MinimizeIcon />
        <CloseIcon />
      </div>
    </div>
  );
};

export default Header;
