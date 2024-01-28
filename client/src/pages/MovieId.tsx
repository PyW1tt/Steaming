import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMedia from "../hook/adminHook/useMedia";
import { LoadingMovie } from "./LoadingPage";

function MovieId() {
  const [isMouseMoving, setIsMouseMoving] = useState<boolean>(false);

  const { loading, isError, getMoviesById, dataMovieId } = useMedia();
  const navigate = useNavigate();
  const param = useParams();
  // console.log(param.id);

  useEffect(() => {
    getMoviesById(param.id);
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
    <div>
      {loading ? (
        <LoadingMovie />
      ) : isError ? (
        <p>Not Found</p>
      ) : (
        <div className=" h-screen w-screen bg-black">
          <nav
            className={` ${
              isMouseMoving
                ? "fixed w-full py-4 pl-6 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70 h-20"
                : " hidden"
            }`}
          >
            <img
              src="icon/left.svg"
              alt=""
              className=" hover:cursor-pointer ml-5"
              onClick={() => {
                navigate("/");
              }}
            />
            <div className="flex text-xl font-bold">
              <div className=" font-light">Wacthing :</div> &nbsp;
              {dataMovieId.title}
            </div>
          </nav>
          <video
            autoPlay
            controls
            className=" h-full w-full"
            src={dataMovieId.video_url}
          ></video>
        </div>
      )}
    </div>
  );
}

export default MovieId;
