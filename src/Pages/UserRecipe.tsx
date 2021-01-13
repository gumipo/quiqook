import React, { useState } from "react";
import styled from "styled-components";

const UserRecipe: React.FC = () => {
  const [userRecipeList, setUserRecipeList] = useState("myRecipe");
  return (
    <StyledUserRecipe>
      <StyledRecipeChoice>
        <span>作成したレシピ</span>
        <span>下書き</span>
        <span>お気に入り</span>
      </StyledRecipeChoice>
      <StyledRecipeListArea></StyledRecipeListArea>
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
    :nth-child(1) {
      ${(userRecipeList) =>
        userRecipeList === "myRecipe" &&
        `
        border-bottom : solid 5px orange;
      `}
    }
  }
`;

const StyledRecipeListArea = styled.div``;
