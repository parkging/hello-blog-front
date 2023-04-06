import {
  BrowserRouter as Router,
  // HashRouter as Router,
  Sitch,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "./routes/Home";
import Login from "./routes/Login";

function App() {
  return (
    // <Router basename={process.env.PUBLIC_URL}>
    <Router>
      <Switch>
        <Route path="/login">
          <Redirect to="http://naver.com"></Redirect>
        </Route>
        <Route path="/*">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
