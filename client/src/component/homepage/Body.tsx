import React from "react";
import Popular from "./Body/Popular";
import Release from "./Body/Release";
import WatchList from "./Body/WatchList";
import Genres from "./Body/Genres";
import { useAuth } from "../../context/AuthContext";

function Body(): JSX.Element {
  const { isAuthenticated } = useAuth();

  return (
    <section className="bg-[#28262d] ">
      {/* <Action /> */}
      <Popular />
      <Release />
      {isAuthenticated && <WatchList />}
      <Genres />
    </section>
  );
}

export default Body;
