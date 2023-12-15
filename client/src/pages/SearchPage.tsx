import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Navbar from "../component/Navbar";
import List from "../component/List";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="bg-[#28262d] pt-[50px] h-screen ">
      <div className="px-[100px] mb-10">
        <div className="flex justify-center">
          <button
            className="mr-5"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src="../../icon/left.svg" alt="" />
          </button>
          <Input
            type=""
            placeholder="Search for movies, TV shows, or categories "
            className="bg-[#28262d] text-lg text-center"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value);
            }}
          />
          <img src="../../icon/search.svg" alt="" className="ml-2" />
        </div>
      </div>
      <List />
    </div>
  );
}

export default SearchPage;
