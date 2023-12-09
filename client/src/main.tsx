import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { DataMovieProvider } from "./context/dataMovieContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataMovieProvider>
        <App />
      </DataMovieProvider>
    </BrowserRouter>
  </React.StrictMode>
);
