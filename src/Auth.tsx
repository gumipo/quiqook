import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIsSignedIn } from "./reducks/Users/selector";
import { listenAuthState } from "./reducks/Users/oparations";

type Props = {
  children: React.ReactNode;
};
type AuthType = (children: Props) => any;

const Auth: AuthType = ({ children }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, [isSignedIn, dispatch]);

  if (!isSignedIn) {
    return <></>;
  } else {
    return children;
  }
};

export default Auth;
