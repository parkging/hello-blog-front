import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_ROOT;
axios.defaults.discusRUL = process.env.REACT_APP_HOME_URL;
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
