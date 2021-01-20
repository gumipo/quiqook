import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../reducks/Recipes/oparations";
import { getRecipesList } from "../reducks/Recipes/selector";
import styled from "styled-components";
import { RecipeListItem } from "../Componets";

const AllRecipes: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const recipelist = getRecipesList(selector);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);

  return (
    <StyledAllRecipes>
      {recipelist.length > 0 &&
        recipelist.map((recipe) => (
          <RecipeListItem key={recipe.id} recipe={recipe} />
        ))}
    </StyledAllRecipes>
  );
};

export default AllRecipes;

const StyledAllRecipes = styled.section`
  width: 1200px;
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
