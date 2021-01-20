import React, { useMemo } from "react";
import styled from "styled-components";
import { RecipeDataType, RecipeType } from "../../reducks/Recipes/types";
import NoImage from "../../assets/Images/NoImage.png";
import { useSelector } from "react-redux";
import { getUserId } from "../../reducks/Users/selector";
import chef from "../../assets/Images/chef.png";
import { useHistory } from "react-router-dom";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";

interface PropsType {
  recipe: RecipeType | RecipeDataType;
  page: string;
}

const UserRecipeListItem: React.FC<PropsType> = ({ recipe, page }) => {
  const selector = useSelector((state) => state);
  const history = useHistory();

  const totalTime = useMemo(() => {
    let time = 0;
    recipe.methods.forEach((method) => {
      return (time = method.method.reduce(
        (sum, list) => (sum += list.time),
        0
      ));
    });
    if (String(time).length > 3) {
      const newtime = Math.round(time / 60);
      return `${newtime}時間`;
    }
    return `${time}分`;
  }, []);

  return (
    <StyledRecipeListItem>
      <RecipeImage
        src={recipe.image.path ? recipe.image.path : NoImage}
        alt=""
      />
      <div>
        <StyledUploadArea>
          <StyledUserArea>
            {page !== "myRecipe" && (
              <StyledUserIcon
                src={recipe.icon ? recipe.icon : chef}
                alt="user icon"
              />
            )}
          </StyledUserArea>
        </StyledUploadArea>
        <div>
          <RecipeName>{recipe.name}</RecipeName>
          <StyledItemFooter>
            {totalTime !== "0分" && (
              <StyledTime>
                <HourglassEmptyIcon style={{ width: 20, height: 20 }} />
                <span>{totalTime}</span>
              </StyledTime>
            )}
            <RecipeDetailButton
              onClick={() => history.push("/recipe/detail/" + recipe.id)}
            >
              レシピを見る
            </RecipeDetailButton>
            {page === "myRecipe" && (
              <StyledFixButton
                onClick={() => history.push("/create/recipe/" + recipe.id)}
              >
                編集する
              </StyledFixButton>
            )}
          </StyledItemFooter>
        </div>
      </div>
    </StyledRecipeListItem>
  );
};

export default UserRecipeListItem;

const StyledRecipeListItem = styled.div`
  width: 350px;
  margin: 16px auto;
  position: relative;
  @media screen and (max-width: 767px) {
    width: 350px;
  }
`;

const RecipeImage = styled.img`
  width: 350px;
  height: 350px;
  border-radius: 16px;
`;

const StyledUploadArea = styled.div`
  width: 300px;
`;

const StyledUserArea = styled.div`
  display: flex;
  align-items: center;
`;

const StyledUserIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  position: absolute;
  top: 10px;
  left: 10px;
`;

const RecipeName = styled.p`
  font-size: 14px;
  padding: 2px;
  position: absolute;
  bottom: 10%;
  left: 10px;
  background-color: #8eee8e;
  border-radius: 5px;
`;

const RecipeDetailButton = styled.button`
  background-color: #ffffc3;
  float: right;
`;

const StyledItemFooter = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span {
    font-size: 12px;
  }
`;

const StyledTime = styled.div`
  margin-right: 10px;
`;

const StyledFixButton = styled.button`
  background-color: #333;
  color: white;
  margin-left: 8px;
`;
