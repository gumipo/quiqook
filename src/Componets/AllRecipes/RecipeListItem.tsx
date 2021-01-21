import React, { useMemo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RecipeDataType } from "../../reducks/Recipes/types";
import styled from "styled-components";
import NoImage from "../../assets/Images/NoImage.png";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useSelector, useDispatch } from "react-redux";
import { getUserId } from "../../reducks/Users/selector";
import { db } from "../../Firebase";
import { addFavoriteRecipe } from "../../reducks/Users/oparations";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import chef from "../../assets/Images/chef.png";

interface PropsType {
  recipe: RecipeDataType;
}

const RecipeListItem: React.FC<PropsType> = ({ recipe }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const favoriteCount = useMemo(() => {
    if (isFavorite === true) {
      return recipe.favoriteCount + 1;
    } else {
      if (recipe.favoriteCount === 0) {
        return recipe.favoriteCount;
      }
      return recipe.favoriteCount - 1;
    }
  }, [isFavorite]);

  useEffect(() => {
    if (uid === "") {
      return;
    }
    db.collection("users")
      .doc(uid)
      .collection("favorite")
      .get()
      .then((snapshots) => {
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          const favoriteId = data.id;
          if (recipe.id === favoriteId) {
            setIsFavorite(true);
          }
        });
      });
  }, [uid]);

  const favoriteChange = () => {
    const batch = db.batch();
    if (!isFavorite) {
      dispatch(
        addFavoriteRecipe({
          image: recipe.image,
          name: recipe.name,
          description: recipe.description,
          materials: recipe.materials,
          flavors: recipe.flavors,
          methods: recipe.methods,
          id: recipe.id!,
          icon: recipe.icon!,
          favoriteCount: recipe.favoriteCount,
        })
      );
      batch.update(db.collection("recipes").doc(recipe.id), {
        favoriteCount: recipe.favoriteCount + 1,
      });
      setIsFavorite(true);
    } else {
      db.collection("users")
        .doc(uid)
        .collection("favorite")
        .doc(recipe.id)
        .delete();
      batch.update(db.collection("recipes").doc(recipe.id), {
        favoriteCount: recipe.favoriteCount + 1,
      });
      setIsFavorite(false);
    }
  };

  const date = useMemo(() => {
    const month = recipe.created_at!.toDate().getMonth() + 1;
    const day = recipe.created_at?.toDate().getDate();
    const time = recipe.created_at?.toDate().getHours();
    const minites = recipe.created_at?.toDate().getMinutes();
    return `${month}月${day}日 ${time}時${minites}分`;
  }, []);

  return (
    <StyledRecipeListItem>
      <RecipeImage
        src={recipe.image.path ? recipe.image.path : NoImage}
        alt="recipe image"
      />
      <div>
        <StyledUploadArea>
          <StyledUserArea>
            <StyledDate>{date}</StyledDate>
            <StyledUserIcon
              src={recipe.icon ? recipe.icon : chef}
              alt="user icon"
            />
          </StyledUserArea>
        </StyledUploadArea>
        <div>
          <RecipeName>{recipe.name}</RecipeName>

          {uid !== "" && recipe.uid !== uid && (
            <IconButton
              style={{
                width: 40,
                height: 40,
                position: "absolute",
                top: "300px",
                right: "5%",
                background: "#ffe4d9",
                zIndex: 2,
              }}
              onClick={() => favoriteChange()}
            >
              <FavoriteIcon
                color={isFavorite ? "error" : "disabled"}
                style={{ zIndex: 3 }}
              />
            </IconButton>
          )}
          <StyledItemFooter>
            {totalTime !== "0分" && (
              <StyledTime>
                <HourglassEmptyIcon style={{ width: 20, height: 20 }} />
                <span>{totalTime}</span>
              </StyledTime>
            )}
            {favoriteCount}
            <RecipeDetailButton
              onClick={() => history.push("/recipe/detail/" + recipe.id)}
            >
              レシピを見る
            </RecipeDetailButton>
          </StyledItemFooter>
        </div>
      </div>
    </StyledRecipeListItem>
  );
};

export default RecipeListItem;

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

const StyledDate = styled.span`
  position: absolute;
  font-size: 12px;
  top: 10px;
  right: 5px;
  background-color: #aef7f1;
  padding: 2px;
  border-radius: 5px;
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
