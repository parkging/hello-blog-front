import { Link as Link, useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function Login({ setJwt, onLoginSuccess }) {
  const history = useHistory();
  const redirecturl = new URLSearchParams(useLocation().search).get(
    "redirecturl"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  // console.log(window.location.href + useLocation().search);
  console.log(`${redirecturl ? redirecturl : "/"}`);

  const validateCheck = () => {
    if (email.length < 5) {
      setEmailError("Email을 확인하세요");
      return;
    } else {
      setEmailError(null);
    }
    if (password.length < 4) {
      setPasswordError("비밀번호를 확인하세요");
      return;
    } else {
      setPasswordError(null);
    }
  };

  const onLogin = (email, password) => {
    const data = {
      email,
      password,
    };

    axios
      .post("/login", data)
      .then((response) => {
        onLoginSuccess(response);

        setEmailError(null);
        setPasswordError(null);
        setLoginError(null);

        history.push(`${redirecturl ? redirecturl : "/"}`);
      })
      .catch((error) => {
        error.response.data?.errorCode
          ? setLoginError(error.response.data?.message)
          : setLoginError(error.message);
        console.log("at Login.js fetch data fail " + error);
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    validateCheck();
    onLogin(email, password);
  };

  return (
    <form
      onSubmit={(event) => onSubmit(event)}
      className="bg-dark p-2 text-dark bg-opacity-10"
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <main
        className="form-signin w-25 m-auto align-item-center"
        style={{ height: "100wh" }}
      >
        <div action="login-form.html" method="post" object="${loginForm}">
          <h1 className="d-flex justify-content-center h3 mb-3 fw-normal">
            Please sign in
          </h1>

          <div className="form-floating">
            <input
              type="email"
              className={`form-control ${emailError ? "border-danger" : ""}`}
              // errorclassName="border-danger"
              placeholder="name@example.com"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <label htmlFor="loginEmail">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className={`form-control ${passwordError ? "border-danger" : ""}`}
              // errorclassName="border-danger"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="checkbox mb-3 d-flex justify-content-center">
            <label>
              {emailError ? (
                <div>
                  <p className="text-danger">{emailError}</p>
                </div>
              ) : null}
              {passwordError ? (
                <div>
                  <p className="text-danger">{passwordError}</p>
                </div>
              ) : null}
              {loginError ? (
                <div>
                  <p className="text-danger">{loginError}</p>
                </div>
              ) : null}
            </label>
          </div>
          <div className="row">
            <div className="col-md-6">
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Sign In
              </button>
            </div>
            <div className="col-md-6">
              <Link
                className="w-100 btn btn-lg btn-secondary"
                to={`/signup`}
                // type="button"
                // onClick={""}
              >
                Sign Up
              </Link>
            </div>
          </div>
          <div className="row mt-1">
            <a
              className="google g_id_signin"
              // className="w-25 btn btn-lg btn-secondary mx-auto"
              href={`${axios.defaults.baseURL}/oauth2/authorization/google`}
            >
              구글 로그인
            </a>
            <a
              className="google g_id_signin"
              // className="w-25 btn btn-lg btn-secondary mx-auto"
              href={`${axios.defaults.baseURL}/oauth2/authorization/naver`}
            >
              네이버 로그인
            </a>
            <a
              className="google g_id_signin"
              // className="w-25 btn btn-lg btn-secondary mx-auto"
              href={`${axios.defaults.baseURL}/oauth2/authorization/kakao`}
            >
              카카오 로그인
            </a>
          </div>
          <p className="mt-5 mb-3 text-muted d-flex justify-content-center">
            &copy; 2023
          </p>
        </div>
      </main>
    </form>
  );
}
export default Login;
