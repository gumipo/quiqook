import { RecipeDataType } from "./../Recipes/types";
import "react-redux";
import { RouterState } from "connected-react-router";

export type StoreState = {
  users: {
    isSignedIn: false;
    uid: string;
    username: string;
    icon: string;
  };
  recipes: {
    list: RecipeDataType[];
  };
  router: RouterState;
};

declare module "react-redux" {
  interface DefaultRootState extends StoreState {}
}
