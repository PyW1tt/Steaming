import "./App.css";
import React from "react";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <>
      <AuthenticatedApp />
    </>
  );
}

export default App;
