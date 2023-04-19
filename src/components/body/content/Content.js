import { Redirect, Route, Switch } from "react-router-dom";
import Boarder from "./boarder/Boarder";
import PostViewer from "./postviewer/PostViewer";
import PostEditor from "./posteditor/PostEditor";
function Content({ jwt, member }) {
  return (
    <Switch>
      <Route path="/post/:postId/edit">
        <div className="col-lg-9 col-md-12">
          {jwt ? (
            <PostEditor member={member} />
          ) : (
            <Redirect to={`/login?redirecturl=${window.location.pathname}`} />
          )}
        </div>
      </Route>
      <Route path="/post/add">
        <div className="col-lg-9 col-md-12">
          {jwt ? (
            <PostEditor member={member} />
          ) : (
            <Redirect to={`/login?redirecturl=${window.location.pathname}`} />
          )}
        </div>
      </Route>
      <Route path="/post/:postId">
        <div className="col-lg-9 col-md-12">
          <PostViewer jwt={jwt} />
        </div>
      </Route>
      <Route path="/boarder/:category/:page">
        <div className="col-lg-9 col-md-12">
          <Boarder jwt={jwt} />
        </div>
      </Route>
      {/* <Route path="/boarder/전체/1">
        <div className="col-lg-9 col-md-12">
          <Boarder />
        </div>
      </Route> */}
      <Route path="/">
        <Redirect to="/boarder/전체/1"></Redirect>
      </Route>
    </Switch>
  );
}
export default Content;
