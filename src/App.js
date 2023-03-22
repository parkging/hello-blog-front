import { useState } from "react";

const App = () => {
  const [todo, setTodo] = useState("");
  const [toDos, setTodos] = useState([]);
  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          type={"text"}
          placeholder="Write your to do..."
          onChange={(event) => setTodo(event.target.value)}
        />
        <button
          onClick={() => setTodos((currentArray) => [todo, ...currentArray])}
        >
          add
        </button>
        <hr />
        <ul>
          {toDos.map((mapTodo, index) => (
            <li key={index}>{mapTodo}</li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default App;
