import React from "react";
import Navbar from "../component/Navbar";
import List from "../component/List";

function MyListPage() {
  return (
    <Navbar bg={"bg-[#28262d]"}>
      <div className="myList">
        <List />
      </div>
    </Navbar>
  );
}

export default MyListPage;
