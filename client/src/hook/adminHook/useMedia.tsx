import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDataMovie } from "../../context/dataMovieContext";

function useMedia() {
  const param = useParams();
  const navigate = useNavigate();
  const { refresh, setRefresh } = useDataMovie();
  const [loading, setloading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [watch_list, setWatchList] = useState<null | boolean>(null);
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
    watch_list: { id: "", add: "" },
  });
  const [dataSeriesIdModadl, setDataSeriesIdMedia] = useState({
    id: "",
    title: "",
    author: "",
    release_date: "",
    rating: "",
    description: "",
    type: "",
    genres: "",
    mpa: "",
    thumbnail_name: "",
    thumbnail_url: "",
    created_at: new Date(),
    updated_at: new Date(),
    watch_list: { id: "", add: "" },
    cast_names: [{ id: "", movie_id: "", cast_name: "" }],
    episodes: [
      {
        id: "",
        episode: "",
        episodeName: "",
        hours: "",
        min: "",
        series_id: "",
        details: "",
        coverName: "",
        coverUrl: "",
        videoName: "",
        videoUrl: "",
      },
    ],
  });
  const [dataSeriesId, setDataSeriesId] = useState({
    id: "",
    title: "",
    author: "",
    release_date: "",
    rating: "",
    description: "",
    type: "",
    genres: "",
    mpa: "",
    thumbnail_name: "",
    thumbnail_url: "",
    created_at: new Date(),
    updated_at: new Date(),
    cast_names: [{ id: "", series_id: "", cast_name: "" }],
  });
  const [dataEpisodeId, setDataEpisodeId] = useState([
    {
      id: "",
      episode: "",
      episodeName: "",
      hours: "",
      min: "",
      series_id: "",
      details: "",
      coverName: "",
      coverUrl: "",
      videoName: "",
      videoUrl: "",
      NewCover: null as File | null,
      NewVideo: null as File | null,
    },
  ]);
  const [episodeId, setEpisodeId] = useState({
    id: "",
    title: "",
    episodes_ep: "",
    hours: "",
    min: "",
    data_series_id: "",
    details: "",
    poster_name: "",
    poster_url: "",
    video_name: "",
    video_url: "",
    created_at: new Date(),
    updated_at: new Date(),
  });
  async function postDatamovie(data, thumbnail, poster, video) {
    try {
      setloading(true);

      await axios.post(
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
      setloading(false);
      await Swal.fire({
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

  async function createDataSeries(thumbnail, movieData, cast) {
    try {
      setloading(true);
      const result = await axios.post(
        "/admin/createSeries",
        {
          thumbnailName: "",
          thumbnailFile: thumbnail,
          movieData,
          cast,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      localStorage.setItem("idSeries", result.data.data);
    } catch (error) {
      setloading(false);
      setIsError(true);
      await Swal.fire({
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  }

  async function createDataEpisodes(data) {
    const idSeries = localStorage.getItem("idSeries");
    try {
      setloading(true);
      await axios.post(
        "/admin/createEpisodes",
        {
          data_series_id: idSeries,
          episode: data.episode,
          episodeName: data.episodeName,
          details: data.details,
          hours: data.hours,
          min: data.min,
          coverName: "",
          videoName: "",
          cover: data.cover,
          video: data.video,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      console.log(error);
      setloading(false);
      setIsError(true);
      await Swal.fire({
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  async function updateDataSeries(thumbnail, id, data) {
    try {
      setloading(true);
      await axios.put(
        `/admin/updateSeries/${id}`,
        {
          data,
          thumbnailFile: thumbnail,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      setloading(false);
      setIsError(true);
      await Swal.fire({
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  }

  async function updateDataEpisodes(data) {
    try {
      setloading(true);
      await axios.put(
        `/admin/updateEpisodes/${param.id}`,
        {
          id: data.id,
          data_series_id: data.series_id,
          episode: data.episode,
          episodeName: data.episodeName,
          details: data.details,
          hours: data.hours,
          min: data.min,
          coverName: data.coverName,
          coverUrl: data.coverUrl,
          videoName: data.videoName,
          videoUrl: data.videoUrl,
          cover: data.cover,
          video: data.video,
          newCover: data.NewCover,
          newVideo: data.NewVideo,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      setloading(false);
      setIsError(true);
      await Swal.fire({
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  }
  async function updateDatamovieId(id, data, thumbnail, poster, video) {
    try {
      setloading(true);
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
      setloading(false);
      await Swal.fire({
        icon: "success",
        title: "Update Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setloading(false);
      setIsError(true);
      await Swal.fire({
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  }
  async function getMoviesIdModal() {
    const userDataString = localStorage.getItem("userData");
    const idMedia = localStorage.getItem("idMedia");

    try {
      setloading(true);

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const result = await axios.get(
          `/admin/${userData.id}/movies/${idMedia}`
        );

        setDataMovieId(result.data.data);
        setWatchList(result.data.data.watch_list[0].watchListAdd);
      }

      setTimeout(() => {
        setloading(false);
      }, 1000);
    } catch (error) {
      setloading(false);
      setIsError(true);
      console.log(error);
    }
  }
  async function getSeriesIdModal() {
    const userDataString = localStorage.getItem("userData");
    const idMedia = localStorage.getItem("idMedia");
    try {
      setloading(true);
      if (userDataString) {
        const userData = JSON.parse(userDataString);

        const result = await axios.get(
          `/admin/${userData.id}/series/${idMedia}`
        );

        setWatchList(result.data.data.watch_list[0].watchListAdd);
        setDataSeriesIdMedia(result.data.data);
      }
      setTimeout(() => {
        setloading(false);
      }, 1000);
    } catch (error) {
      setloading(false);
      setIsError(true);
      console.log(error);
    }
  }
  async function getMoviesById(id) {
    try {
      setloading(true);
      const userDataString = localStorage.getItem("userData");

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const result = await axios.get(`/admin/${userData.id}/movies/${id}`);

        setDataMovieId(result.data.data);
        // console.log(result.data.data);
      } else {
        console.error("userData is not available in localStorage");
      }

      setloading(false);
    } catch (error) {
      setloading(false);
      setIsError(true);
      console.log(error);
    }
  }
  async function getEpisodeById(id) {
    try {
      setloading(true);
      const result = await axios.get(`/user/episode/${id}`);
      setEpisodeId(result.data.data);
      setloading(false);
    } catch (error) {
      setloading(false);
      setIsError(true);
      console.log(error);
    }
  }
  async function getSeriesById(id) {
    try {
      setloading(true);
      const userDataString = localStorage.getItem("userData");

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const result = await axios.get(`/admin/${userData.id}/series/${id}`);
        const data = {
          id: result.data.data.id,
          title: result.data.data.title,
          author: result.data.data.author,
          release_date: result.data.data.release_date,
          rating: result.data.data.rating,
          description: result.data.data.description,
          type: result.data.data.type,
          genres: result.data.data.genres,
          mpa: result.data.data.mpa,
          thumbnail_name: result.data.data.thumbnail_name,
          thumbnail_url: result.data.data.thumbnail_url,
          created_at: result.data.data.created_at,
          updated_at: result.data.data.updated_at,
          cast_names: result.data.data.cast_names,
        };
        const episode = result.data.data.episodes;
        setDataEpisodeId(episode);
        setDataSeriesId(data);
      }

      setloading(false);
    } catch (error) {
      setloading(false);
      setIsError(true);
      console.log(error);
    }
  }

  async function handleDeleteMovie(id: string, poster, thumbnail, video) {
    try {
      setloading(true);
      await axios.delete(`/admin/movie/${id}`, {
        data: {
          poster,
          thumbnail,
          video,
        },
      });
      setloading(false);
      await Swal.fire({
        icon: "success",
        title: "Delete Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/adminSearch");
    } catch (error) {
      setloading(false);
      setIsError(true);
      await Swal.fire({
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  }

  async function handleDeleteEpisodes(id: string, poster, video) {
    try {
      setloading(true);
      await axios.delete(`/admin/episode/${id}`, {
        data: {
          poster,
          video,
        },
      });
      setloading(false);
      await Swal.fire({
        icon: "success",
        title: "Delete Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setloading(false);
      setIsError(true);
      await Swal.fire({
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  }

  async function handleDeleteSeries(id: string, thumbnail: string) {
    try {
      setloading(true);
      await axios.delete(`/admin/series/${id}`, {
        data: {
          thumbnail,
        },
      });
      setloading(false);
    } catch (error) {
      setloading(false);
      setIsError(true);
      await Swal.fire({
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  }
  interface data {
    coverName: string;
    videoName: string;
  }
  async function handleDeleteMedia(data: data) {
    try {
      setloading(true);
      await axios.delete(`/admin/media/${param.id}`, {
        data: {
          cover: data.coverName,
          video: data.videoName,
        },
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

  async function handleAddWatchList(id: string, type: string) {
    try {
      const userDataString = localStorage.getItem("userData");

      if (userDataString) {
        const userData = JSON.parse(userDataString);

        const result = await axios.post(
          `/user/${userData.id}/watchList/${id}`,
          { type }
        );
        localStorage.setItem("watchListId", JSON.stringify(result.data.data));
      }

      setRefresh(!refresh);
    } catch (error) {
      setloading(false);
      setIsError(true);
      console.log(error);
    }
  }

  async function handleChangeWatchList(id: string, bool: string) {
    try {
      await axios.put(`/user/watchList/${id}`, {
        bool,
      });
      setRefresh(!refresh);
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
    createDataEpisodes,
    setloading,
    getSeriesById,
    dataSeriesId,
    setDataSeriesId,
    dataEpisodeId,
    setDataEpisodeId,
    updateDataSeries,
    updateDataEpisodes,
    handleDeleteMovie,
    handleDeleteEpisodes,
    handleDeleteSeries,
    handleDeleteMedia,
    getMoviesIdModal,
    getSeriesIdModal,
    dataSeriesIdModadl,
    getEpisodeById,
    episodeId,
    setEpisodeId,
    handleAddWatchList,
    watch_list,
    setWatchList,
    handleChangeWatchList,
  };
}

export default useMedia;
