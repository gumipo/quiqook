import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserId } from "../../reducks/Users/selector";
import { db } from "../../Firebase";
import { RecipeDataType, RecipeType } from "../../reducks/Recipes/types";
import UserRecipeListItem from "./UserRecipeListItem";
import styled from "styled-components";

interface PropsType {
  recipePage: string;
}

const MyRecipeList: React.FC<PropsType> = ({ recipePage }) => {
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);

  const [recipeLists, setRecipeLists] = useState<RecipeDataType[]>([]);

  useEffect(() => {
    db.collection("recipes")
      .orderBy("updated_at", "desc")
      .where("uid", "==", uid)
      .get()
      .then((snapshots) => {
        const recipesList: RecipeDataType[] = [];
        snapshots.forEach((snapshot) => {
          const recipe = snapshot.data() as RecipeDataType;
          recipesList.push(recipe);
        });
        setRecipeLists(recipesList);
      });
  }, []);

  return (
    <StyledMyRecipe>
      {recipeLists.length > 0 &&
        recipeLists.map((list) => (
          <UserRecipeListItem key={list.id} recipe={list} page={recipePage} />
        ))}
    </StyledMyRecipe>
  );
};

export default MyRecipeList;

const StyledMyRecipe = styled.div`
  margin: 24px auto;
  display: grid;
  place-items: center;
  padding-bottom: 100px;
  @media screen and (max-width: 767px) {
    width: 350px;
    grid-template-columns: 1fr;
  }

  @media screen and (min-width: 1040px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
