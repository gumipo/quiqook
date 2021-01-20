import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MyRecipeList, FavoriteRecipeList } from "../Componets";

import { db } from "../Firebase";

const UserRecipe: React.FC = () => {
  const [recipePage, setRecipePage] = useState("myRecipe");

  return (
    <StyledUserRecipe>
      <StyledRecipeChoice>
        <span
          className={recipePage === "myRecipe" ? "page-border" : ""}
          onClick={() => setRecipePage("myRecipe")}
        >
          作成したレシピ
        </span>
        <span
          className={recipePage === "draft" ? "page-border" : ""}
          onClick={() => setRecipePage("draft")}
        >
          下書き
        </span>
        <span
          className={recipePage === "favorite" ? "page-border" : ""}
          onClick={() => setRecipePage("favorite")}
        >
          お気に入り
        </span>
      </StyledRecipeChoice>
      <StyledRecipeListArea>
        {recipePage === "myRecipe" && <MyRecipeList recipePage={recipePage} />}
        {recipePage === "favorite" && (
          <FavoriteRecipeList recipePage={recipePage} />
        )}
      </StyledRecipeListArea>
    </StyledUserRecipe>
  );
};

export default UserRecipe;

const StyledUserRecipe = styled.section`
  width: 1200px;
  margin: 24px auto;
  @media screen and (max-width: 767px) {
    width: 350px;
  }
`;

const StyledRecipeChoice = styled.div`
  display: flex;
  justify-content: center;
  　　span {
    margin: 0 24px;
    cursor: pointer;
    @media screen and (max-width: 767px) {
      font-size: 10px;
    }
  }
`;

const StyledRecipeListArea = styled.div``;
