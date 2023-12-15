import React from "react";
import Navbar from "../component/Navbar";
import List from "../component/List";

function MyListPage() {
  return (
    <div className="bg-[#28262d] h-screen">
      <Navbar>
        <div className="myList">
          <List />
        </div>
      </Navbar>
    </div>
  );
}

export default MyListPage;
