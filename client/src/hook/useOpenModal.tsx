import { useDataMovie } from "../context/dataMovieContext";

function useOpenModal() {
  const { setIsModalOpen } = useDataMovie();

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  return { openModal, closeModal };
}

export default useOpenModal;
