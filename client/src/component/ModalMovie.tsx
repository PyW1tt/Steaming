import React, { useEffect, useState } from "react";
import { useDataMovie } from "../context/dataMovieContext";
import { Button } from "@/components/ui/button";
import useOpenModal from "../hook/useOpenModal";
import { useNavigate } from "react-router-dom";
import useMedia from "../hook/adminHook/useMedia";
import { LoadingMovieModal } from "../pages/LoadingPage";
function ModalMovie() {
  const { isModalMovieOpen } = useDataMovie();
  const { loading, isError, getMoviesIdModal, dataMovieId } = useMedia();
  const { closeModalMoive } = useOpenModal();
  // const {
  //   closeModal,
  //   addWatchList,
  //   setAddWatchList,
  //   cancelWatchList,
  //   setCancelWatchList,
  // } = useOpenModal();
  // const [watchList, setWatchList] = useState<boolean>(false);

  const [addWatchList, setAddWatchList] = useState<boolean>(true);
  const [cancelWatchList, setCancelWatchList] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    getMoviesIdModal();
  }, []);

  if (!isModalMovieOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 "
      style={{ background: "rgba(0, 0, 0, 0.75)" }}
    >
      {loading ? (
        <LoadingMovieModal />
      ) : isError ? (
        <p>Not Found</p>
      ) : (
        <div className="w-[1000px] bg-[#28262d] h-[830px] rounded-2xl opacity-1 overflow-y-auto relative ">
          <div className="bg-gradient-to-t from-black w-full h-[502px] absolute opacity-90 "></div>
          <div
            className="bg-black absolute z-10 top-3 right-3 w-[36px] h-[36px] rounded-full text-center hover:bg-zinc-600 cursor-pointer flex "
            onClick={() => {
              localStorage.removeItem("idMedia");
              closeModalMoive();
            }}
          >
            <img src="../../icon/close.svg" alt="" />
          </div>
          <div
            className="w-full h-[502px] bg-cover bg-center bg-no-repeat "
            style={{ backgroundImage: `url(${dataMovieId.poster_url})` }}
          >
            <div className="relative pt-[310px] px-12 ">
              <div className="text-[32px] font-bold leading-10 tracking-tight">
                {dataMovieId.title}
              </div>
              <div className="mt-10 flex ">
                <Button
                  className="w-[180px] h-[46px] px-6 py-3 text-sm font-bold bg-emerald-600 hover:bg-emerald-400 mr-5"
                  onClick={() => {
                    navigate(`/movieId/${dataMovieId.id}`);
                    closeModalMoive();
                    // console.log(dataMovieId.id);
                  }}
                >
                  <img
                    src="../../../icon/play soild.svg"
                    alt=""
                    className="mr-[10px]"
                  />
                  Play Now
                </Button>

                {/* {dataMovie.list === undefined || dataMovie.list === false ? (
                  <Button
                    className=" bg-inherit w-[180px] h-[46px] px-6 py-3 rounded-[10px] text-sm font-bold border hover:bg-zinc-500 cursor-pointer flex"
                    onClick={() => {
                      // dataMovie.list = true;
                      // console.log(dataMovie.list);

                      // dataMovie.list = watchList;
                      // setWatchList(!watchList);

                      dataMovie.list = addWatchList;
                      setAddWatchList(!addWatchList);
                    }}
                  >
                    <img
                      src="../../../icon/bookmark.svg"
                      alt=""
                      className="mr-[10px]"
                    />
                    Add Watchlist
                  </Button>
                ) : (
                  <Button
                    className=" bg-inherit w-[150px] h-[46px] px-6 py-3 rounded-[10px] text-sm font-bold border hover:bg-zinc-500 cursor-pointer flex"
                    onClick={() => {
                      // dataMovie.list = false;
                      // console.log(dataMovie.list);

                      dataMovie.list = cancelWatchList;
                      setCancelWatchList(!cancelWatchList);
                    }}
                  >
                    <img
                      src="../../../icon/check.svg"
                      alt=""
                      className="mr-[10px]"
                    />
                    Watchlist
                  </Button>
                )} */}
              </div>
            </div>
          </div>
          <div className="px-12 my-5 ">
            <div className="flex ">
              <div>Running times :&nbsp;</div>
              <div className="text-gray-400 mr-5">
                {dataMovieId.hours != null ? (
                  dataMovieId.min === "" ? (
                    <span className="text-gray-400">
                      {" "}
                      {dataMovieId.hours} h
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      {dataMovieId.hours} h {dataMovieId.min} m
                    </span>
                  )
                ) : (
                  <span className="text-gray-400"> {dataMovieId.min} m</span>
                )}
              </div>
              <div className="">
                <span className="text-white">Certificate : </span>
                <span className="text-gray-400">{dataMovieId.mpa}</span>
              </div>
            </div>

            <div className="mt-3">
              <div>Storyline</div>
              <div className="text-gray-400">{dataMovieId.description}</div>
            </div>
            <div className="mt-3">
              <span className="text-white">Producer : </span>
              <span className="text-gray-400">{dataMovieId.author}</span>
            </div>
            <div className="mt-3">
              <span className="text-white">Cast : </span>
              {dataMovieId.cast_names.map((item, index) => {
                const castLength = item.cast_name.length;
                if (index !== castLength) {
                  return (
                    <span key={index} className="text-gray-400">
                      {item.cast_name} ,{" "}
                    </span>
                  );
                } else {
                  return (
                    <span key={index} className="text-gray-400">
                      {item.cast_name}
                    </span>
                  );
                }
              })}
              <span className="text-gray-400">{dataMovieId.author}</span>
            </div>
            <div className="mt-3 ">
              <span className="text-white">Genre : </span>
              <span className="text-gray-400">{dataMovieId.genres}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalMovie;
