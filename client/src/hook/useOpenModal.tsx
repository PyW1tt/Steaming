import { useState } from "react";
import { useDataMovie } from "../context/dataMovieContext";

function useOpenModal() {
  const { setIsModalMovieOpen, setIsModalSeriesOpen } = useDataMovie();
  const [addWatchList, setAddWatchList] = useState<boolean>(true);
  const [cancelWatchList, setCancelWatchList] = useState<boolean>(false);

  function openModalMoive() {
    setIsModalMovieOpen(true);
  }

  function closeModalMoive() {
    setIsModalMovieOpen(false);
  }

  function openModalseries() {
    setIsModalSeriesOpen(true);
  }

  function closeModalseries() {
    setIsModalSeriesOpen(false);
  }

  // function addWatchList() {}

  // function cancelWatchList() {}

  return {
    openModalMoive,
    closeModalMoive,
    addWatchList,
    setAddWatchList,
    cancelWatchList,
    setCancelWatchList,
    openModalseries,
    closeModalseries,
  };
}

export default useOpenModal;
