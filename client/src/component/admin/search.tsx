import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";
import NotFoundPage from "../../pages/NotFoundPage";
import useDataUser from "../../hook/useDataUser";
import { Skeleton } from "../../components/ui/skeleton";

type MyFunctionType = (arg1: string, arg2: string) => void;

function Search() {
  const [keywords, setKeywords] = useState("");
  const { loading, isError, dataMovies, getAll } = useDataUser();
  const navigate = useNavigate();
  const limit = "100";

  const debounce = (func: MyFunctionType) => {
    let timer: ReturnType<typeof setTimeout> | null;
    return (...args: Parameters<MyFunctionType>) => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        timer = null;
        func(...args);
      }, 850);
    };
  };
  const optimizedFn = useCallback(debounce(getAll), []);

  useEffect(() => {
    getAll(keywords, limit);
  }, []);

  return (
    <div className={`${dataMovies.length <= 17 ? "h-screen" : "h-full"}`}>
      <div className="mb-10">
        <div className="flex justify-center mb-10">
          <Input
            type=""
            placeholder="Search for movies , series , producer  or genres "
            className=" text-lg text-center  rounded-full text-black border-[#28262d] mr-2"
            value={keywords}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setKeywords(e.target.value);
              optimizedFn(e.target.value, limit);
            }}
          />
        </div>
        {loading ? (
          <div className="flex gap-2 h-screen">
            <Skeleton className="w-[220px] h-[300px] rounded-2xl bg-gradient-to-t from-black from-15%" />
          </div>
        ) : isError ? (
          <NotFoundPage />
        ) : (
          <div className={`flex flex-wrap gap-1.5  `}>
            {dataMovies.map((item, index) => {
              return (
                <div
                  key={index}
                  className="relative hover:z-30  cursor-pointer transition ease-in-out delay-[50ms] hover:-translate-y-1 hover:scale-95 duration-200 flex justify-center"
                  onClick={() => {
                    if (item.type === "Movie") {
                      navigate(`/updateMovie/${item.series_id}`);
                    } else {
                      navigate(`/updateTVshows/${item.series_id}`);
                    }
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
    </div>
  );
}

export default Search;
