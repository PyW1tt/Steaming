import React from "react";
import HomePageAfter from "../component/homepage/HomePageAfter";
import { useAuth } from "../context/AuthContext";
import HomePageBefore from "./HomePageBefore";

function HomePage() {
  const auth = useAuth();
  return <HomePageAfter />;
  // return auth.isAuthenticated ? <HomePageAfter /> : <HomePageBefore />;
}

export default HomePage;
