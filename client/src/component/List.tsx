import React, { useState } from "react";
import data from "../hook/useMoviesData";
import useOpenModal from "../hook/useOpenModal";
import { useDataMovie } from "../context/dataMovieContext";
import ModalMovie from "./ModalMovie";
import ModalSeries from "./ModalSeries";

function List() {
  const [hoveredItem, setHoveredItem] = useState<unknown>(null);
  const { openModalMoive, openModalseries } = useOpenModal();
  const { setDataMovie } = useDataMovie();

  return (
    <div className="bg-[#28262d] px-[100px] h-screen">
      <div className="flex flex-wrap 2xl:gap-x-[46px] xl:gap-x-1">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="mt-5 cursor-pointer  transition ease-in-out delay-[50ms] hover:-translate-y-1 hover:scale-110 duration-200 flex justify-center"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => {
                item.genres === "movie" ? openModalMoive() : openModalseries();
                setDataMovie(item);
              }}
            >
              <img
                src={item.thumbnailUrl}
                alt=""
                className="w-[306px] h-[175px] rounded-xl object-fill"
              />

              {hoveredItem === index && (
                <div className=" absolute bottom-0  w-[306px] h-[175px] pb-2 pl-3 bg-gradient-to-t from-black from-15%  rounded-bl-xl rounded-br-xl flex-col justify-end items-start gap-1 inline-flex">
                  <p className="text-xs font-bold leading-normal tracking-tight ">
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
              )}
            </div>
          );
        })}
      </div>
      <ModalMovie />
      <ModalSeries />
    </div>
  );
}

export default List;
