import React, { useState } from "react";
import data from "../../hook/useMoviesData";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Navigation } from "swiper/modules";

// import ModalMovie from "../ModalMovie";
// import ModalSeries from "../ModalSeries";
import { useNavigate } from "react-router-dom";
// import useOpenModal from "../../hook/useOpenModal";
import { useDataMovie } from "../../context/dataMovieContext";
import { Input } from "@/components/ui/input";

function Search() {
  // const [hoveredItem, setHoveredItem] = useState<unknown>(null);
  // const { openModalMoive, openModalseries } = useOpenModal();
  const { setDataMovie } = useDataMovie();
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-center mb-10">
        {/* <button
          className="mr-5"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src="../../icon/left.svg" alt="" />
        </button> */}
        <Input
          type=""
          placeholder="Search for movies, TV shows, or categories "
          className=" text-lg text-center  rounded-full text-black border-[#28262d]"
          // value={search}
          // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          //   setSearch(e.target.value);
          // }}
        />
        {/* <img src="../../icon/search.svg" alt="" className="ml-2" /> */}
      </div>
      <div className=" flex flex-wrap gap-2 h-full">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="relative hover:z-30  cursor-pointer transition ease-in-out delay-[50ms] hover:-translate-y-1 hover:scale-110 duration-200 flex justify-center"
              onClick={() => {
                // item.genres === "movie" ? openModalMoive() : openModalseries();
                setDataMovie(item);
                navigate("/");
              }}
            >
              <img
                src={item.thumbnailUrl}
                alt=""
                className="w-[220px] h-[300px] rounded-2xl object-fill"
              />

              <div className=" absolute bottom-0  w-[220px] h-[150px] p-5 bg-gradient-to-t from-black from-15%  rounded-bl-2xl rounded-br-2xl flex-col justify-end items-start gap-1 inline-flex">
                <p className="text-base font-bold leading-normal tracking-tight mb-1">
                  {item.title}
                </p>
                <div className=" flex items-center text-xs font-medium ">
                  <img
                    src="../../../../icon/star.svg"
                    alt=""
                    className="mr-1 "
                  />
                  <p className="font-semibold ">4.9</p>
                  <p className="text-gray-500 mx-1 ">|</p>
                  <p className="text-gray-500">Action</p>
                  <p className="text-gray-500 mx-1 ">•</p>
                  <p className="text-gray-500">Movie</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* <ModalMovie />
      <ModalSeries /> */}
      </div>
    </div>
  );
}

export default Search;
