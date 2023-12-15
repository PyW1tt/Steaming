import React from "react";
import Navbar from "../component/Navbar";
import List from "../component/List";

function MoviesPage() {
  return (
    <div className="bg-[#28262d] h-screen">
      <Navbar>
        <div className="movies">
          <List />
        </div>
      </Navbar>
    </div>
  );
}

export default MoviesPage;
