import { push } from "connected-react-router";
import { RecipeType, RecipeDataType } from "./types";
import { db, FirebaseTimeStamp } from "../../Firebase/index";
import { Dispatch } from "redux";
import { Actions } from "./actions";
import { StoreState } from "./../Store/types";
import { fetchRecipesAction } from "./actions";

const recipesRef = db.collection("recipes");

export const fetchRecipes = () => {
  return async (dispatch: Dispatch<Actions>) => {
    recipesRef
      .orderBy("created_at", "desc")
      .get()
      .then((snapshots) => {
        const recipesList: RecipeDataType[] = [];
        snapshots.forEach((snapshot) => {
          const recipe = snapshot.data() as RecipeDataType;
          recipesList.push(recipe);
        });
        dispatch(fetchRecipesAction(recipesList));
      });
  };
};

export const saveRecipe = ({
  id,
  image,
  name,
  description,
  materials,
  flavors,
  methods,
  favoriteCount,
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
      favoriteCount: favoriteCount,
    };
    if (id === "") {
      const ref = recipesRef.doc();
      id = ref.id;
      data.id = id;
      data.created_at = timestamp;
      data.favoriteCount = 0;
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
