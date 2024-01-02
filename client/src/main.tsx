import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { DataMovieProvider } from "./context/dataMovieContext";
import { OmiseProvider } from "./context/omisecontext";
import { AuthProvider } from "./context/AuthContext";
import jwtInterceptor from "./utils/jwtInterceptor";

jwtInterceptor();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <OmiseProvider>
        <AuthProvider>
          <DataMovieProvider>
            <App />
          </DataMovieProvider>
        </AuthProvider>
      </OmiseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
