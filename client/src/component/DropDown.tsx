import React, { useEffect } from "react";
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
import { useAuth } from "../context/AuthContext";
import useDataUser from "../hook/useDataUser";

function DropDown() {
  const navigate = useNavigate();
  const { logout, userData } = useAuth();
  const { getData } = useDataUser();

  useEffect(() => {
    getData();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" hover:cursor-pointer">
        <img src="../../icon/Arrow - Down 2.svg" alt="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-slate-600 border-none mt-3 mr-2 py-3 shadow-lg ">
        <DropdownMenuRadioGroup>
          <DropdownMenuItem
            className="hover:cursor-pointer "
            onClick={() => {
              navigate(`/profile/${userData?.id}`);
            }}
          >
            <img src="../../public/icon/icon=user.svg" alt="" />
            <span className="text-slate-400 text-base ml-1 ">Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-2" />
          <DropdownMenuItem className="hover:cursor-pointer">
            <div
              className="flex"
              onClick={() => {
                logout();
              }}
            >
              <img src="../../public/icon/icon=logout.svg" alt="" />
              <span className="text-slate-400 text-base ml-1">Log Out</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDown;
