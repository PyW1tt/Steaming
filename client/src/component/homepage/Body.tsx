import React from "react";
import Popular from "./Body/Popular";
import Release from "./Body/Release";
import WatchList from "./Body/WatchList";
import Genres from "./Body/Genres";
import Movies from "./Body/Movies";
import Series from "./Body/Series";
import { useAuth } from "../../context/AuthContext";

function Body(): JSX.Element {
  const { isAuthenticated } = useAuth();

  return (
    <section className="bg-[#28262d] ">
      <Popular />
      <Release />
      {isAuthenticated && <WatchList />}
      {isAuthenticated ? null : <Movies />}
      {isAuthenticated ? null : <Series />}
      <Genres />
    </section>
  );
}

export default Body;
