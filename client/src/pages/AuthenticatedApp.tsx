import React from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
import OpenMovie from "../component/OpenMovie";
import { Routes, Route } from "react-router-dom";

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/title" element={<OpenMovie />} /> */}
    </Routes>
  );
}

export default AuthenticatedApp;
