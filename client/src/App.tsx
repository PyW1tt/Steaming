import "./App.css";
import React from "react";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import Unauthentication from "./pages/Unauthentication";
import { useAuth } from "./context/AuthContext";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
  const auth = useAuth();
  return auth.isAuthenticated ? <AuthenticatedApp /> : <Unauthentication />;
}

export default App;
