import axios from "axios";
// import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Swal from "sweetalert2";

// interface dataMovies {
//   title: "",
//   author: "",
//   date: "",
//   hours: "",
//   min: "",
//   rating: "",
//   description: "",
//   type: "",
//   genres: "",
//   MPA: "",
// }

function useDataUser() {
  const [loading, setloading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  // const [watch_list, setWatchList] = useState([
  //   { watchListId: "", watchListAdd: "" },
  // ]);
  const [dataMovies, setDataMovies] = useState([
    {
      // id: "",
      id: "",
      series_id: "",
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
      cast_names: [{}],
      episodes: [
        {
          id: "",
          episodes_ep: "",
          hours: "",
          min: "",
          coverUrl: "",
          videoUrl: "",
        },
      ],
      watch_list: [{ watchListId: "", watchListAdd: true, id: "" }],
    },
  ]);
  const { userData, setUserData } = useAuth();

  function getData() {
    const userDataString = localStorage.getItem("userData");

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserData(userData);
    } else {
      console.error("userData is not available in localStorage");
    }
  }

  async function updateProfile(file, userId) {
    try {
      setloading(true);
      const userDataString = localStorage.getItem("userData");

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUserData(userData);
      } else {
        console.error("userData is not available in localStorage");
      }
      const result = await axios.put(
        `/user/${userId}`,
        {
          imgName: userData?.img_name,
          avatars: file,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // console.log(result.data.data);
      const NewData = { ...userData };
      NewData.img_name = result.data.data.avatarName;
      NewData.profile_img = result.data.data.url;
      localStorage.setItem("userData", JSON.stringify(NewData));
      setUserData(NewData);
      setloading(false);
      await Swal.fire({
        // position: "top-end",
        icon: "success",
        title: "Update Success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setloading(false);
      setIsError(true);
      console.log(error.message);
      await Swal.fire({
        // position: "top-end",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  async function getMovies() {
    try {
      setloading(true);
      const result = await axios.get(`/user/movies`);

      setDataMovies(result.data.data);
      // console.log(result.data.data);

      setloading(false);
    } catch (error) {
      setloading(false);
      setIsError(true);
      console.log(error);
    }
  }
  async function getSeries() {
    try {
      setloading(true);
      const result = await axios.get(`/user/series`);

      setDataMovies(result.data.data);
      // console.log(result.data.data);

      setloading(false);
    } catch (error) {
      setloading(false);
      setIsError(true);
      console.log(error);
    }
  }
  async function getMyLists() {
    try {
      setloading(true);
      const userDataString = localStorage.getItem("userData");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const result = await axios.get(`/user/getMyLists/${userData.id}`);
        setDataMovies(result.data.data);
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
  async function getAll(keywords: string, limit: string) {
    try {
      setloading(true);

      // const userDataString = localStorage.getItem("userData");

      // if (userDataString) {
      //   const userData = JSON.parse(userDataString);
      const result = await axios.get(
        `/user/getAll?keywords=${keywords}&limit=${limit}`
      );

      setDataMovies(result.data.data);
      // console.log(result.data.data);
      // } else {
      //   console.error("userData is not available in localStorage");
      // }

      // setWatchList(result.data.data.watch_list);
      // console.log(result.data.data);
      setloading(false);
    } catch (error) {
      setloading(false);
      setIsError(true);
      console.log(error);
    }
  }
  async function getAllWithId(keywords: string, limit: string) {
    try {
      setloading(true);

      const userDataString = localStorage.getItem("userData");

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const result = await axios.get(
          `/user/${userData.id}/getAll?keywords=${keywords}&limit=${limit}`
        );

        setDataMovies(result.data.data);
        console.log(result.data.data);
      } else {
        console.error("userData is not available in localStorage");
      }

      // setWatchList(result.data.data.watch_list);
      // console.log(result.data.data);
      setloading(false);
    } catch (error) {
      setloading(false);
      setIsError(true);
      console.log(error);
    }
  }

  async function getRelease(limit) {
    try {
      // console.log(keywords);
      setloading(true);
      const result = await axios.get(`/user/getRelease?limit=${limit}`);
      // const result = await axios.get(`/user/getAll`);
      setDataMovies(result.data.data);
      // console.log(result.data.data[0].title);
      // console.log(result.data.data.title);
      // console.log(result.data.data.release_date);
      // console.log("-------");
      setloading(false);
    } catch (error) {
      setloading(false);
      setIsError(true);
      console.log(error);
    }
  }

  return {
    getData,
    updateProfile,
    loading,
    isError,
    getMovies,
    dataMovies,
    getAll,
    getRelease,
    getSeries,
    getMyLists,
    getAllWithId,
    setDataMovies,
    // watch_list,
    // setWatchList,
  };
}

export default useDataUser;
