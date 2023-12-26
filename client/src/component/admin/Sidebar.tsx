import React, { useState } from "react";
import { Spin as Hamburger } from "hamburger-react";
import Search from "./search";
import CreateMovie from "./CreateMovie";
import CreatTVshows from "./CreateTVshows";
import { useNavigate } from "react-router-dom";
import "../../App.css";
interface SidebarProps {
  children: React.ReactNode;
}

function Sidebar(props: SidebarProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(true);

  const navigate = useNavigate();

  const isSearch = React.Children.toArray(props.children).some(
    (child) => (child as React.ReactElement).type === Search
  );
  const isMovie = React.Children.toArray(props.children).some(
    (child) => (child as React.ReactElement).type === CreateMovie
  );
  const isTVshows = React.Children.toArray(props.children).some(
    (child) => (child as React.ReactElement).type === CreatTVshows
  );

  return (
    <div className="flex ">
      <aside
        className={` ${
          open ? "w-72 " : "w-24 "
        } pt-4 flex flex-col justify-between bg-[#28262d] border-r border-black h-auto  duration-200  `}
      >
        <ul className={` flex flex-col  w-full relative`}>
          <div className={` pb-10 flex ml-5  }`}>
            <Hamburger toggled={open} toggle={setOpen} color="white" />
          </div>

          <li
            className={` cursor-pointer ${
              isSearch ? " bg-slate-400 " : "hover:bg-slate-300"
            }`}
            onClick={() => {
              navigate(`/adminSearch`);
            }}
          >
            <div className=" flex ml-7 my-4 items-center">
              <img src="../../../icon/search.svg" alt="" />
              <p
                className={`${
                  open ? "origin-left duration-200 ml-4 mr-1" : "hidden"
                }`}
              >
                Search
              </p>
            </div>
          </li>
          <li
            className={`cursor-pointer ${
              isMovie ? " bg-slate-400 " : "hover:bg-slate-300"
            }`}
            onClick={() => {
              navigate(`/createMovie`);
            }}
          >
            <div className=" flex ml-7 my-4 items-center">
              <img
                src="../../../icon/icons8-movie-50.png"
                alt=""
                className="w-[30px] h-[30px]"
              />
              <p
                className={`${
                  open ? "origin-left duration-200 ml-4 mr-1" : "hidden"
                }`}
              >
                Create&nbsp;Movie
              </p>
            </div>
          </li>
          <li
            className={`cursor-pointer  ${
              isTVshows ? " bg-slate-400 " : "hover:bg-slate-300"
            }`}
            onClick={() => {
              navigate(`/createTVshows`);
            }}
          >
            <div className=" flex ml-7 my-4 items-center ">
              <img
                src="../../../icon/icons8-tv-show-50.png"
                alt=""
                className="w-[30px] h-[30px]"
              />
              <p
                className={`${
                  open ? "origin-left duration-200 ml-4 mr-1" : "hidden"
                }`}
              >
                Create&nbsp;Series
              </p>
            </div>
          </li>
          <li
            className={` cursor-pointer hover:bg-slate-300 fixed bottom-0  ${
              open ? " w-[249px]" : "w-fit"
            }`}
            //   onClick={() => {
            //     signOut();
            //   }}
          >
            <div className="flex items-center px-7 py-4 ">
              <img src="../../../icon/icon=logout2.svg" alt="" />
              <p
                className={`${
                  open ? "origin-left duration-200 ml-4 mr-1" : "hidden"
                }`}
              >
                Log&nbsp;Out
              </p>
            </div>
          </li>
        </ul>
      </aside>

      <div className="flex flex-col w-full ">
        <nav className="w-full h-fit flex items-center py-4  bg-[#28262d] ">
          <div
            className="pl-[30px] pr-4 hover:cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src="../../../public/icon/Logo.svg" alt="" />
          </div>
          <p className="text-2xl font-bold leading-10 tracking-tight">
            Administrator
          </p>
        </nav>
        <div className=" h-full pt-10 pb-20 px-10  bg-gray-200">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
