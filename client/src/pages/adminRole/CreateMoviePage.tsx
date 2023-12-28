import React from "react";
import Sidebar from "../../component/admin/Sidebar";
import CreateMovie from "../../component/admin/CreateMovie";

function CreateMoviePage(): JSX.Element {
  return (
    <Sidebar>
      <CreateMovie />
    </Sidebar>
  );
}

export default CreateMoviePage;
