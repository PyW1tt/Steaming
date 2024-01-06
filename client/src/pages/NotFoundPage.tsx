import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center w-full h-[709px]">
      <div className="text-center flex flex-col">
        <img src="../../icon/bad.svg" alt="" />
        <p className="text-black text-6xl font-extrabold mt-5">404</p>
        <p className="text-black text-4xl  font-bold mt-1">Page not found</p>
        <p
          className="text-black text-2xl mt-3 hover:text-slate-400 hover:cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Go back to home page
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
