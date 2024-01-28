import React, { useEffect } from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import useDataUser from "../../hook/useDataUser";
import { LoadingHeader } from "../../pages/LoadingPage";
import useMedia from "../../hook/adminHook/useMedia";
import { useAuth } from "../../context/AuthContext";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

function Header(): React.JSX.Element {
  const auth = useAuth();
  const navigate = useNavigate();
  const { getAll, getAllWithId, dataMovies, loading, isError, setDataMovies } =
    useDataUser();
  const { handleAddWatchList, handleChangeWatchList } = useMedia();
  const limit = "10";

  useEffect(() => {
    if (auth.isAuthenticated) {
      getAllWithId("", limit);
    } else {
      getAll("", limit);
    }
  }, []);

  return (
    <>
      {loading ? (
        <LoadingHeader />
      ) : isError ? (
        <p>Not Found</p>
      ) : (
        <Carousel
          className="mySwiper absolute top-0 w-full "
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
                <CarouselItem key={index} className="h-[648px]  relative">
                  <div className="bg-gradient-to-t from-[#28262d] via-zinc-850 to-black w-full h-full absolute opacity-85 z-10"></div>
                  <div className=" absolute w-full">
                    <video
                      className=" object-cover h-full w-full "
                      poster={
                        item.type === "Movie"
                          ? item.poster_url
                          : item.episodes[0].coverUrl
                      }
                      src={
                        item.type === "Movie"
                          ? item.video_url
                          : item.episodes[0].videoUrl
                      }
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
                            <span className="text-gray-400"> {item.min}m</span>
                          )
                        ) : item.episodes[0].hours != null ? (
                          item.episodes[0].min === "" ? (
                            <span className="text-gray-400">
                              {" "}
                              {item.episodes[0].hours}h
                            </span>
                          ) : (
                            <span className="text-gray-400">
                              {item.episodes[0].hours}h{item.episodes[0].min}m
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
                      <span className="text-gray-400">2022</span>
                      <p className="text-gray-500 mx-1">•</p>
                      <span className="text-gray-400">Fantasy</span>
                    </div>
                    <p className="mt-2">{item.description}</p>
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
                            const sortedEpisodes = [...item.episodes].sort(
                              (a, b) => {
                                return (
                                  parseInt(a.episodes_ep) -
                                  parseInt(b.episodes_ep)
                                );
                              }
                            );
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
                                handleChangeWatchList(idWatchList, "false");
                              } else {
                                handleChangeWatchList(
                                  item.watch_list[0].watchListId,
                                  "false"
                                );
                              }

                              const newDataMovies = [...dataMovies];
                              newDataMovies[index].watch_list[0].watchListAdd =
                                !newDataMovies[index].watch_list[0]
                                  .watchListAdd;
                              setDataMovies(newDataMovies);
                            } else {
                              if (item.watch_list[0].watchListAdd === null) {
                                localStorage.removeItem("watchListId");
                                handleAddWatchList(
                                  item.series_id,
                                  item.type === "Movie" ? "movie" : "series"
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
                                  const idWatchList = JSON.parse(watchList);
                                  handleChangeWatchList(idWatchList, "true");
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
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      )}
      <div className="h-[548px]"></div>
    </>
  );
}

export default Header;
