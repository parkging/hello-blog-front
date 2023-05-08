import { Route, Switch } from "react-router-dom";

function SitemapRoutes() {
  return (
    <Switch>
      <Route path={"/"} />
      <Route path="/post/:postId" />
      <Route path="/post/:postId/edit" />
      <Route path="/boarder/:category/:page" />
    </Switch>
  );
}

export default SitemapRoutes;
