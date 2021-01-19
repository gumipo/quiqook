import React from "react";
import { useDispatch } from "react-redux";
import { ImageType, MaterialType, FlavorType, MethodListType } from "./type";
import styled from "styled-components";
import NoImage from "../../assets/Images/NoImage.png";
import { Divider } from "@material-ui/core";
import { saveRecipe } from "../../reducks/Recipes/oparations";

interface PropsType {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  description: string;
  image: ImageType;
  materials: MaterialType[];
  flavors: FlavorType[];
  methods: MethodListType[];
}

const ConfirmationRecipe: React.FC<PropsType> = ({
  setStep,
  name,
  description,
  image,
  materials,
  flavors,
  methods,
}) => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split("/create/recipe")[1];
  if (id !== "") {
    id = id.split("/")[1];
  }

  return (
    <StyledConfirmationRecipe>
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
      <StyledFixButton onClick={() => setStep(1)}>編集する</StyledFixButton>
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
      <StyledFixButton onClick={() => setStep(2)}>編集する</StyledFixButton>
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
      <StyledFixButton onClick={() => setStep(3)}>編集する</StyledFixButton>
      <StyledRegisterButton
        onClick={() =>
          dispatch(
            saveRecipe({
              id,
              image,
              name,
              description,
              materials,
              flavors,
              methods,
            })
          )
        }
      >
        登録する
      </StyledRegisterButton>
    </StyledConfirmationRecipe>
  );
};

export default ConfirmationRecipe;

const StyledConfirmationRecipe = styled.div`
  width: 900px;
  margin: 16px auto;
  border-style: groove;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 0px 10px 5px #333;
  @media screen and (max-width: 767px) {
    width: 350px;
  }
`;

const StyledFixButton = styled.button`
  display: block;
  width: 200px;
  height: 30px;
  background: beige;
  margin: 16px auto;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    width: 100px;
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
`;

const StyledRegisterButton = styled.button`
  display: block;
  width: 300px;
  height: 50px;
  margin: 24px auto;
  background-color: #aae2aa;
  color: #333;
  @media screen and (max-width: 767px) {
    width: 200px;
    height: 30px;
    margin-bottom: 80px;
  }
`;
