import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./Pages/index";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
