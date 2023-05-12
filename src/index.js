import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_ROOT;
axios.defaults.discusURL = process.env.REACT_APP_HOME_URL;
axios.defaults.cookieURL = process.env.REACT_APP_COOKIE_URL;
axios.defaults.withCredentials = true;
//페이지 확대 수준
document.body.style.zoom = 0.9;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
