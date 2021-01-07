import { ActionTypes, Actions } from "./actions";
import { UserState } from "./types";
import initialState from "../Store/intialState";

export const UsersReducer = (
  userState: UserState = initialState.users,
  action: Actions
) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {
        ...userState,
        ...action.payload,
      };
    case ActionTypes.SIGN_OUT:
      return {
        ...action.payload,
      };
    default:
      return userState;
  }
};
