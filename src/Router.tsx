import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
// import Auth from "./Auth";
import { Home, SiteDescription, CreateRecipe, Login } from "./Pages";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/site/description" component={SiteDescription} />
        <Route exact path="/create/recipe" component={CreateRecipe} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
