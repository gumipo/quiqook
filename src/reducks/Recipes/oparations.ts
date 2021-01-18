import { push } from "connected-react-router";
import { RecipeType, RecipeDataType } from "./types";
import { db, FirebaseTimeStamp } from "../../Firebase/index";
import { Dispatch } from "redux";
import { StoreState } from "./../Store/types";

const recipesRef = db.collection("recipes");

export const saveRecipe = ({
  id,
  image,
  name,
  description,
  materials,
  flavors,
  methods,
}: RecipeType) => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    const timestamp = FirebaseTimeStamp.now();
    const user = getState().users;
    const icon = user.icon;
    const username = user.username;
    const uid = user.uid;

    const data: RecipeDataType = {
      icon: icon,
      uid: uid,
      username: username,
      image: image,
      name: name,
      description: description,
      materials: materials,
      flavors: flavors,
      methods: methods,
      updated_at: timestamp,
    };
    if (id === "") {
      const ref = recipesRef.doc();
      id = ref.id;
      data.id = id;
      data.created_at = timestamp;
    }

    return recipesRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push("/"));
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
};
