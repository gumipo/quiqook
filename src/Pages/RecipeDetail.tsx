import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../Firebase";
import styled from "styled-components";
import {
  MaterialType,
  FlavorType,
  MethodListType,
} from "../Componets/CreateRecipe/type";
import { Divider } from "@material-ui/core";
import NoImage from "../assets/Images/NoImage.png";

const RecipeDetail: React.FC = () => {
  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname;
  const id = path.split("/recipe/detail/")[1];

  const [image, setImage] = useState({ id: "", path: "" });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [flavors, setFlavors] = useState<FlavorType[]>([]);
  const [materials, setMaterials] = useState<MaterialType[]>([]);
  const [methods, setMethods] = useState<MethodListType[]>([]);

  useEffect(() => {
    db.collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        setName(data!.name);
        setDescription(data!.description);
        setFlavors(data!.flavors);
        setMaterials(data!.materials);
        setImage(data!.image);
        setMethods(data!.methods);
      });
  }, []);

  return (
    <StyledRecipeDetail>
      <StyledRecipeFirstStep>
        <div>
          <StyledRecipeTitle>{name}のレシピ</StyledRecipeTitle>
          <StyledRecipeImage
            src={image.path !== "" ? image.path : NoImage}
            alt="プレビュー画像"
          />
        </div>
        <StyledRecipeDescription>
          <div>
            <h3>料理の説明</h3>
            <p>{description}</p>
          </div>
        </StyledRecipeDescription>
      </StyledRecipeFirstStep>

      <StyledSecondStepTitle>用意するもの</StyledSecondStepTitle>
      <StyledRecipeSecondStep>
        <StyledMaterilasWrap>
          <h3>材料</h3>
          {materials.map((material, index) => (
            <StyledRecipeMaterilas key={index}>
              <li>{material.name}</li>
              <p>{material.amount}</p>
            </StyledRecipeMaterilas>
          ))}
        </StyledMaterilasWrap>

        <StyledFlavorsWrap>
          <h3>調味料</h3>
          {flavors.map((flavor, index) => (
            <StyledRecipeFlavors key={index}>
              <li>{flavor.name}</li>
              <p>{flavor.amount}</p>
            </StyledRecipeFlavors>
          ))}
        </StyledFlavorsWrap>
      </StyledRecipeSecondStep>

      <StyledThirdStepTitle>料理工程</StyledThirdStepTitle>
      <StyledRecipeThirdStep>
        {methods.map((method, index) => (
          <StyledMethodsArea key={index}>
            <StyledMethodImage
              src={method.image.path ? method.image.path : NoImage}
            />
            <div>
              {method.method.map((list) => (
                <div key={list.description}>
                  <StyledMethodDescription>
                    <li>{list.description}</li>
                    {list.time > 0 && <span>{list.time}分</span>}
                  </StyledMethodDescription>
                  <Divider />
                </div>
              ))}
            </div>
          </StyledMethodsArea>
        ))}
      </StyledRecipeThirdStep>
    </StyledRecipeDetail>
  );
};

export default RecipeDetail;

const StyledRecipeDetail = styled.div`
  width: 900px;
  margin: 16px auto;
  border-style: groove;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 0px 10px 5px #333;
  @media screen and (max-width: 767px) {
    width: 350px;
    margin-bottom: 100px;
  }
`;

const StyledRecipeTitle = styled.h2`
  width: 300px;
  font-size: 30px;
  color: #333;
  margin: 0;
  @media screen and (max-width: 767px) {
    width: 200px;
    font-size: 18px;
    margin-left: 16px;
  }
`;

const StyledRecipeFirstStep = styled.div`
  width: 700px;
  margin: 0 auto;
  margin-top: 50px;
  @media screen and (max-width: 767px) {
    width: 330px;
  }
`;

const StyledRecipeDescription = styled.div`
  h3 {
    margin: 16px 0 0 0;
    @media screen and (max-width: 767px) {
      font-size: 16px;
      margin-left: 16px;
    }
  }
  p {
    margin: 0;
    @media screen and (max-width: 767px) {
      font-size: 14px;
      margin-left: 16px;
    }
  }
`;

const StyledRecipeImage = styled.img`
  width: 400px;
  height: auto;
  border: 2px solid #333;
  @media screen and (max-width: 767px) {
    width: 200px;
    margin-left: 16px;
  }
`;

const StyledSecondStepTitle = styled.h2`
  font-size: 26px;
  width: 700px;
  margin: 30px auto 0 auto;
  @media screen and (max-width: 767px) {
    width: 300px;
    font-size: 16px;
  }
`;

const StyledRecipeSecondStep = styled.div`
  width: 700px;
  margin: 16px auto 32px auto;
  display: flex;
  justify-content: space-around;
  @media screen and (max-width: 767px) {
    width: 300px;
    flex-direction: column;
  }
`;

const StyledMaterilasWrap = styled.div`
  width: 500px;
  margin-right: 40px;
  padding: 16px;
  border-radius: 16px;
  background: #abf1ab;
  @media screen and (max-width: 767px) {
    width: 300px;
    margin-bottom: 8px;
  }
  　h3 {
    margin: 0 0 16px 0;
    @media screen and (max-width: 767px) {
      font-size: 14px;
    }
  }
  li {
    @media screen and (max-width: 767px) {
      font-size: 12px;
    }
  }
  p {
    margin: 0 0 0 16px;
    @media screen and (max-width: 767px) {
      font-size: 12px;
    }
  }
`;

const StyledRecipeMaterilas = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledFlavorsWrap = styled.div`
  width: 500px;
  padding: 16px;
  border-radius: 16px;
  background: #ffd7c7;
  @media screen and (max-width: 767px) {
    width: 300px;
  }
  　h3 {
    margin: 0 0 16px 0;
    @media screen and (max-width: 767px) {
      font-size: 14px;
    }
  }
  li {
    @media screen and (max-width: 767px) {
      font-size: 12px;
    }
  }

  p {
    margin: 0 0 0 16px;
    @media screen and (max-width: 767px) {
      font-size: 12px;
    }
  }
`;

const StyledRecipeFlavors = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledThirdStepTitle = styled.h2`
  font-size: 26px;
  width: 700px;
  margin: 60px auto 0 auto;
  @media screen and (max-width: 767px) {
    width: 300px;
    margin-left: 16px;
    font-size: 16px;
  }
`;

const StyledRecipeThirdStep = styled.div`
  width: 700px;
  margin: 0 auto;
  @media screen and (max-width: 767px) {
    width: 320px;
    margin-left: 16px;
    margin-bottom: 24px;
  }
`;

const StyledMethodImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin-right: 16px;
  border-style: groove;
  @media screen and (max-width: 767px) {
    width: 200px;
    height: 200px;
  }
`;

const StyledMethodsArea = styled.div`
  display: flex;
  margin-top: 8px;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

const StyledMethodDescription = styled.ul`
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin-block-start: 8px;
  margin-block-end: 8px;

  li {
    width: 200px;
    font-size: 14px;
    @media screen and (max-width: 767px) {
      font-size: 12px;
    }
  }
  span {
    padding: 0;
    font-size: 12px;
    margin-left: 12px;
    @media screen and (max-width: 767px) {
      font-size: 8px;
    }
  }
`;
