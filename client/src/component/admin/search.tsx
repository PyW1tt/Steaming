import React, { useEffect, useState } from "react";
import data from "../../hook/useMoviesData";
import { useNavigate } from "react-router-dom";
import { useDataMovie } from "../../context/dataMovieContext";
import { Input } from "@/components/ui/input";
import NotFoundPage from "../../pages/NotFoundPage";
import useDataUser from "../../hook/useDataUser";
import { LoadingPageAdmin } from "../../pages/LoadingPage";
function Search() {
  const { setDataMovie } = useDataMovie();
  const { getMovies, loading, isError } = useDataUser();
  const navigate = useNavigate();

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="h-full">
      {loading ? (
        <LoadingPageAdmin />
      ) : isError ? (
        <NotFoundPage />
      ) : (
        <div className="mb-10">
          <div className="flex justify-center mb-10">
            <Input
              type=""
              placeholder="Search for movies, TV shows, or categories "
              className=" text-lg text-center  rounded-full text-black border-[#28262d]"
              // value={search}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              //   setSearch(e.target.value);
              // }}
            />
          </div>
          <div className=" flex flex-wrap gap-1.5 h-full w-full">
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="relative hover:z-30  cursor-pointer transition ease-in-out delay-[50ms] hover:-translate-y-1 hover:scale-95 duration-200 flex justify-center"
                  onClick={() => {
                    setDataMovie(item);
                    navigate(`/updateMovie/${item.id}`);
                  }}
                >
                  <img
                    src={item.thumbnailUrl}
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
                      <p className="font-semibold ">4.9</p>
                      <p className="text-gray-500 mx-1 ">|</p>
                      <p className="text-gray-500">Action</p>
                      <p className="text-gray-500 mx-1 ">•</p>
                      <p className="text-gray-500">Movie</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
