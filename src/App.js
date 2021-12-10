import React, { useState, useEffect, useCallback } from "react";
import Users from "./users/pages/Users";
import Newplace from "./places/pages/Newplace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

import { Routes, Route } from "react-router-dom";
let timerId;

function App() {
  const [token, setToken] = useState(false);
  const [userId, setuserId] = useState(null);
  const [expiryTime, setExpiryTime] = useState(null);

  const login = useCallback((id, token, expirationTime) => {
    let expiry =
      expirationTime || new Date(new Date().getTime() + 1000 * 60 * 60);

    setExpiryTime(expiry);

    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: id, token: token, expiry: expiry.toISOString() })
    );
    setToken(token);
    setuserId(id);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setuserId(null);
    setExpiryTime(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && expiryTime) {
      const time = expiryTime.getTime() - new Date().getTime();

      timerId = setTimeout(logout, time);
    } else {
      clearTimeout(timerId);
    }
  }, [token, expiryTime, logout]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userData"));
    if (stored && stored.token && new Date(stored.expiry) > new Date()) {
      login(stored.userId, stored.token, new Date(stored.expiry));
    }
  }, [login]);

  let route;
  if (token) {
    route = (
      <>
        <Route path="/" element={<Users />} exact></Route>
        <Route path="/places/new" element={<Newplace />} exact></Route>
        <Route path="/:userId/places" element={<UserPlaces />} exact></Route>
        <Route path="/places/:placeId" element={<UpdatePlace />} exact></Route>
        <Route path="/auth" element={<Users />} exact></Route>
      </>
    );
  } else {
    route = (
      <>
        <Route path="/" element={<Users />} exact></Route>
        <Route path="/auth" element={<Auth />} exact></Route>

        {/* these will be removed after implementing auto login */}
        <Route path="/places/new" element={<Auth />} exact></Route>
        <Route path="/:userId/places" element={<Auth />} exact></Route>
        <Route path="/places/:placeId" element={<Auth />} exact></Route>
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        logIn: login,
        logOut: logout,
      }}
    >
      <Routes>{route}</Routes>
    </AuthContext.Provider>
  );
}

export default App;
