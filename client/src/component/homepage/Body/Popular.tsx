import React, { useEffect } from "react";
import ModalMovie from "../../ModalMovie";
import useOpenModal from "../../../hook/useOpenModal";
import ModalSeries from "../../ModalSeries";
import useDataUser from "../../../hook/useDataUser";
import { LoadingPopular } from "../../../pages/LoadingPage";
import { useNavigate } from "react-router-dom";
import { useDataMovie } from "../../../context/dataMovieContext";
import { useAuth } from "../../../context/AuthContext";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";

function Popular(): JSX.Element {
  const auth = useAuth();
  const { openModalMoive, openModalseries } = useOpenModal();
  const { getAll, getAllWithId, dataMovies, loading, isError } = useDataUser();
  const navigate = useNavigate();
  const { isModalMovieOpen, isModalSeriesOpen } = useDataMovie();
  const limit = "10";

  useEffect(() => {
    if (auth.isAuthenticated) {
      getAllWithId("", limit);
    } else {
      getAll("", limit);
    }
  }, []);
  return (
    <div className="pt-10 w-full px-[100px]">
      <p className="text-2xl font-bold tracking-tight leading-loose">
        Popular of the week
      </p>

      {loading ? (
        <LoadingPopular />
      ) : isError ? (
        <p>Not Found</p>
      ) : (
        <Carousel className=" w-full">
          <CarouselContent className="">
            {dataMovies.map((item, index) => {
              return (
                <CarouselItem
                  key={index}
                  className=" lg:basis-1/5 relative pl-0 flex justify-center cursor-pointer py-6 it transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200 "
                  onClick={() => {
                    if (auth.isAuthenticated) {
                      localStorage.setItem(
                        "idMedia",
                        JSON.stringify(item.series_id)
                      );
                      item.type === "Movie"
                        ? openModalMoive()
                        : openModalseries();
                    } else {
                      navigate("*");
                    }
                  }}
                >
                  <div className="w-[38px] flex items-center justify-center">
                    <p className="text-5xl font-semibold tracking-tight leading-[64px] ">
                      {index + 1}
                    </p>
                  </div>
                  <div className="mx-3">
                    <img
                      src={item.thumbnail_url}
                      alt=""
                      className="w-[107px] h-32 rounded-2xl object-fill"
                    />
                  </div>

                  <div className=" flex flex-col justify-between">
                    <p className="text-gray-300 text-xs font-medium  tracking-tight">
                      PG-13
                    </p>
                    <p className="text-base font-bold leading-normal tracking-tight">
                      {item.title.length > 20
                        ? item.title.slice(0, 15) + "..."
                        : item.title}
                    </p>
                    <div>
                      <span className="flex  text-xs font-medium">
                        <img
                          src="../../../../icon/film.svg"
                          alt=""
                          className="mr-1"
                        />
                        <p className="text-gray-500">{item.genres}</p>
                      </span>
                    </div>
                    <div className=" flex items-center text-gray-500">
                      <img src="icon/star.svg" alt="" className="mr-1 " />
                      <p className="text-xs font-semibold leading-tight tracking-tight">
                        {item.rating}
                      </p>
                      <p className="text-gray-500 mx-1">|</p>
                      <p className="text-gray-500 text-xs font-medium">
                        {item.type}
                      </p>
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
  );
}

export default Popular;
