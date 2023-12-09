import React from "react";
import data from "../../../hook/useMoviesData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import "./Swiper.css";
import ModalMovie from "../../ModalMovie";
import useOpenModal from "../../../hook/useOpenModal";
import { useDataMovie } from "../../../context/dataMovieContext";

function WatchList(): JSX.Element {
  const { openModal, closeModal } = useOpenModal();
  const { setDataMovie } = useDataMovie();
  return (
    <>
      <div className="pt-10 px-[100px]">
        <p className="text-2xl font-bold leading-loose tracking-tigh ">
          Your Watchlist
        </p>

        <Swiper
          slidesPerView={"auto"}
          spaceBetween={0}
          navigation={true}
          modules={[Navigation]}
          className=""
        >
          {data.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className="pl-[35px] pr-[25px] cursor-pointer flex flex-col py-6 items-center "
                onClick={() => {
                  openModal();
                  setDataMovie(item);
                }}
              >
                <div>
                  <img
                    src={item.thumbnailUrl}
                    alt=""
                    className="w-[280px] h-[160px] rounded-2xl object-fill hover:border-4 hover:border-emerald-500 "
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
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <ModalMovie />
    </>
  );
}

export default WatchList;
