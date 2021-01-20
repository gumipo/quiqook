import firebase from "firebase/app";
import {
  MaterialType,
  ImageType,
  FlavorType,
  MethodListType,
} from "./../../Componets/CreateRecipe/type";

export interface RecipeDataType {
  id?: string;
  icon?: string;
  uid: string;
  username: string;
  image: ImageType;
  name: string;
  description: string;
  materials: MaterialType[];
  flavors: FlavorType[];
  methods: MethodListType[];
  updated_at: firebase.firestore.Timestamp;
  created_at?: firebase.firestore.Timestamp;
}

export interface RecipeType {
  id: string;
  image: ImageType;
  name: string;
  description: string;
  materials: MaterialType[];
  flavors: FlavorType[];
  methods: MethodListType[];
  icon?: string;
}
