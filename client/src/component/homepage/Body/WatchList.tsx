import React, { useEffect } from "react";
import ModalMovie from "../../ModalMovie";
import ModalSeries from "../../ModalSeries";
import useOpenModal from "../../../hook/useOpenModal";
import { useDataMovie } from "../../../context/dataMovieContext";
import useDataUser from "../../../hook/useDataUser";
import { LoadingWatchist } from "../../../pages/LoadingPage";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";

function WatchList(): JSX.Element {
  const { openModalMoive, openModalseries } = useOpenModal();
  const { getMyLists, dataMovies, loading, isError } = useDataUser();
  const { isModalMovieOpen, isModalSeriesOpen, refresh, setRefresh } =
    useDataMovie();

  useEffect(() => {
    getMyLists();
  }, [refresh, setRefresh]);

  return (
    <div className="w-full">
      {" "}
      {dataMovies.length >= 1 && (
        <div className="pt-10 px-[100px]">
          <p className="text-2xl font-bold leading-loose tracking-tigh ">
            Your Watchlist
          </p>

          {loading ? (
            <LoadingWatchist />
          ) : isError ? (
            <p>Not Found</p>
          ) : (
            <Carousel>
              <CarouselContent>
                {dataMovies.map((item, index) => {
                  return (
                    <CarouselItem
                      key={index}
                      className="lg:basis-1/5 pl-[35px] pr-[25px] cursor-pointer flex flex-col py-6 items-center "
                      onClick={() => {
                        localStorage.setItem(
                          "idMedia",
                          JSON.stringify(item.series_id)
                        );
                        item.type === "Movie"
                          ? openModalMoive()
                          : openModalseries();
                      }}
                    >
                      <div className="">
                        <img
                          src={
                            item.type === "Movie"
                              ? item.poster_url
                              : (item.episodes[0] as { coverUrl: string })
                                  .coverUrl
                          }
                          alt=""
                          className="w-[280px] h-[160px] rounded-2xl object-fill hover:border-4 hover:border-emerald-500 "
                        />

                        <div className="mt-3">
                          <p className="text-base font-bold leading-normal tracking-tight mb-1">
                            {item.title}
                          </p>
                          <div className=" flex items-center text-xs font-medium ">
                            <img
                              src="/icon/star.svg"
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
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="bg-[#28262d] hover:bg-black" />
              <CarouselNext className="bg-[#28262d] hover:bg-black" />
            </Carousel>
          )}
          {isModalMovieOpen && <ModalMovie />}
          {isModalSeriesOpen && <ModalSeries />}
        </div>
      )}
    </div>
  );
}

export default WatchList;
