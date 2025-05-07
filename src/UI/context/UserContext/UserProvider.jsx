import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import Avatar from "../../assets/avatar.png";

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    saved ? setUser(JSON.parse(saved)) : navigate("/");
  }, []);

  const login = async (userData) => {
    const response = await window.api.call("loginUser", [
      userData.email,
      userData.password,
    ]);
    if (response.success) {
      localStorage.setItem(
        "user",
        JSON.stringify({ id: response.data.id, name: response.data.name })
      );
      setUser(userData);
      navigate("/main");
    }
    return response.status;
  };

  const register = async (userData) => {
    const name = userData.email.split("@")[0];
    const response = await window.api.call("registerUser", [
      name,
      userData.email,
      userData.password,
      Avatar,
    ]);
    if (response.success) {
      localStorage.setItem(
        "user",
        JSON.stringify({ id: response.data.id, name: response.data.name })
      );
      setUser(userData);
      navigate("/main");
    }
    return response.status;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
