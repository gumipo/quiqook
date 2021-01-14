import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MyRecipeList from "../Componets/UserRecipes/MyRecipeList";
import { db } from "../Firebase";

const UserRecipe: React.FC = () => {
  const [recipeList, setRecipeList] = useState("myRecipe");

  useEffect(() => {
    if (recipeList === "myRecipe") {
      const query = db.collection
    }
  }, [recipeList]);

  return (
    <StyledUserRecipe>
      <StyledRecipeChoice>
        <span
          className={recipeList === "myRecipe" ? "page-border" : ""}
          onClick={() => setRecipeList("myRecipe")}
        >
          作成したレシピ
        </span>
        <span
          className={recipeList === "draft" ? "page-border" : ""}
          onClick={() => setRecipeList("draft")}
        >
          下書き
        </span>
        <span
          className={recipeList === "favorite" ? "page-border" : ""}
          onClick={() => setRecipeList("favorite")}
        >
          お気に入り
        </span>
      </StyledRecipeChoice>
      <StyledRecipeListArea>
        <MyRecipeList />
      </StyledRecipeListArea>
    </StyledUserRecipe>
  );
};

export default UserRecipe;

const StyledUserRecipe = styled.section`
  width: 800px;
  margin: 24px auto;
`;

const StyledRecipeChoice = styled.div`
  display: flex;
  justify-content: center;
  　　span {
    margin: 0 24px;
    cursor: pointer;
  }
`;

const StyledRecipeListArea = styled.div``;
