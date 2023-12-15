import React from "react";
import Navbar from "../component/Navbar";
import List from "../component/List";

function TVshowsPage() {
  return (
    <div className="bg-[#28262d] h-screen">
      <Navbar>
        <div className="tvshows">
          <List />
        </div>
      </Navbar>
    </div>
  );
}

export default TVshowsPage;
