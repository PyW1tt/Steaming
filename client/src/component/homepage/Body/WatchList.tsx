import React from "react";
import data from "../../../hook/useMoviesData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

function WatchList(): JSX.Element {
  return (
    <div className="pt-10 px-[100px]">
      <p className="text-2xl font-bold leading-loose tracking-tigh ">
        Your Watchlist
      </p>

      <Swiper
        slidesPerView={5}
        navigation={true}
        modules={[Navigation]}
        className="flex w-full h-[266px] "
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className=" cursor-pointer flex flex-col py-6  "
            >
              <img
                src={item.thumbnailUrl}
                alt=""
                className="w-[320px] h-[180px] rounded-2xl object-fill hover:border-4 hover:border-emerald-500 "
              />

              <div className="mt-3">
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
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default WatchList;
