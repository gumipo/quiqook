import { signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import {
  auth,
  db,
  FirebaseTimeStamp,
  googleProvider,
  twitterProvider,
} from "../../Firebase/index";
import { Dispatch } from "redux";
import { StoreState } from "./../Store/types";

export const listenAuthState = () => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    const path = getState().router.location.pathname;
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();
            if (data === undefined) {
              return null;
            }
            dispatch(
              signInAction({
                isSignedIn: true,
                uid: uid,
                username: data.username,
                icon: data.icon ? data.icon : "",
              })
            );
          });
      } else if (
        path === "/" ||
        path === "/all/recipe" ||
        path === "/site/description"
      ) {
        dispatch(push(path));
      } else {
        dispatch(push("/login"));
      }
    });
  };
};

export const signUp = (username: string, email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimeStamp.now();
          const userInitialData = {
            created_at: timestamp,
            email: email,
            uid: uid,
            updated_at: timestamp,
            username: username,
          };
          db.collection("users")
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(push("/my/recipe"));
            });
        }
      })
      .catch(() => {
        alert("アカウント作成に失敗しました。通信状況を御確かめください");
      });
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          const uid = user.uid;
          db.collection("users")
            .doc(uid)
            .get()
            .then((snapshot) => {
              const data = snapshot.data();
              if (data === undefined) {
                return null;
              }
              dispatch(
                signInAction({
                  isSignedIn: true,
                  uid: uid,
                  username: data.username,
                  icon: data.icon,
                })
              );
              dispatch(push("/my/recipe"));
            });
        }
      })
      .catch(() => {
        alert(
          "ログインに失敗しました。パスワードを御確かめの上もう一度お試しください"
        );
      });
  };
};

export const signOut = () => {
  return async (dispatch: Dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push("/"));
    });
  };
};

export const resetPassword = (email: string) => {
  return async (dispatch: Dispatch) => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert(
          "入力されたメールアドレスにパスワードリセット用のメールを送信しました"
        );
        dispatch(push("/login"));
      })
      .catch(() => {
        alert("パスワードリセットに失敗しました。再度お試しください");
      });
  };
};

export const googleLogin = () => {
  return (dispatch: Dispatch) => {
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        const user = result.user;
        if (user === null) {
          return null;
        }
        const uid = user.uid;
        const timestamp = FirebaseTimeStamp.now();
        const userData = {
          createed_at: timestamp,
          updated_at: timestamp,
          uid: user.uid,
          email: user.email,
          username: user.displayName,
          icon: user.photoURL,
        };
        db.collection("users")
          .doc(uid)
          .set(userData)
          .then(() => {
            dispatch(push("/my/recipe"));
          });
      })
      .catch(() => {
        alert(
          "ログインに失敗しました。メールアドレスまたは他のSNSアカウントをお確かめください"
        );
      });
  };
};

export const twitterLogin = () => {
  return (dispatch: Dispatch) => {
    auth
      .signInWithPopup(twitterProvider)
      .then((result) => {
        const user = result.user;
        if (user === null) {
          return null;
        }
        const uid = user.uid;
        const timestamp = FirebaseTimeStamp.now();
        const userData = {
          createed_at: timestamp,
          updated_at: timestamp,
          uid: user.uid,
          email: user.email,
          username: user.displayName,
          icon: user.photoURL,
        };
        db.collection("users")
          .doc(uid)
          .set(userData)
          .then(() => {
            dispatch(push("/my/recipe"));
          })
          .catch(() => {
            alert("ログインに失敗しました。");
          });
      })
      .catch(() => {
        alert(
          "ログインに失敗しました。メールアドレスまたは他のSNSアカウントをお確かめください"
        );
      });
  };
};
