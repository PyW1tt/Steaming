import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import data from "../../../hook/useMoviesData";
import { Button } from "@/components/ui/button";
import "./Swiper.css";
import { useNavigate } from "react-router-dom";

interface genres {
  genres: string;
  img: string;
}

const genres: genres[] = [
  {
    genres: "Action",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Drama",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Romance",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Fantasy",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Thriller",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Science fiction",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Korean Dramas",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "TV Shows",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Adventure",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Crime",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Mystery",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Animation",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Historical",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Documentary",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Comedy",
    img: "../../../../genres/Superhero.jpg",
  },
  {
    genres: "Horror",
    img: "../../../../genres/Superhero.jpg",
  },
];

function Genres(): JSX.Element {
  const [nameGenres, setNameGenres] = useState<string>();
  const navigate = useNavigate();

  return (
    <>
      <div className=" relative">
        <Swiper
          style={{ "--swiper-pagination-bottom": "250px" }}
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
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className=" w-full absolute bottom-[100px] px-[100px] ">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={0}
            navigation={true}
            modules={[Navigation]}
            className=""
          >
            {genres.map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className=" h-[110px] relative cursor-pointer pl-[25px] pr-[30px]"
                  onClick={() => {
                    setNameGenres(item.genres);
                  }}
                >
                  <div
                    className="rounded-xl w-[210px]  justify-center items-center flex bg-cover bg-center bg-no-repeat ml-4"
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
