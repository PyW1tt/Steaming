import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { LoadingGenres } from "../../../pages/LoadingPage";
import useDataUser from "../../../hook/useDataUser";
import { useAuth } from "../../../context/AuthContext";
import useMedia from "../../../hook/adminHook/useMedia";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
interface genres {
  genres: string;
  img: string;
}

const genres: genres[] = [
  {
    genres: "Action",
    img: "https://upxngjsfgvqqgbsapppe.supabase.co/storage/v1/object/public/img/movie_img/poster/1705753245194",
  },
  {
    genres: "Drama",
    img: "https://upxngjsfgvqqgbsapppe.supabase.co/storage/v1/object/public/img/movie_img/poster/1706114164778",
  },
  {
    genres: "Romance",
    img: "https://upxngjsfgvqqgbsapppe.supabase.co/storage/v1/object/public/img/movie_img/poster/1706119155986",
  },
  {
    genres: "Fantasy",
    img: "https://upxngjsfgvqqgbsapppe.supabase.co/storage/v1/object/public/img/movie_img/poster/1706114418703",
  },
  {
    genres: "Thriller",
    img: "https://upxngjsfgvqqgbsapppe.supabase.co/storage/v1/object/public/img/movie_img/poster/1706119654712",
  },
  {
    genres: "Science fiction",
    img: "https://upxngjsfgvqqgbsapppe.supabase.co/storage/v1/object/public/img/movie_img/poster/1706119430526",
  },
  {
    genres: "Adventure",
    img: "https://upxngjsfgvqqgbsapppe.supabase.co/storage/v1/object/public/img/series_img/cover/1706027150251",
  },
  {
    genres: "Crime",
    img: "https://upxngjsfgvqqgbsapppe.supabase.co/storage/v1/object/public/img/movie_img/poster/1706111281013",
  },
  {
    genres: "Mystery",
    img: "https://upxngjsfgvqqgbsapppe.supabase.co/storage/v1/object/public/img/movie_img/poster/1706118907124",
  },
  {
    genres: "Animation",
    img: "https://upxngjsfgvqqgbsapppe.supabase.co/storage/v1/object/public/img/movie_img/poster/1706028207105",
  },
  {
    genres: "Historical",
    img: "https://upxngjsfgvqqgbsapppe.supabase.co/storage/v1/object/public/img/movie_img/poster/1706115388794",
  },
  {
    genres: "Documentary",
    img: "https://upxngjsfgvqqgbsapppe.supabase.co/storage/v1/object/public/img/movie_img/poster/1706113887020",
  },
  {
    genres: "Comedy",
    img: "https://upxngjsfgvqqgbsapppe.supabase.co/storage/v1/object/public/img/movie_img/poster/1706110108889",
  },
  {
    genres: "Horror",
    img: "https://upxngjsfgvqqgbsapppe.supabase.co/storage/v1/object/public/img/movie_img/poster/1706118714809",
  },
];

