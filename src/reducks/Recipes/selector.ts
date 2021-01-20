import { createSelector } from "reselect";
import { DefaultRootState } from "react-redux";

const RecipeSelector = (state: DefaultRootState) => state.recipes;

export const getRecipesList = createSelector(
  [RecipeSelector],
  (state) => state.list
);
