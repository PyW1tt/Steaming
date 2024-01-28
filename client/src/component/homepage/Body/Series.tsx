import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import "./Swiper.css";
import { LoadingRelease } from "../../../pages/LoadingPage";
import useDataUser from "../../../hook/useDataUser";
import { useNavigate } from "react-router-dom";

function Series() {
  const [hoveredItem, setHoveredItem] = useState<unknown>(null);
  const { getSeries, dataMovies, loading, isError } = useDataUser();
  const navigate = useNavigate();

  useEffect(() => {
    getSeries();
  }, []);

  return (
    <div className="pt-10 px-[100px]">
      <p className="text-2xl font-bold leading-loose tracking-tight ">Series</p>
      {loading ? (
        <LoadingRelease />
      ) : isError ? (
        <p>Not Found</p>
      ) : (
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={0}
          navigation={true}
          modules={[Navigation]}
          className=" "
        >
          {dataMovies.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className="pl-[33px] pr-[30px] cursor-pointer py-6 transition ease-in-out delay-[50ms] hover:-translate-y-1 hover:scale-110 duration-200 flex justify-center"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => {
                  navigate("*");
                }}
              >
                <img
                  src={item.thumbnail_url}
                  alt=""
                  className="w-[220px] h-[300px] rounded-2xl object-fill"
                />

                {hoveredItem === index && (
                  <div className=" absolute bottom-5  w-[220px] h-[150px] p-5 bg-gradient-to-t from-black from-15%  rounded-bl-2xl rounded-br-2xl flex-col justify-end items-start gap-1 inline-flex">
                    <p className="text-base font-bold leading-normal tracking-tight mb-1">
                      {item.title}
                    </p>
                    <div className=" flex items-center text-xs font-medium ">
                      <img
                        src="../../../../icon/star.svg"
                        alt=""
                        className="mr-1 "
                      />
                      <p className="font-semibold ">{item.rating}</p>
                      <p className="text-gray-500 mx-1 ">|</p>
                      <p className="text-gray-500">{item.genres}</p>
                      <p className="text-gray-500 mx-1 ">•</p>
                      <p className="text-gray-500">{item.type}</p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}

export default Series;
