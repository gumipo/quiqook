import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./Auth";
import {
  Home,
  SiteDescription,
  CreateRecipe,
  Login,
  SignUP,
  ResetPassword,
  UserRecipe,
  AllRecipes,
} from "./Pages";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUP} />
      <Route exact path="/reset/password" component={ResetPassword} />
      <Route exact path="/site/description" component={SiteDescription} />
      <Route exact path="/all/recipe" component={AllRecipes} />
      <Auth>
        <Route exact path="/my/recipe" component={UserRecipe} />
        <Route exact path="/create/recipe" component={CreateRecipe} />
      </Auth>
    </Switch>
  );
};

export default Router;
