import axios from "axios";
import { useState } from "react";
function useMedia() {
  const [loading, setloading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  async function postDatamovie(data, thumbnail, poster, video) {
    try {
      setloading(true);
      const uniqueId = Date.now();
      const result = await axios.post(
        "/admin/createMovie",
        {
          data,
          thumbnailName: uniqueId,
          thumbnailFile: thumbnail,
          posterName: uniqueId,
          posterFile: poster,
          videoName: uniqueId,
          videoFile: video,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);
      setloading(false);
    } catch (error) {
      setloading(false);
      setIsError(true);
      console.log(error);
    }
  }

  async function getMoviesById(id) {
    try {
      setloading(true);
      const result = await axios.get(`/admin/movies/${id}`);

      // setDataMovies(result);
      console.log(result.data.data);

      setloading(false);
    } catch (error) {
      setloading(false);
      setIsError(true);
      console.log(error);
    }
  }

  return { loading, isError, postDatamovie, getMoviesById };
}

export default useMedia;
