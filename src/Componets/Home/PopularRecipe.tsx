import React, { useEffect } from "react";
// import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PopularRecipeList from "./PopularRecipeList";

const PopularRecipe: React.FC = () => {
  // const history = useHistory();

  useEffect(() => {
    //ランキング処理
  }, []);

  return (
    <StyledPopolarRecipe>
      <StyledTitle>人気のレシピ</StyledTitle>
      <PopularRecipeList />
    </StyledPopolarRecipe>
  );
};

export default PopularRecipe;

const StyledPopolarRecipe = styled.div`
  width: 900px;
  margin: 50px auto;
  border: 2px solid #333;
  box-shadow: 3px 3px 3px #333;
`;

const StyledTitle = styled.h2`
  color: #333;
  margin: 0 10px;
`;
