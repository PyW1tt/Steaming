import React, { useState, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal, { SweetAlertResult } from "sweetalert2";
import { useOmise } from "./omisecontext";
import { jwtDecode } from "jwt-decode";

interface AuthRegister {
  email: string;
  password: string;
  package: string;
  role: string;
  username: string;
}
interface AuthLogin {
  email: string;
  password: string;
}

interface AuthContextProps {
  setDataRegister: Dispatch<SetStateAction<AuthRegister>>;
  setDataLogin: Dispatch<SetStateAction<AuthLogin>>;
  dataRegister: AuthRegister;
  dataLogin: AuthLogin;
  register: (
    data: AuthRegister
  ) => Promise<SweetAlertResult<AuthRegister> | undefined>;
  login: (data: AuthLogin) => Promise<SweetAlertResult<AuthLogin> | undefined>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

function AuthProvider(props: React.PropsWithChildren<object>) {
  const [dataRegister, setDataRegister] = useState({
    email: "",
    password: "",
    package: "",
    role: "user",
    username: "",
  });
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "password",
  });
  const { omiseCardHandler } = useOmise();
  const navigate = useNavigate();

  async function register(data: AuthRegister) {
    Swal.fire({
      title: "Please Wait..",
      html: "",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      await axios.post("/auth/register", data);
      omiseCardHandler();
    } catch (error) {
      console.log(error);
      Swal.close();
      if (error.response.data.message === "Registration failed") {
        return await Swal.fire("Registration failed", "", "error");
      }
      if (error.response.data.message === "Email is already registered") {
        return await Swal.fire("Email is already registered", "", "error");
      }
      if (error) {
        Swal.fire(error, "", "error");
      }
    }
  }
  async function login(data: AuthLogin) {
    Swal.fire({
      title: "Please Wait..",
      html: "",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const result = await axios.post("/auth/login", data);
      const token = result.data.token;
      localStorage.setItem("token", token);

      // const userDataFromToken = jwtDecode(token);
      // localStorage.setItem("user", userDataFromToken);
      // console.log(userDataFromToken);

      // console.log(result.data.data);
      localStorage.setItem("userData", JSON.stringify(result.data.data));

      Swal.close();
      await Swal.fire("Login Successful", "", "success");
      navigate("/");
    } catch (error) {
      if (error.response.data.message === "Invalid email or password") {
        return await Swal.fire("Invalid email or password", "", "error");
      }
      if (error.response.data.message === "Email not confirmed") {
        return await Swal.fire("Email not confirmed", "", "error");
      }
      if (error) {
        Swal.fire(error, "", "error");
      }
    }
  }
  async function logout() {
    try {
      // await axios.get("/logout");
      // localStorage.removeItem("token");
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  const isAuthenticated = Boolean(localStorage.getItem("token"));
  return (
    <AuthContext.Provider
      value={{
        register,
        setDataRegister,
        dataRegister,
        login,
        dataLogin,
        setDataLogin,
        isAuthenticated,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useOmise must be used within an OmiseProvider");
  }
  return context;
};
export { AuthProvider, useAuth };
