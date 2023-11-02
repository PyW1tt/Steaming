import React from "react";
import data from "../../../hook/useMoviesData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import "../Homepage.css";

function Popular(): JSX.Element {
  return (
    <div className="pt-10 w-full px-[100px]">
      <p className="text-2xl font-bold tracking-tight leading-loose">
        Popular of the week
      </p>
      <Swiper
        slidesPerView={5}
        navigation={true}
        modules={[Navigation]}
        className="flex w-full"
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className=" cursor-pointer py-6 relative  flex justify-center transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200"
            >
              <div className="w-[38px] flex items-center justify-center">
                <p className="text-5xl font-semibold tracking-tight leading-[64px] ">
                  {index + 1}
                </p>
              </div>
              <div className="mx-3">
                <img
                  src={item.thumbnailUrl}
                  alt=""
                  className="w-[107px] h-32 rounded-2xl object-fill"
                />
              </div>

              <div className=" flex flex-col justify-between">
                <p className="text-gray-300 text-xs font-medium  tracking-tight">
                  PG-13
                </p>
                <p className="text-base font-bold leading-normal tracking-tight">
                  {item.title.length > 20
                    ? item.title.slice(0, 20) + "..."
                    : item.title}
                </p>
                <div>
                  <span className="flex  text-xs font-medium">
                    <img
                      src="../../../../icon/film.svg"
                      alt=""
                      className="mr-1"
                    />
                    <p className="text-gray-500">Horror</p>
                    <p className="text-gray-500 mx-1">•</p>
                    <p className="text-gray-500">Thriller</p>
                  </span>
                </div>
                <div className=" flex items-center text-gray-500">
                  <img
                    src="../../../../icon/star.svg"
                    alt=""
                    className="mr-1 "
                  />
                  <p className="text-xs font-semibold leading-tight tracking-tight">
                    4.9
                  </p>
                  <p className="text-gray-500 mx-1">|</p>
                  <p className="text-gray-500 text-xs font-medium">Movie</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Popular;
