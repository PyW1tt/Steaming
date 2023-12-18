import React from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
import OpenMovie from "../component/OpenMovie";
import { Routes, Route } from "react-router-dom";
import TVshowsPage from "./TVshowsPage";
import MoviesPage from "./MoviesPage";
import MyListPage from "./MyListPage";
import ProfilePage from "./ProfilePage";
import SearchPage from "./SearchPage";
import MovieId from "./MovieId";
import CreateMoivePage from "./adminRole/CreateMoivePage";

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/tvshows" element={<TVshowsPage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/mylist" element={<MyListPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/MovieId" element={<MovieId />} />

      {/* AdminRole------- */}
      <Route path="/createMovie" element={<CreateMoivePage />} />
    </Routes>
  );
}

export default AuthenticatedApp;
