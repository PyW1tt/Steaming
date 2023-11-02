import React, { useState } from "react";
import data from "../../../hook/useMoviesData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import "../Homepage.css";

function Release(): JSX.Element {
  const [hoveredItem, setHoveredItem] = useState<unknown>(null);

  return (
    <div className="pt-10 px-[100px]">
      <p className="text-2xl font-bold leading-loose tracking-tight">
        Just Release
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
              className="cursor-pointer py-6 relative  flex justify-center transition ease-in-out delay-[50ms] hover:-translate-y-1 hover:scale-110 duration-200"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <img
                src={item.thumbnailUrl}
                alt=""
                className="w-[280px] h-[350px] rounded-2xl object-fill"
              />

              {hoveredItem === index && (
                <div className=" absolute bottom-5  w-[280px] h-[150px] p-5 bg-gradient-to-t from-black from-15%  rounded-bl-2xl rounded-br-2xl flex-col justify-end items-start gap-1 inline-flex">
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
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Release;
