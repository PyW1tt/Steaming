import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import data from "../../hook/useMoviesData";
import "./Homepage.css";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Header(): React.JSX.Element {
  const navigate = useNavigate();
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
            <SwiperSlide key={index} className="h-[648px]  relative">
              <div className="bg-gradient-to-t from-[#28262d] via-zinc-950 to-black w-full h-full absolute opacity-90 z-10"></div>
              <div className=" absolute w-full">
                <video
                  className=" object-cover h-full w-full "
                  poster={item.thumbnailUrl}
                  src={item.videoUrl}
                  autoPlay
                  muted
                  loop
                ></video>
              </div>
              <div className=" relative pt-[130px] pb-[64px] px-[100px] w-[800px] z-20">
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
                <div className="mt-10 flex ">
                  <Button
                    className="w-[180px] h-[46px] px-6 py-3 text-sm font-bold bg-emerald-600 hover:bg-emerald-400 mr-5"
                    onClick={() => {
                      navigate("/movieId");
                    }}
                  >
                    <img
                      src="../../../icon/play soild.svg"
                      alt=""
                      className="mr-[10px]"
                    />
                    Play Now
                  </Button>

                  {item.list === undefined || item.list === false ? (
                    <Button className=" bg-inherit w-[180px] h-[46px] px-6 py-3 rounded-[10px] text-sm font-bold border hover:bg-zinc-500 cursor-pointer flex">
                      <img
                        src="../../../icon/bookmark.svg"
                        alt=""
                        className="mr-[10px]"
                      />
                      Add Watchlist
                    </Button>
                  ) : (
                    <Button className=" bg-inherit w-[150px] h-[46px] px-6 py-3 rounded-[10px] text-sm font-bold border hover:bg-zinc-500 cursor-pointer flex">
                      <img
                        src="../../../icon/check.svg"
                        alt=""
                        className="mr-[10px]"
                      />
                      Watchlist
                    </Button>
                  )}
                </div>
              </div>

              {/* <div
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
                  <div className="mt-10 flex ">
                    <Button className="w-[180px] h-[46px] px-6 py-3 text-sm font-bold bg-emerald-600 hover:bg-emerald-400 mr-5">
                      <img
                        src="../../../icon/play soild.svg"
                        alt=""
                        className="mr-[10px]"
                      />
                      Play Now
                    </Button>

                    {item.list === undefined || item.list === false ? (
                      <Button className=" bg-inherit w-[180px] h-[46px] px-6 py-3 rounded-[10px] text-sm font-bold border hover:bg-zinc-500 cursor-pointer flex">
                        <img
                          src="../../../icon/bookmark.svg"
                          alt=""
                          className="mr-[10px]"
                        />
                        Add Watchlist
                      </Button>
                    ) : (
                      <Button className=" bg-inherit w-[150px] h-[46px] px-6 py-3 rounded-[10px] text-sm font-bold border hover:bg-zinc-500 cursor-pointer flex">
                        <img
                          src="../../../icon/check.svg"
                          alt=""
                          className="mr-[10px]"
                        />
                        Watchlist
                      </Button>
                    )}
                  </div>
                </div>
              </div> */}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="h-[548px]"></div>
    </>
  );
}

export default Header;