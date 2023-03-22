import Button from "./Button";
import styles from "./App.module.css";
import { useState } from "react";
function App() {
  const [counter, setCounter] = useState(0);
  const onClick = (event) => {
    console.log(event);
    setCounter((prev) => prev + 1);
  };
  return (
    <div>
      <h1> {counter} </h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
