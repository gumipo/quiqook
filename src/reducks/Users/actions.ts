import { UserState } from "./types";

export const ActionTypes = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
} as const;

export const signInAction = (userdata: UserState) => {
  return {
    type: ActionTypes.SIGN_IN,
    payload: {
      isSignedIn: true,
      uid: userdata.uid,
      username: userdata.username,
      icon: userdata.icon,
    },
  };
};
type SignInAction = ReturnType<typeof signInAction>;

export const signOutAction = () => {
  return {
    type: ActionTypes.SIGN_OUT,
    payload: {
      isSignedIn: false,
      uid: "",
      username: "",
      icon: "",
    },
  };
};

type SignOutAction = ReturnType<typeof signOutAction>;

export type Actions = SignInAction | SignOutAction;
