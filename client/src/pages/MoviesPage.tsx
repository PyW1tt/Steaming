import React, { useEffect } from "react";
import Navbar from "../component/Navbar";
import { Skeleton } from "../components/ui/skeleton";
import useDataUser from "../hook/useDataUser";
import NotFoundPage from "./NotFoundPage";
import useOpenModal from "../hook/useOpenModal";
import { useDataMovie } from "../context/dataMovieContext";
import ModalMovie from "../component/ModalMovie";
import ModalSeries from "../component/ModalSeries";

function MoviesPage() {
  const { loading, isError, dataMovies, getMovies } = useDataUser();
  const { openModalMoive } = useOpenModal();
  const { isModalMovieOpen, isModalSeriesOpen } = useDataMovie();

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="bg-[#28262d] h-full ">
      <Navbar>
        <div className="movies px-[100px] mt-9">
          {loading ? (
            <div className="flex gap-2 h-screen">
              <Skeleton className="w-[220px] h-[300px] rounded-2xl bg-gradient-to-t from-black from-15%" />
              {/* <Skeleton className="w-[220px] h-[300px] rounded-2xl bg-slate-700" /> */}
            </div>
          ) : isError ? (
            <NotFoundPage />
          ) : (
            <div className={`flex flex-wrap gap-7  `}>
              {dataMovies.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="relative hover:z-30  cursor-pointer transition ease-in-out delay-[50ms] hover:-translate-y-1 hover:scale-95 duration-200 flex justify-center"
                    onClick={() => {
                      localStorage.setItem("idMedia", JSON.stringify(item.id));
                      openModalMoive();
                    }}
                  >
                    <img
                      src={
                        item.thumbnail_url
                          ? item.thumbnail_url
                          : "https://via.placeholder.com/148x148"
                      }
                      alt=""
                      className="w-[220px] h-[300px] rounded-2xl object-fill"
                    />

                    <div className=" absolute bottom-0  w-[220px] h-[150px] p-5 bg-gradient-to-t from-black from-15%  rounded-bl-2xl rounded-br-2xl flex-col justify-end items-start gap-1 inline-flex">
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
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Navbar>
      {isModalMovieOpen && <ModalMovie />}
      {isModalSeriesOpen && <ModalSeries />}
    </div>
  );
}

export default MoviesPage;
