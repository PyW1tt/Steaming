import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import data from "../../../hook/useMoviesData";
import { Button } from "@/components/ui/button";
import "./Genres.css";

interface genres {
  genres: string;
  img: string;
}

const genres: genres[] = [
  {
    genres: "Superhero",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Drama",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Sitcom",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Thriller",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Comedy",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Fantasy",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Korean Dramas",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Western TV Shows",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Romance",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Documentary",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Sci-fi",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Horror",
    img: "../../../../genres/Superhero.jpg",
  },
];

function Genres(): JSX.Element {
  const [nameGenres, setNameGenres] = useState<string>();
  return (
    <>
      <div className=" relative">
        <Swiper
          autoplay={{
            delay: 15000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper w-full mt-10 "
        >
          {data.map((item, index) => {
            return (
              <SwiperSlide key={index} className=" h-[700px] relative ">
                <div className="py-[100px]  px-[100px] bg-gradient-to-t from-[#28262d] from-5% via-zinc-950 to-black w-full h-full absolute opacity-90 "></div>
                <div
                  className="bg-cover bg-center bg-no-repeat h-full "
                  style={{ backgroundImage: `url(${item.thumbnailUrl})` }}
                >
                  <div className=" relative pt-[130px] pl-[100px] mb-[60px] w-full ">
                    <div className="mb-[150px]">
                      <div className="w-48 h-9 px-4 py-2 bg-black bg-opacity-25 rounded-2xl justify-center items-center gap-2 inline-flex mb-5">
                        <div className="text-stone-50 text-base font-medium font-['Rubik'] leading-tight tracking-tight">
                          Explore by the genre
                        </div>
                      </div>
                      <p className="w-[500px] text-5xl font-bold leading-[54px] tracking-tight mb-5">
                        {item.title}
                      </p>
                      <div className=" mt-2 text-sm font-normal flex  items-center">
                        <img src="../../../../public/icon/star.svg" alt="" />
                        <span className="text-gray-400 ml-1">
                          {item.duration}
                        </span>{" "}
                        <p className="text-gray-500 mx-1">•</p>
                        <span className="text-gray-400">2022</span>
                        <p className="text-gray-500 mx-1">•</p>
                        <span className="text-gray-400">Fantasy</span>
                      </div>
                      <div className="mt-5 flex ">
                        <Button className="w-[180px] h-[46px] px-6 py-3 text-sm font-bold bg-emerald-600 hover:bg-emerald-400 mr-6">
                          <img
                            src="../../../icon/play soild.svg"
                            alt=""
                            className="mr-[10px]"
                          />
                          Play Now
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
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="px-[100px] w-full absolute bottom-[100px] ">
          <Swiper
            slidesPerView={7}
            navigation={true}
            modules={[Navigation]}
            className="flex justify-center"
          >
            {genres.map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className=" h-[110px] relative cursor-pointer"
                  onClick={() => {
                    setNameGenres(item.genres);
                  }}
                >
                  <div
                    className="rounded-xl w-[210px]  left-0 top-0 absolute justify-center items-center inline-flex bg-cover bg-center bg-no-repeat "
                    style={{ backgroundImage: `url(${item.img})` }}
                  >
                    <div
                      className={`w-[210px] h-[99px]  rounded-xl  hover:border-2 hover:border-emerald-400 flex justify-center items-center
                    ${
                      nameGenres === item.genres
                        ? "border-2 border-emerald-600 bg-emerald-600 bg-opacity-20 "
                        : ""
                    }`}
                    >
                      <div className=" text-lg font-extrabold leading-[18px] ">
                        {item.genres}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Genres;

// focus:border-2 focus:border-emerald-600

{
  /* <div className="absolute left-[100px] bottom-[120px] z-50 flex">
          {action.map((item, index) => {
            return (
              <div
                key={index}
                className="w-[210px] h-[99px] relative cursor-pointer"
              >
                <div
                  className="rounded-xl w-[210px] h-[99px] left-0 top-0 absolute justify-center items-center inline-flex bg-cover bg-center bg-no-repeat "
                  style={{ backgroundImage: `url(${item.img})` }}
                >
                  <div className="w-[210px] h-[99px] bg-emerald-600 bg-opacity-20 rounded-xl  hover:border-2 hover:border-emerald-400" />
                </div>
                <div className="left-[63px] top-[41px] absolute text-stone-50 text-lg font-extrabold leading-[18px]">
                  {item.action}
                </div>
              </div>
            );
          })}
        </div> */
}

{
  /* <Swiper
        slidesPerView={5}
        navigation={true}
        modules={[Navigation]}
        className="flex w-full h-[266px] "
      >
        {action.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className="cursor-pointer absolute left-[100px] bottom-[120px] z-50"
            >
              <div className="w-[210px] h-[99px] relative cursor-pointer">
                <div
                  className="rounded-xl w-[210px] h-[99px] left-0 top-0 absolute justify-center items-center inline-flex bg-cover bg-center bg-no-repeat "
                  style={{ backgroundImage: `url(${item.img})` }}
                >
                  <div className="w-[210px] h-[99px] bg-emerald-600 bg-opacity-20 rounded-xl  hover:border-2 hover:border-emerald-400" />
                </div>
                <div className="left-[63px] top-[41px] absolute text-stone-50 text-lg font-extrabold leading-[18px]">
                  {item.action}{" "}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper> */
}
