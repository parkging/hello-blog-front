import React from "react";
import { Route, Switch } from "react-router-dom";

export default (
  <Switch>
    <Route path={"/"} />
    <Route path="/post/:postId" />
    <Route path="/post/:postId/edit" />
    <Route path="/boarder/:category/:page" />
  </Switch>
);
