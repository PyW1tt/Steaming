import React from "react";
import Action from "./Body/Action";
import Popular from "./Body/Popular";
import Release from "./Body/Release";
import WatchList from "./Body/WatchList";
import Genres from "./Body/Genres";

function Body(): JSX.Element {
  return (
    <section className="bg-[#28262d] ">
      <Action />
      <Popular />
      <Release />
      <WatchList />
      <Genres />
    </section>
  );
}

export default Body;
