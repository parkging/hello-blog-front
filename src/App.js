import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

function App() {
  const [jwt, setJwt] = useState(null);
  const [member, setMember] = useState(null);
  const [isRefreshTokenExist, setIsRefreshTokenExist] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["refreshExpireTime"]);

  const onLoginSuccess = (response) => {
    const accessToken = response.headers.get("authorization");

    // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    setJwt(axios.defaults.headers.common.Authorization);
    setIsRefreshTokenExist(true);

    const base64Payload = accessToken.split(".")[1]; //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
    const payload = JSON.parse(atob(base64Payload));

    setMember((prev) => {
      return { ...prev, id: payload.id, email: payload.email };
    });

    // accessToken 만료 30초 전 로그인 연장 처리
    setTimeout(onSilentRefresh, payload.expire_millisecond - 10000);
  };

  const onLogout = () => {
    removeCookie("refreshExpireTime");
    setJwt(null);
  };

  const onSilentRefresh = () => {
    if (!!cookies.refreshExpireTime) {
      axios
        .post("/silent-refresh")
        .then(onLoginSuccess)
        .catch((error) => {
          const errorCode = error.response.data?.errorCode
            ? error.response.data?.errorCode
            : "";

          if (!!errorCode) {
            setJwt(null);
            setIsRefreshTokenExist(false);
            alert(error.response.data.message);
          }

          console.log("at Login.js jwt refresh fail " + error);
        });
    }
  };

  useEffect(() => {
    if (jwt == null) {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [jwt]);

  useEffect(() => {
    onSilentRefresh();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login setJwt={setJwt} onLoginSuccess={onLoginSuccess}></Login>
        </Route>
        <Route path="/signup">
          <Signup></Signup>
        </Route>
        <Route path="/*">
          <Home jwt={jwt} onLogout={onLogout} member={member} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
