import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function Signup({ changeTitle }) {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState(null);
  const [signupError, setSignupError] = useState(null);

  useEffect(() => {
    changeTitle("회원가입");
  }, []);

  const validateCheck = () => {
    if (email.length < 5) {
      setEmailError("Email을 확인하세요");
      return;
    } else {
      setEmailError(null);
    }

    if (name.length < 4) {
      setNameError("이름을 확인하세요");
      return;
    } else {
      setNameError(null);
    }

    if (password.length < 4) {
      setPasswordError("비밀번호를 확인하세요");
      return;
    } else {
      setPasswordError(null);
    }

    if ((passwordConfirm.length < 4) | (password !== passwordConfirm)) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
      return;
    } else {
      setPasswordConfirmError(null);
    }
  };

  const onSignin = (email, name, password, passwordConfirm) => {
    const data = {
      email,
      name,
      password,
      passwordConfirm,
    };

    axios
      .post("/members", data)
      .then((response) => {
        setEmailError(null);
        setNameError(null);
        setPasswordError(null);
        setPasswordConfirmError(null);
        setSignupError(null);

        history.goBack();
      })
      .catch((error) => {
        error.response.data?.errorCode
          ? setSignupError(error.response.data?.message)
          : setSignupError(error.message);
        console.log("at Signup.js fetch data fail " + error);
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    validateCheck();
    onSignin(email, name, password, passwordConfirm);
  };

  return (
    <form
      onSubmit={(event) => onSubmit(event)}
      // action="signin"
      // method="post"
      // object="${memberForm}"
      className="bg-dark p-2 text-dark bg-opacity-10"
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <main className="form-signin w-200 m-auto">
        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-3 text-start col-form-label">
            Email
          </label>
          <div className={`col-sm-9`}>
            <input
              type="email"
              className={`form-control  ${emailError ? "border-danger" : ""}`}
              onChange={(event) => setEmail(event.target.value)}
              id="email"
              field="*{email}"
              placeholder="name@example.com"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="name" className="col-sm-3 text-start col-form-label">
            Name
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className={`form-control ${nameError ? "border-danger" : ""}`}
              onChange={(event) => setName(event.target.value)}
              id="name"
              field="*{name}"
              placeholder="Your Name"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="password"
            className="col-sm-3 text-start col-form-label"
          >
            Password
          </label>
          <div className="col-sm-9">
            <input
              type="password"
              className={`form-control ${passwordError ? "border-danger" : ""}`}
              onChange={(event) => setPassword(event.target.value)}
              id="password"
              field="*{password}"
              placeholder="4 or more digits"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="passwordConfirm"
            className="col-sm-3 text-start col-form-label"
          >
            Password Confirm
          </label>
          <div className="col-sm-9">
            <input
              type="password"
              className={`form-control ${
                passwordConfirmError ? "border-danger" : ""
              }`}
              onChange={(event) => setPasswordConfirm(event.target.value)}
              id="passwordConfirm"
              field="*{passwordConfirm}"
              placeholder="Confirm Your Password"
            />
          </div>
        </div>

        <div className="row">
          {emailError ? (
            <div>
              <p className="text-danger">{emailError}</p>
            </div>
          ) : null}
          {nameError ? (
            <div>
              <p className="text-danger">{nameError}</p>
            </div>
          ) : null}
          {passwordError ? (
            <div>
              <p className="text-danger">{passwordError}</p>
            </div>
          ) : null}
          {passwordConfirmError ? (
            <div>
              <p className="text-danger">{passwordConfirmError}</p>
            </div>
          ) : null}
          {signupError ? (
            <div>
              <p className="text-danger">{signupError}</p>
            </div>
          ) : null}
        </div>
        <div className="row mb-3">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </main>
    </form>
  );
}

export default Signup;
