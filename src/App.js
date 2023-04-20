import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import CategoryEdit from "./routes/CategoryEdit";
import CategoryAdd from "./routes/CategoryAdd";

function App() {
  const [jwt, setJwt] = useState(null);
  const [member, setMember] = useState(null);
  const [isRefreshTokenExist, setIsRefreshTokenExist] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["refreshExpireTime"]);

  const changeTitle = (titleText) => {
    document.querySelector("title").text = titleText;
  };

  const onLoginSuccess = (response) => {
    const accessToken = response.headers.get("authorization");

    // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
    axios.defaults.headers.common["Authorization"] = `${accessToken}`;

    setJwt(axios.defaults.headers.common.Authorization);
    setIsRefreshTokenExist(true);

    const base64Payload = accessToken.split(".")[1]; //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
    const payload = JSON.parse(atob(base64Payload));

    setMember((prev) => {
      return { ...prev, id: payload.id, email: payload.email };
    });

    // accessToken 만료 10초 전 로그인 연장 처리
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
          <Login
            setJwt={setJwt}
            onLoginSuccess={onLoginSuccess}
            changeTitle={changeTitle}
          ></Login>
        </Route>
        <Route path="/signup">
          <Signup changeTitle={changeTitle}></Signup>
        </Route>
        <Route path="/categoryedit">
          <CategoryEdit></CategoryEdit>
        </Route>
        <Route path="/categoryeadd">
          <CategoryAdd></CategoryAdd>
        </Route>
        <Route path="/*">
          <Home
            jwt={jwt}
            onLogout={onLogout}
            member={member}
            changeTitle={changeTitle}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
