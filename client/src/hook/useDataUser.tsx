import axios from "axios";
// import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
// import { jwtDecode } from "jwt-decode";

// interface UserData {
//   email: string;
//   package: number;
//   role: string;
//   created_at: Date;
//   id: string;
//   img_name: string;
// }

function useDataUser() {
  const [loading, setloading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  // const [dataMovies, setDataMovies] = useState(null);
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
    } catch (error) {
      setloading(false);
      setIsError(true);
      console.log(error.message);
    }
  }

  async function getMovies() {
    try {
      setloading(true);
      const result = await axios.get(`/user/movies`);

      // setDataMovies(result);
      console.log(result.data.data);

      setloading(false);
    } catch (error) {
      setloading(false);
      setIsError(true);
      console.log(error);
    }
  }

  return { getData, updateProfile, loading, isError, getMovies };
}

export default useDataUser;
