import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Records from "./pages/Records";
import Autorization from "./pages/Authorization";
import { UserProvider } from "./context/UserProvider.jsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <UserProvider>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="main" element={<Main />} />
                    <Route index element={<Profile />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="records" element={<Records />} />
                </Route>
            </Routes>
        </UserProvider>
    </BrowserRouter>
);