function Genres(): JSX.Element {
  const auth = useAuth();
  const [nameGenres, setNameGenres] = useState<string>("Action");
  const navigate = useNavigate();
  const { loading, isError, dataMovies, getAll, getAllWithId, setDataMovies } =
    useDataUser();
  const { handleAddWatchList, handleChangeWatchList } = useMedia();
  const limit = "5";

  useEffect(() => {
    if (auth.isAuthenticated) {
      getAllWithId("", limit);
    } else {
      getAll("", limit);
    }
  }, []);
  // console.log(dataMovies);

  return (
    <>
      <div className=" relative">
        {loading ? (
          <LoadingGenres />
        ) : isError ? (
          <p>Not Found</p>
        ) : (
          <Carousel
            // style={{ "--swiper-pagination-bottom": "250px" }}
            // autoplay={{
            //   delay: 15000,
            //   disableOnInteraction: false,
            // }}
            // pagination={{
            //   clickable: true,
            // }}
            // modules={[Autoplay, Pagination]}
            className="w-full mt-10 "
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {dataMovies.map((item, index) => {
                return (
                  <CarouselItem key={index} className=" h-[700px] relative ">
                    <div className="py-[100px]  px-[100px] bg-gradient-to-t from-[#28262d] from-5% via-zinc-850 to-black w-full h-full absolute opacity-85 "></div>
                    <div
                      className="bg-cover bg-center bg-no-repeat h-full object-fit"
                      style={{
                        backgroundImage:
                          item.type === "Movie"
                            ? `url(${item.poster_url})`
                            : `url(${
                                (item.episodes[0] as { coverUrl: string })
                                  .coverUrl
                              })`,
                      }}
                    >
                      <div className=" relative pt-[130px] pl-[100px] mb-[60px] w-full ">
                        <div className="mb-[150px]">
                          <div className="w-48 h-9 px-4 py-2 bg-slate-300 bg-opacity-25 rounded-2xl justify-center items-center gap-2 inline-flex mb-5">
                            <div className="text-stone-50 text-base font-medium  leading-tight tracking-tight">
                              Explore by the genre
                            </div>
                          </div>
                          <p className="w-[500px] text-5xl font-bold leading-[54px] tracking-tight mb-5">
                            {item.title}
                          </p>
                          <div className=" mt-2 text-sm font-normal flex ">
                            <img src="../../../..icon/star.svg" alt="" />
                            <div className="flex mt-1">
                              <span className="text-gray-400 ml-1">
                                {item.type === "Movie" ? (
                                  item.hours != null ? (
                                    item.min === "" ? (
                                      <span className="text-gray-400">
                                        {" "}
                                        {item.hours}h
                                      </span>
                                    ) : (
                                      <span className="text-gray-400">
                                        {item.hours}h{item.min}m
                                      </span>
                                    )
                                  ) : (
                                    <span className="text-gray-400">
                                      {" "}
                                      {item.min}m
                                    </span>
                                  )
                                ) : item.episodes[0].hours != null ? (
                                  item.episodes[0].min === "" ? (
                                    <span className="text-gray-400">
                                      {" "}
                                      {item.episodes[0].hours}h
                                    </span>
                                  ) : (
                                    <span className="text-gray-400">
                                      {item.episodes[0].hours}h
                                      {item.episodes[0].min}m
                                    </span>
                                  )
                                ) : (
                                  <span className="text-gray-400">
                                    {" "}
                                    {item.episodes[0].min}m
                                  </span>
                                )}
                              </span>
                              <p className="text-gray-500 mx-1">•</p>
                              <span className="text-gray-400">
                                {item.release_date.substring(0, 4)}
                              </span>
                              <p className="text-gray-500 mx-1">•</p>
                              <span className="text-gray-400">
                                {item.genres}
                              </span>
                            </div>
                          </div>
                          <div className="mt-10 flex ">
                            <Button
                              className="w-[180px] h-[46px] px-6 py-3 text-sm font-bold bg-emerald-600 hover:bg-emerald-400 mr-5"
                              onClick={() => {
                                if (item.type === "Movie") {
                                  navigate(`/movieId/${item.series_id}`);
                                } else if (
                                  item.episodes &&
                                  item.episodes.length > 0
                                ) {
                                  // ตรวจสอบว่า item.episodes ไม่ใช่ null และมีข้อมูล
                                  const sortedEpisodes = [
                                    ...item.episodes,
                                  ].sort((a, b) => {
                                    // เรียงตอนตามลำดับที่คุณต้องการ
                                    return (
                                      parseInt(a.episodes_ep) -
                                      parseInt(b.episodes_ep)
                                    );
                                  });

                                  // ใช้ตอนแรกหลังจากการเรียงลำดับ
                                  const firstEpisodeId = sortedEpisodes[0]?.id;

                                  navigate(`/serieId/${firstEpisodeId}`);
                                }
                              }}
                            >
                              <img
                                src="../../../icon/play soild.svg"
                                alt=""
                                className="mr-[10px]"
                              />
                              Play Now
                            </Button>

                            <Button
                              className="bg-inherit w-[150px] h-[46px] px-6 py-3 rounded-[10px] text-sm font-bold border hover:bg-zinc-500 cursor-pointer flex"
                              onClick={() => {
                                if (auth.isAuthenticated) {
                                  const currentWatchListAdd =
                                    item.watch_list[0].watchListAdd;

                                  if (currentWatchListAdd === true) {
                                    const watchList =
                                      localStorage.getItem("watchListId");
                                    if (watchList) {
                                      const idWatchList = JSON.parse(watchList);
                                      handleChangeWatchList(
                                        idWatchList,
                                        "false"
                                      );
                                    } else {
                                      handleChangeWatchList(
                                        item.watch_list[0].watchListId,
                                        "false"
                                      );
                                    }

                                    const newDataMovies = [...dataMovies];
                                    newDataMovies[
                                      index
                                    ].watch_list[0].watchListAdd =
                                      !newDataMovies[index].watch_list[0]
                                        .watchListAdd;
                                    setDataMovies(newDataMovies);
                                  } else {
                                    if (
                                      item.watch_list[0].watchListAdd === null
                                    ) {
                                      localStorage.removeItem("watchListId");
                                      handleAddWatchList(
                                        item.series_id,
                                        item.type === "Movie"
                                          ? "movie"
                                          : "series"
                                      );
                                      const newDataMovies = [...dataMovies];
                                      newDataMovies[
                                        index
                                      ].watch_list[0].watchListAdd = true;
                                      setDataMovies(newDataMovies);
                                    } else {
                                      const watchList =
                                        localStorage.getItem("watchListId");
                                      if (watchList) {
                                        const idWatchList =
                                          JSON.parse(watchList);
                                        handleChangeWatchList(
                                          idWatchList,
                                          "true"
                                        );
                                      } else {
                                        handleChangeWatchList(
                                          item.watch_list[0].watchListId,
                                          "true"
                                        );
                                      }

                                      const newDataMovies = [...dataMovies];
                                      newDataMovies[
                                        index
                                      ].watch_list[0].watchListAdd =
                                        !newDataMovies[index].watch_list[0]
                                          .watchListAdd;
                                      setDataMovies(newDataMovies);
                                    }
                                  }

                                  // setRefresh(!refresh);
                                } else {
                                  navigate("*");
                                }
                              }}
                            >
                              {auth.isAuthenticated &&
                              item.watch_list[0].watchListAdd === true ? (
                                <>
                                  <img
                                    src="../../../icon/check.svg"
                                    alt=""
                                    className="mr-[10px]"
                                  />
                                  Watchlist
                                </>
                              ) : (
                                <>
                                  <img
                                    src="../../../icon/bookmark.svg"
                                    alt=""
                                    className="mr-[10px]"
                                  />
                                  Add Watchlist
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        )}
        <div className=" w-full absolute bottom-[100px] px-[100px] ">
          <Carousel
            className=""
            opts={{
              loop: true,
              align: "start",
            }}
          >
            <CarouselContent>
              {genres
                .sort((a, b) => a.genres.localeCompare(b.genres))
                .map((item, index) => {
                  return (
                    <CarouselItem
                      key={index}
                      className="lg:basis-1/6 h-[110px] relative cursor-pointer "
                      onClick={() => {
                        setNameGenres(item.genres);
                        getAllWithId(item.genres, limit);
                      }}
                    >
                      <div
                        className="rounded-xl w-[210px]  justify-center items-center flex bg-cover bg-center bg-no-repeat ml-4 "
                        style={{ backgroundImage: `url(${item.img}) ` }}
                      >
                        <div
                          className={`w-[210px] h-[99px]  rounded-xl  hover:border-2 hover:border-emerald-400 flex justify-center items-center bg-black 
  
                    ${
                      nameGenres === item.genres
                        ? "border-2 border-emerald-600 bg-emerald-600 bg-opacity-50 "
                        : "bg-opacity-75"
                    }`}
                        >
                          <div className=" text-lg font-extrabold leading-[18px] ">
                            {item.genres}
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
            </CarouselContent>
            <CarouselPrevious className="bg-[#28262d] hover:bg-black" />
            <CarouselNext className="bg-[#28262d] hover:bg-black" />
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default Genres;
