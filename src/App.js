import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Home from "./routes/Home";
import Login from "./routes/Login";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [jwt, setJwt] = useState(null);
  useEffect(() => {
    if (jwt == null) {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, jwt);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login setJwt={setJwt}></Login>
        </Route>
        <Route path="/*">
          <Home jwt={jwt} setJwt={setJwt} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
