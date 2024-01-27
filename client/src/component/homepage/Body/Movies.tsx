import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import "./Swiper.css";
import ModalMovie from "../../ModalMovie";
import ModalSeries from "../../ModalSeries";
import useOpenModal from "../../../hook/useOpenModal";
import { LoadingRelease } from "../../../pages/LoadingPage";
import useDataUser from "../../../hook/useDataUser";
import { useDataMovie } from "../../../context/dataMovieContext";

function Movies() {
  const [hoveredItem, setHoveredItem] = useState<unknown>(null);
  const { openModalMoive, openModalseries } = useOpenModal();
  const { getMovies, dataMovies, loading, isError } = useDataUser();
  const { isModalMovieOpen, isModalSeriesOpen } = useDataMovie();

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="pt-10 px-[100px]">
      <p className="text-2xl font-bold leading-loose tracking-tight ">Movies</p>
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
                  localStorage.setItem("idMedia", JSON.stringify(item.id));
                  item.type === "Movie" ? openModalMoive() : openModalseries();
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
      {isModalMovieOpen && <ModalMovie />}
      {isModalSeriesOpen && <ModalSeries />}
    </div>
  );
}

export default Movies;
