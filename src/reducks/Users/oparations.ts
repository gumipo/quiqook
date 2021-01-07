import { signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import { auth, db, FirebaseTimeStamp } from "../../Firebase/index";
import { Dispatch } from "redux";

export const listenAuthState = () => {
  return async (dispatch: Dispatch) => {
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
      } else {
        dispatch(push("/"));
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
              dispatch(push("/"));
            });
        }
      });
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    auth.signInWithEmailAndPassword(email, password).then((result) => {
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
            dispatch(push("/"));
          });
      }
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
