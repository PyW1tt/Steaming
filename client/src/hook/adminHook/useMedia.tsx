import axios from "axios";
import { log } from "console";
import { useState } from "react";
import Swal from "sweetalert2";

function useMedia() {
  const [loading, setloading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [dataMovieId, setDataMovieId] = useState({
    id: "",
    title: "",
    author: "",
    release_date: "",
    hours: "",
    min: "",
    rating: "",
    description: "",
    type: "",
    genres: "",
    mpa: "",
    poster_name: "",
    poster_url: "",
    thumbnail_name: "",
    thumbnail_url: "",
    video_name: "",
    video_url: "",
    created_at: new Date(),
    updated_at: new Date(),
    cast_names: [{ id: "", movie_id: "", cast_name: "" }],
  });
  const [dataSeries, setDataSeries] = useState([{}]);

  async function postDatamovie(data, thumbnail, poster, video) {
    try {
      setloading(true);

      const result = await axios.post(
        "/admin/createMovie",
        {
          data,
          thumbnailName: null,
          thumbnailFile: thumbnail,
          posterName: null,
          posterFile: poster,
          videoName: null,
          videoFile: video,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(result);
      setloading(false);
      await Swal.fire({
        // position: "top-end",
        icon: "success",
        title: "Create Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setloading(false);
      setIsError(true);
      await Swal.fire({
        // position: "top-end",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  }
  // async function createDataSeries(movieData, thumbnail, episodes) {
  async function createDataSeries(cover, video) {
    // console.log(data.title);
    // console.log(episodes);
    // console.log(movieData);
    // console.log(thumbnail);
    // console.log(episodes);
    // console.log(episodes);

    try {
      // setloading(true);

      // const formData = new FormData();
      // for (let i = 0; i < episodes.length; i++) {
      //   const episode = episodes[i];
      //   // console.log(episode);

      //   formData.append(`episodes[${i}][cover]`, episode.cover);
      //   formData.append(`episodes[${i}][video]`, episode.video);
      //   formData.append(`episodes[${i}][episodesName]`, episode.episodeName);
      //   formData.append(`episodes[${i}][episodes]`, episode.episode);
      //   formData.append(`episodes[${i}][hours]`, episode.hours);
      //   formData.append(`episodes[${i}][min]`, episode.min);
      //   formData.append(`episodes[${i}][details]`, episode.details);
      // }
      // console.log(formData);

      // const formData = new FormData();
      // episodes.forEach((episode, index) => {
      //   formData.append(`episodes[${index}][cover]`, episode.cover);
      //   formData.append(`episodes[${index}][video]`, episode.video);
      //   formData.append(`episodes[${index}][episodeName]`, episode.episodeName);
      //   formData.append(`episodes[${index}][episode]`, episode.episode);
      //   formData.append(`episodes[${index}][hours]`, episode.hours);
      //   formData.append(`episodes[${index}][min]`, episode.min);
      //   formData.append(`episodes[${index}][details]`, episode.details);
      // });

      // ตรวจสอบข้อมูลที่จะส่ง
      // console.log(formData);
      console.log(cover);
      console.log(video);

      const result = await axios.post(
        "/admin/createSeries",
        {
          // movieData,
          // formData,
          cover: cover,
          video: video,
          // thumbnailName: "",
          // thumbnailFile: thumbnail,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(result);
      // setloading(false);
      // await Swal.fire({
      //   // position: "top-end",
      //   icon: "success",
      //   title: "Create Successful",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
    } catch (error) {
      console.log(error);
      // setloading(false);
      // setIsError(true);
      // await Swal.fire({
      //   // position: "top-end",
      //   icon: "error",
      //   title: error.message,
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
    }
  }
  async function updateDatamovieId(id, data, thumbnail, poster, video) {
    // console.log(data.thumbnail_name);
    try {
      setloading(true);
      // console.log(thumbnail);
      // console.log(poster);
      // console.log(video);

      await axios.put(
        `/admin/updateMovie/${id}`,
        {
          data,
          thumbnailFile: thumbnail,
          posterFile: poster,
          videoFile: video,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // console.log(result);
      setloading(false);
      await Swal.fire({
        // position: "top-end",
        icon: "success",
        title: "Update Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setloading(false);
      setIsError(true);
      await Swal.fire({
        // position: "top-end",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  }

  async function getMoviesById(id) {
    try {
      setloading(true);
      const result = await axios.get(`/admin/movies/${id}`);

      setDataMovieId(result.data.data);
      console.log(result.data.data);

      setloading(false);
    } catch (error) {
      setloading(false);
      setIsError(true);
      console.log(error);
    }
  }

  return {
    loading,
    isError,
    postDatamovie,
    getMoviesById,
    dataMovieId,
    setDataMovieId,
    updateDatamovieId,
    createDataSeries,
  };
}

export default useMedia;
