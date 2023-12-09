import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import data from "../../hook/useMoviesData";
import "./Homepage.css";
import { Button } from "@/components/ui/button";

function Header(): JSX.Element {
  return (
    <>
      <Swiper
        autoplay={{
          delay: 15000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper absolute top-0 w-full "
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide key={index} className="h-[648px] relative ">
              <div className="bg-gradient-to-t from-[#28262d] via-zinc-950 to-black w-full h-full absolute opacity-90 "></div>
              <div
                className="bg-cover bg-center bg-no-repeat h-full "
                style={{ backgroundImage: `url(${item.thumbnailUrl})` }}
              >
                <div className=" relative pt-[130px] pb-[64px] px-[100px] w-[800px]">
                  <div className=" h-[100px]"></div>
                  <p className="text-[32px] font-bold leading-10 tracking-tight">
                    {item.title}
                  </p>
                  <div className=" mt-2 text-sm font-normal flex">
                    <span className="text-gray-400">{item.duration}</span>{" "}
                    <p className="text-gray-500 mx-1">•</p>
                    <span className="text-gray-400">2022</span>
                    <p className="text-gray-500 mx-1">•</p>
                    <span className="text-gray-400">Fantasy</span>
                  </div>
                  <p className="mt-2">{item.description}</p>
                  <div className="mt-10 flex justify-between">
                    <Button className="w-[180px] h-[46px] px-6 py-3 text-sm font-bold bg-emerald-600 hover:bg-emerald-400 ">
                      <img
                        src="../../../icon/play soild.svg"
                        alt=""
                        className="mr-[10px]"
                      />
                      Play Now
                    </Button>
                    <Button className="w-[180px] h-[46px] px-6 py-3 text-sm font-bold bg-zinc-800 hover:bg-zinc-500">
                      <img
                        src="../../../icon/play.svg"
                        alt=""
                        className="mr-[10px]"
                      />
                      Watch Trailer
                    </Button>
                    <div className="w-[180px] h-[46px] px-6 py-3 rounded-[10px] text-sm font-bold border hover:bg-zinc-500 cursor-pointer flex">
                      <img
                        src="../../../icon/bookmark.svg"
                        alt=""
                        className="mr-[10px]"
                      />
                      Add Watchlist
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="h-[548px]"></div>
    </>
  );
}

export default Header;
