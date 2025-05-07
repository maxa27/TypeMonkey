import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LeaderboardIcon from "../../assets/icons/Leaderboard";
import MainIcon from "../../assets/icons/Main";
import ProfileIcon from "../../assets/icons/Profile";
import "./Navigation.scss";
import { useUser } from "../../context/UserContext/UserProvider";

export default function Navigation() {
  const { user } = useUser();
  const location = useLocation()
  const path = location.pathname;

  if(!user) return null;

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
