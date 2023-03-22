import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

const Hello = () => {
  const byFnc = () => console.log("destroyed");
  const hiFnc = () => {
    console.log("created");
    return byFnc;
  };
  useEffect(hiFnc, []);
  return <h1>Hello</h1>;
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [showing, setShowing] = useState(false);
  const onClick = () => setCounter((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);

  console.log("all time render");

  useEffect(() => console.log("i run only once"), []);
  useEffect(() => {
    if (keyword !== "" && keyword.length > 5)
      console.log("search", { keyword });
  }, [keyword]);
  const onClickShowBtn = () => setShowing((prevValue) => !prevValue);
  return (
    <div>
      {showing ? (
        <div>
          <Hello />
          <input
            value={keyword}
            type="text"
            placeholder="Search here..."
            onChange={onChange}
          />
          <h1> {counter} </h1>
          <button onClick={onClick}>click me</button>
        </div>
      ) : null}
      <button onClick={onClickShowBtn}> {showing ? "Hide" : "Show"} </button>
    </div>
  );
};

export default App;
