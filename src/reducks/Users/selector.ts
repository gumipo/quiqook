import { createSelector } from "reselect";
import { DefaultRootState } from "react-redux";

const userSelector = (state: DefaultRootState) => state.users;

export const getIsSignedIn = createSelector(
  [userSelector],
  (state) => state.isSignedIn
);

export const getUserId = createSelector([userSelector], (state) => state.uid);

export const getUserName = createSelector(
  [userSelector],
  (state) => state.username
);

export const getUserIcon = createSelector(
  [userSelector],
  (state) => state.icon
);
