import { ActionTypes, Actions } from "./actions";
import initialState from "../Store/intialState";

export const RecipesReducer = (
  recipesState = initialState.recipes,
  action: Actions
) => {
  switch (action.type) {
    case ActionTypes.FETCH_RECIPES:
      return {
        ...recipesState,
        list: [...action.payload],
      };
    default:
      return recipesState;
  }
};
