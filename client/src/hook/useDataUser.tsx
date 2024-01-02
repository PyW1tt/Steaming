import { useState } from "react";
// import { jwtDecode } from "jwt-decode";

interface UserData {
  email: string;
  package: number;
  role: string;
  created_at: Date;
  id: string;
}

function useDataUser() {
  const [data, setData] = useState<UserData | undefined>(undefined);

  function getData() {
    const userDataString = localStorage.getItem("userData");

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setData(userData);
    } else {
      console.error("userData is not available in localStorage");
    }
  }
  console.log(data);

  return { getData, data };
}

export default useDataUser;
