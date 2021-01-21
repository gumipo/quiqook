import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserId } from "../../reducks/Users/selector";
import { db } from "../../Firebase";
import { RecipeType } from "../../reducks/Recipes/types";
import UserRecipeListItem from "./UserRecipeListItem";
import styled from "styled-components";

interface PropsType {
  recipePage: string;
}

const FavoriteRecipeList: React.FC<PropsType> = ({ recipePage }) => {
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);

  const [recipeLists, setRecipeLists] = useState<RecipeType[]>([]);

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .collection("favorite")
      .get()
      .then((snapshots) => {
        const recipesList: RecipeType[] = [];
        snapshots.forEach((snapshot) => {
          const recipe = snapshot.data() as RecipeType;
          recipesList.push(recipe);
        });
        setRecipeLists(recipesList);
      });
  }, []);

  return (
    <StyledFavoriteRecipes>
      {recipeLists.length > 0 &&
        recipeLists.map((list) => (
          <UserRecipeListItem key={list.id} recipe={list} page={recipePage} />
        ))}
    </StyledFavoriteRecipes>
  );
};

export default FavoriteRecipeList;

const StyledFavoriteRecipes = styled.section`
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
  } ;
`;
