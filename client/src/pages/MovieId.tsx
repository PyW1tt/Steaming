import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import data from "../hook/useMoviesData";

function MovieId() {
  const [isMouseMoving, setIsMouseMoving] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = () => {
      setIsMouseMoving(true);

      // ตั้งเวลาในการซ่อน Navbar หลังจากที่เมาส์หยุดเคลื่อนไหว
      const timeoutId = setTimeout(() => {
        setIsMouseMoving(false);
      }, 2500); // ตั้งค่าเวลาให้เหมาะสม

      // ล้าง timeout เมื่อมีการเคลื่อนไหวเมาส์อีกครั้ง
      window.addEventListener("mousemove", () => {
        clearTimeout(timeoutId);
        setIsMouseMoving(true);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className=" h-screen w-screen bg-black">
      <nav
        className={` ${
          isMouseMoving
            ? "fixed w-full py-4 pl-6 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70 "
            : " hidden"
        }`}
      >
        <img
          src="../../public/icon/left.svg"
          alt=""
          className=" hover:cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
        <p className=" text-xl font-bold">
          <span className=" font-light">Wacthing : </span>
          {data[0].title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        className=" h-full w-full"
        src={data[0]?.videoUrl}
      ></video>
    </div>
  );
}

export default MovieId;
