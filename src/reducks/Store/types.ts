import "react-redux";
import { RouterState } from "connected-react-router";

export type StoreState = {
  users: {
    isSignedIn: false;
    id: string;
    username: string;
    icon: string;
  };
  roter: RouterState;
};

declare module "react-redux" {
  interface DefaultRootState extends StoreState {}
}
