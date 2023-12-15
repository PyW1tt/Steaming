import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function DropDown() {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" hover:cursor-pointer">
        <img src="../../icon/Arrow - Down 2.svg" alt="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-slate-600 border-none mt-3 mr-2 py-3 shadow-lg ">
        <DropdownMenuRadioGroup>
          <DropdownMenuItem
            className=""
            onClick={() => {
              navigate("/profile");
            }}
          >
            <img src="../../public/icon/icon=user.svg" alt="" />
            <span className="text-slate-400 text-base ml-1">Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-2" />
          <DropdownMenuItem className="">
            <img src="../../public/icon/icon=logout.svg" alt="" />
            <span className="text-slate-400 text-base ml-1">Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDown;
