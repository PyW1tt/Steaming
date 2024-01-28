import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Swal from "sweetalert2";

function useDataUser() {
  const [loading, setloading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
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

      const NewData = { ...userData };
      NewData.img_name = result.data.data.avatarName;
      NewData.profile_img = result.data.data.url;
      localStorage.setItem("userData", JSON.stringify(NewData));
      setUserData(NewData);
      setloading(false);
      await Swal.fire({
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
      const result = await axios.get(`/unauthen/movies`);
      setDataMovies(result.data.data);
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
      const result = await axios.get(`/unauthen/series`);
      setDataMovies(result.data.data);
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

      const result = await axios.get(
        `/unauthen/getAll?keywords=${keywords}&limit=${limit}`
      );

      setDataMovies(result.data.data);
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
  async function getRelease(limit) {
    try {
      setloading(true);
      const result = await axios.get(`/unauthen/getRelease?limit=${limit}`);
      setDataMovies(result.data.data);
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
  };
}

export default useDataUser;
