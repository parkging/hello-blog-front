import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Boarder from "./boarder/Boarder";
function Content() {
  return (
    <Switch>
      <Route path="/:postCategoryName">
        <div className="col-lg-9 col-md-12">
          <Boarder />
        </div>
      </Route>
      <Route path="/">
        <div className="col-lg-9 col-md-12">
          <Boarder />
        </div>
      </Route>
    </Switch>
  );
}
export default Content;
