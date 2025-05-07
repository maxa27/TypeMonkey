import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Authorization from "./pages/Authorization";
import { UserProvider } from "./context/UserContext/UserProvider.jsx";
import { PopupProvider } from "./context/PopupContext/PopupProvider.jsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <PopupProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="main" element={<Main />} />
            {/* <Route path="main" element={<Authorization />} /> */}
            <Route index element={<Authorization />} />
            <Route path="profile" element={<Profile />} />
            <Route path="leaderboard" element={<Leaderboard />} />
          </Route>
        </Routes>
      </PopupProvider>
    </UserProvider>
  </BrowserRouter>
);
