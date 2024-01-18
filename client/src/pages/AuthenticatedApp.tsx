import React from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
import { Routes, Route } from "react-router-dom";
import TVshowsPage from "./TVshowsPage";
import MoviesPage from "./MoviesPage";
import MyListPage from "./MyListPage";
import ProfilePage from "./ProfilePage";
import SearchPage from "./SearchPage";
import MovieId from "./MovieId";
import CreateMoviePage from "./adminRole/CreateMoviePage";
import AdminSearchPage from "./adminRole/AdminSearchPage";
import CreateTVshowsPage from "./adminRole/CreateTVshowsPage";
import UpdateMoivePage from "./adminRole/UpdateMoviePage";
import UpdateTVshowsPage from "./adminRole/UpdateTVshowsPage";
import NotFoundPage from "./NotFoundPage";
function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/tvshows" element={<TVshowsPage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/mylist" element={<MyListPage />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/MovieId/:id" element={<MovieId />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* AdminRole------- */}
      <Route path="/adminSearch" element={<AdminSearchPage />} />
      <Route path="/createMovie" element={<CreateMoviePage />} />
      <Route path="/createTVshows" element={<CreateTVshowsPage />} />
      <Route path="/updateMovie/:id" element={<UpdateMoivePage />} />
      <Route path="/updateTVshows/:id" element={<UpdateTVshowsPage />} />
    </Routes>
  );
}

export default AuthenticatedApp;
