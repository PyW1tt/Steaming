import React from "react";
import Navbar from "../component/Navbar";
import List from "../component/List";

function MoviesPage() {
  return (
    <Navbar bg={"bg-[#28262d]"}>
      <div className="movies">
        <List />
      </div>
    </Navbar>
  );
}

export default MoviesPage;
