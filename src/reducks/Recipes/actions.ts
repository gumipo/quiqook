import { RecipeDataType } from "./types";

export const ActionTypes = {
  FETCH_RECIPES: "FETCH_RECIPES",
} as const;

export const fetchRecipesAction = (recipes: RecipeDataType[]) => {
  return {
    type: "FETCH_RECIPES",
    payload: recipes,
  };
};

type FetchRecipesAction = ReturnType<typeof fetchRecipesAction>;

export type Actions = FetchRecipesAction;
