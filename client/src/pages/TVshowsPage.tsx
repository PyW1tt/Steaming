import React from "react";
import Navbar from "../component/Navbar";
import List from "../component/List";

function TVshowsPage() {
  return (
    <Navbar bg={"bg-[#28262d]"}>
      <div className="tvshows h-full">
        <List />
      </div>
    </Navbar>
  );
}

export default TVshowsPage;
