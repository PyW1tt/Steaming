import React from "react";
import { Link } from "react-router-dom";
import Header from "./homepage/Header";
interface NavbarProps {
  children: React.ReactNode;
  bg?: string;
}
function Navbar(props: NavbarProps): JSX.Element {
  const isHome = React.Children.toArray(props.children).some(
    (child) => (child as React.ReactElement).type === Header
  );
  const isTVShow = React.Children.toArray(props.children).some(
    (child) =>
      React.isValidElement(child) &&
      child.type === "div" &&
      (child.props.className || "").includes("tvshows")
  );
  const isMovies = React.Children.toArray(props.children).some(
    (child) =>
      React.isValidElement(child) &&
      child.type === "div" &&
      (child.props.className || "").includes("movies")
  );
  const isMyList = React.Children.toArray(props.children).some(
    (child) =>
      React.isValidElement(child) &&
      child.type === "div" &&
      ((child as React.ReactElement).props.className || "").includes("myList")
  );

  return (
    <>
      <div
        className={`relative z-10 w-full flex px-[100px] py-[25px] justify-between items-center ${
          props.bg ? props.bg : ""
        }`}
      >
        <div className="">
          <Link to="/">
            <img src="../../icon/Logo.svg" alt="" />
          </Link>
        </div>
        <div className="justify-start items-start gap-8 flex text-2xl ">
          <Link
            to="/"
            className={` hover:text-emerald-500 ${
              isHome ? "font-extrabold " : "font-normal"
            }`}
          >
            Home
          </Link>
          <Link
            to="/tvshows"
            className={` hover:text-emerald-500 ${
              isTVShow ? "font-extrabold " : "font-normal"
            }`}
          >
            TV Shows
          </Link>
          <Link
            to="/movies"
            className={` hover:text-emerald-500 ${
              isMovies ? "font-extrabold " : "font-normal"
            }`}
          >
            Moives
          </Link>
          <Link
            to="/mylist"
            className={` hover:text-emerald-500 ${
              isMyList ? "font-extrabold " : "font-normal"
            }`}
          >
            My List
          </Link>
          <Link
            to="#"
            className={` hover:text-emerald-500 ${
              isHome ? "font-extrabold " : "font-normal"
            }`}
          >
            Release
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
