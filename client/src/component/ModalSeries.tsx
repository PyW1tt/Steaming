import React, { useEffect } from "react";
import { useDataMovie } from "../context/dataMovieContext";
import { Button } from "../components/ui/button";
import useOpenModal from "../hook/useOpenModal";
import { useNavigate } from "react-router-dom";
import useMedia from "../hook/adminHook/useMedia";
import { LoadingMovieModal } from "../pages/LoadingPage";

function ModalSeries() {
  const { isModalSeriesOpen, dataMovie } = useDataMovie();
  const { closeModalseries } = useOpenModal();
  const {
    loading,
    isError,
    dataSeriesIdModadl,
    getSeriesIdModal,
    handleAddWatchList,
    watch_list,
    setWatchList,
    handleChangeWatchList,
  } = useMedia();

  const navigate = useNavigate();

  useEffect(() => {
    getSeriesIdModal();
  }, []);

  if (!isModalSeriesOpen) return null;

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
        <div className="w-[1000px] bg-[#28262d] h-[840px] rounded-2xl opacity-1 overflow-y-auto relative ">
          <div className="bg-gradient-to-t from-black w-full h-[502px] absolute opacity-90 "></div>
          <div
            className="bg-black absolute z-10 top-3 right-3 w-[36px] h-[36px] rounded-full text-center hover:bg-zinc-600 cursor-pointer flex "
            onClick={() => {
              localStorage.removeItem("idMedia");
              closeModalseries();
            }}
          >
            <img src="../../icon/close.svg" alt="" />
          </div>
          <div
            className="w-full h-[502px] bg-cover bg-center bg-no-repeat "
            style={{
              backgroundImage: `url(${dataSeriesIdModadl.episodes[0].coverUrl})`,
            }}
          >
            <div className="relative pt-[310px] px-12 ">
              <div className="text-[32px] font-bold leading-10 tracking-tight">
                {dataSeriesIdModadl.title}
              </div>
              <div className="mt-10 flex ">
                <Button
                  className="w-[180px] h-[46px] px-6 py-3 text-sm font-bold bg-emerald-600 hover:bg-emerald-400 mr-5"
                  onClick={() => {
                    navigate(`/serieId/${dataSeriesIdModadl.episodes[0].id}`);
                    closeModalseries();
                    localStorage.removeItem("idMedia");
                  }}
                >
                  <img
                    src="../../../icon/play soild.svg"
                    alt=""
                    className="mr-[10px]"
                  />
                  Play Now
                </Button>

                {watch_list === true ? (
                  <Button
                    className=" bg-inherit w-[150px] h-[46px] px-6 py-3 rounded-[10px] text-sm font-bold border hover:bg-zinc-500 cursor-pointer flex"
                    onClick={() => {
                      const watchList = localStorage.getItem("watchListId");
                      if (watchList) {
                        const idWatchList = JSON.parse(watchList);
                        handleChangeWatchList(idWatchList, "false");
                      } else {
                        handleChangeWatchList(
                          dataSeriesIdModadl.watch_list[0].watchListId,
                          "false"
                        );
                      }
                      setWatchList(false);
                    }}
                  >
                    <img
                      src="../../../icon/check.svg"
                      alt=""
                      className="mr-[10px]"
                    />
                    Watchlist
                  </Button>
                ) : (
                  <Button
                    className=" bg-inherit w-[180px] h-[46px] px-6 py-3 rounded-[10px] text-sm font-bold border hover:bg-zinc-500 cursor-pointer flex"
                    onClick={() => {
                      if (watch_list === null) {
                        localStorage.removeItem("watchListId");
                        handleAddWatchList(dataSeriesIdModadl.id, "series");
                      } else {
                        const watchList = localStorage.getItem("watchListId");
                        if (watchList) {
                          const idWatchList = JSON.parse(watchList);
                          handleChangeWatchList(idWatchList, "true");
                        } else {
                          handleChangeWatchList(
                            dataSeriesIdModadl.watch_list[0].watchListId,
                            "true"
                          );
                        }
                      }
                      setWatchList(true);
                    }}
                  >
                    <img
                      src="../../../icon/bookmark.svg"
                      alt=""
                      className="mr-[10px]"
                    />
                    Add Watchlist
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="px-12 my-5 ">
            <div className="flex ">
              <div className="">
                <span className="text-white">Certificate : </span>
                <span className="text-gray-400">{dataSeriesIdModadl.mpa}</span>
              </div>
            </div>

            <div className="mt-3">
              <div>Storyline</div>
              <div className="text-gray-400">
                {dataSeriesIdModadl.description}
              </div>
            </div>
            <div className="mt-3">
              <span className="text-white">Producer : </span>
              <span className="text-gray-400">{dataSeriesIdModadl.author}</span>
            </div>
            <div className="mt-3">
              <span className="text-white">Cast : </span>
              {dataSeriesIdModadl.cast_names.map((item, index) => {
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
              <span className="text-gray-400">{dataSeriesIdModadl.author}</span>
            </div>
            <div className="mt-3 ">
              <span className="text-white">Genre : </span>
              <span className="text-gray-400">{dataSeriesIdModadl.genres}</span>
            </div>
          </div>
          <div className=" mt-5 ">
            <div className=" flex justify-between">
              <p className="text-2xl font-bold tracking-tight leading-loose px-12">
                Episodes
              </p>
              <p className="text-2xl font-bold tracking-tight leading-loose">
                {dataMovie.title}
              </p>
            </div>
            <div>
              {dataSeriesIdModadl.episodes
                .sort((a, b) => parseInt(a.episode) - parseInt(b.episode))
                .map((item, index) => {
                  return (
                    <div
                      key={index}
                      className=" flex w-full h-[135px] p-4 items-center hover:bg-gray-600 rounded-md hover:cursor-pointer px-10"
                      onClick={() => {
                        navigate(`/serieId/${item.id}`);
                        closeModalseries();
                      }}
                    >
                      <div className="text-2xl font-bold tracking-tight leading-loose w-[67px] text-center">
                        {index + 1}
                      </div>
                      <div className=" w-[172px] h-[97px] ">
                        <img
                          src={item.coverUrl}
                          alt=""
                          className="w-[172px] h-[98px] rounded-md "
                        />
                      </div>

                      <div className=" px-4 py-14 w-full">
                        <div className=" flex justify-between pb-2">
                          <p>{item.episodeName}</p>
                          <span>
                            {item.hours != null ? (
                              item.min === "" ? (
                                <span className="text-white">
                                  {" "}
                                  {item.hours}h
                                </span>
                              ) : (
                                <span className="text-white">
                                  {item.hours}h{item.min}m
                                </span>
                              )
                            ) : (
                              <span className="text-white"> {item.min}m</span>
                            )}
                          </span>
                        </div>
                        <div className="text-gray-400 text-sm">
                          {item.details}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalSeries;
