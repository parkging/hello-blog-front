import { Link as Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

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
        const accessToken = response.headers.get("authorization");
        console.log(accessToken);

        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        setEmailError(null);
        setPasswordError(null);
        setLoginError(null);

        history.push(`/`);
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
        //   padding-top: 40px,
        //   padding-bottom: 40px,
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
              <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
                // onClick={onLogin}
              >
                Sign Up
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="w-100 btn btn-lg btn-secondary"
                type="button"
                // onClick={""}
              >
                Sign In
              </button>
            </div>
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
