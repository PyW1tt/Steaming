import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  children: React.ReactNode;
}
function Navbar(props: NavbarProps): JSX.Element {
  return (
    <>
      <div className=" relative z-10 w-full flex px-[100px] py-[25px] justify-between items-center">
        <div className="">
          <Link to="#">
            <img src="../../icon/Logo.svg" alt="" />
          </Link>
        </div>
        <div className="justify-start items-start gap-8 flex text-2xl ">
          <Link to="#" className="font-extrabold hover:text-emerald-500 ">
            Home
          </Link>
          <Link to="#" className="font-normal hover:text-emerald-500 ">
            TV Shows
          </Link>
          <Link to="#" className="font-normal hover:text-emerald-500">
            Moives
          </Link>
          <Link to="#" className="font-normal hover:text-emerald-500">
            My List
          </Link>
          <Link to="#" className="font-normal hover:text-emerald-500">
            About
          </Link>
        </div>
        <div className="justify-start items-center gap-[23px] flex">
          <div>
            <img src="../../icon/search.svg" alt="" />
          </div>
          <div>
            <img src="../../icon/bell.svg" alt="" />
          </div>
          <div className="justify-start items-center gap-1 flex">
            <img
              className="w-[50px] h-[50px] rounded-full border border-white"
              src="https://via.placeholder.com/32x32"
            />
            <div></div>
          </div>
        </div>
      </div>
      {props.children}
    </>
  );
}

export default Navbar;
