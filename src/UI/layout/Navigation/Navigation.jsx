import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LeaderboardIcon from "../../assets/icons/Leaderboard";
import MainIcon from "../../assets/icons/Main";
import ProfileIcon from "../../assets/icons/Profile";
import "./Navigation.scss";

export default function Navigation() {
  const location = useLocation()
  const path = location.pathname;

  return (
    <div className="navigation">
      <Link to={"/main"} className={path === "/main" ? "active icon": "icon"}>
        <MainIcon />
      </Link>
      <Link to={"/leaderboard"} className={path === "/leaderboard" ? "leaderboard active icon": "leaderboard icon"}>
        <LeaderboardIcon />
      </Link>
      <Link to={"/profile"} className={path === "/profile" ? "active icon": "icon"}>
        <ProfileIcon />
      </Link>
    </div>
  );
}
