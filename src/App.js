import {
  BrowserRouter as Router,
  // HashRouter as Router,
  Sitch,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./routes/Home";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/movie/:id">{/* <Detail /> */}</Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
