import React from "react";
import { Link } from "react-router-dom";
import BackToTop from "../BackToTop";

function Footer(): JSX.Element {
  return (
    <>
      <div className="bg-[#28262d] px-[100px] pt-[70px] flex justify-between pb-[60px]">
        <div className="text-[40px] font-medium leading-[48px] w-[444px]">
          Our platform is trusted <br />
          by millions & features <br />
          best updated movies <br />
          all around the world.
        </div>
        <div className="w-[413px] ">
          <div className=" flex justify-between items-center mb-[138px] text-xl font-normal">
            <Link to="#" className=" hover:text-emerald-500 ">
              Home
            </Link>
            /
            <Link to="#" className=" hover:text-emerald-500 ">
              Discover
            </Link>
            /
            <Link to="#" className=" hover:text-emerald-500 ">
              Influence
            </Link>
            /
            <Link to="#" className=" hover:text-emerald-500 ">
              Release
            </Link>
          </div>
          <div className=" flex justify-end">
            <a href="#" className="mr-10">
              <img src="../../../icon/Instagram.svg" alt="" />
            </a>
            <a href="#" className="mr-10">
              <img src="../../../icon/Facebook.svg" alt="" />
            </a>
            <a href="#" className="mr-10">
              <img src="../../../icon/Twitter.svg" alt="" />
            </a>
            <a href="#">
              <img src="../../../icon/Google.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-[#28262d] px-[100px] flex justify-between pb-10">
        <div className=" flex justify-between text-sm font-normal leading-snug">
          <Link to="#" className=" hover:text-emerald-500 mr-7">
            Privacy policy
          </Link>
          <Link to="#" className=" hover:text-emerald-500 mr-7">
            Term of service
          </Link>
          <Link to="#" className=" hover:text-emerald-500 ">
            Language
          </Link>
        </div>
        <div className="opacity-70text-[17px] font-normal leading-[25px] ">
          © 2023
        </div>
      </div>
      {/* <BackToTop /> */}
    </>
  );
}

export default Footer;
