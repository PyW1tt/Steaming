import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./homepage/Header";
import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useDataUser from "../hook/useDataUser";
import { Button } from "@/components/ui/button";
interface NavbarProps {
  children: React.ReactNode;
  bg?: string;
}
function Navbar(props: NavbarProps): JSX.Element {
  const { userData, isAuthenticated } = useAuth();
  const { getData } = useDataUser();
  const navigate = useNavigate();
  // console.log(userData);

  const isHome = React.Children.toArray(props.children).some(
    (child) => (child as React.ReactElement).type === Header
  );
  const isTVShow = React.Children.toArray(props.children).some(
    (child) =>
      React.isValidElement(child) &&
      child.type === "div" &&
      (child.props.className || "").includes("series")
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

  useEffect(() => {
    getData();
  }, []);
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
            Series
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
          {userData.role === "admin" && (
            <Link
              to="/adminSearch"
              className={` hover:text-emerald-500 ${"font-normal"}`}
            >
              Admin
            </Link>
          )}
        </div>
        {isAuthenticated ? (
          <div className="justify-start items-center gap-[23px] flex">
            <div
              className=" hover:cursor-pointer"
              onClick={() => {
                navigate("/search");
              }}
            >
              <img src="../../icon/search.svg" alt="" />
            </div>
            <div className="justify-start items-center gap-1 flex">
              <img
                className="w-[50px] h-[50px] rounded-full border border-white"
                src={
                  userData.profile_img === null
                    ? "https://via.placeholder.com/32x32"
                    : userData.profile_img
                }
              />
              <DropDown />
            </div>
          </div>
        ) : (
          <Button
            className="bg-emerald-600 hover:bg-emerald-400 font-normal text-lg"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        )}
      </div>
      {props.children}
    </>
  );
}

export default Navbar;
