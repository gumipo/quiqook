import React from "react";
import { ImageType, MaterialType, FlavorType, MethodListType } from "./type";
import styled from "styled-components";
import NoImage from "../../assets/Images/NoImage.png";

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
          {/* <StyledRecipeNameArea>
            <h3>料理名</h3>
            <p>{name}</p>
          </StyledRecipeNameArea> */}
          <StyledRecipeMaterialsArea>
            <h3>料理の説明</h3>
            <p>{description}</p>
          </StyledRecipeMaterialsArea>
        </StyledRecipeDescription>
      </StyledRecipeFirstStep>
      <button onClick={() => setStep(1)}>編集する</button>
      <StyledSecondStepTitle>用意するもの</StyledSecondStepTitle>
      <StyledRecipeSecondStep>
        <StyledMaterilasWrap>
          <h3>材料</h3>
          {materials.map((material) => (
            <StyledRecipeMaterilas>
              <li>{material.name}</li>
              <p>{material.amount}</p>
            </StyledRecipeMaterilas>
          ))}
        </StyledMaterilasWrap>

        <StyledFlavorsWrap>
          <h3>調味料</h3>
          {flavors.map((flavor) => (
            <StyledRecipeFlavors>
              <li>{flavor.name}</li>
              <p>{flavor.amount}</p>
            </StyledRecipeFlavors>
          ))}
        </StyledFlavorsWrap>
      </StyledRecipeSecondStep>
      <button onClick={() => setStep(2)}>編集する</button>
      <StyledThirdStepTitle>料理工程</StyledThirdStepTitle>
      <StyledRecipeThirdStep>
        {methods.map((method) => (
          <div>
            <div>
              <StyledMethodImage
                src={method.image.path ? method.image.path : NoImage}
              />
            </div>
            {method.method.map((list) => (
              <div>
                <li>{list.description}</li>
                <span>{list.time}</span>
              </div>
            ))}
          </div>
        ))}
      </StyledRecipeThirdStep>
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
  button {
    display: block;
    width: 200px;
    height: 30px;
    background: beige;
    margin: 16px auto;
    cursor: pointer;
  }
`;

const StyledRecipeTitle = styled.h2`
  width: 300px;
  font-size: 30px;
  color: #333;
  margin: 0;
  display: grid;
  place-items: center;
`;

const StyledRecipeFirstStep = styled.div`
  width: 650px;
  margin: 0 auto;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  margin-top: 50px;
`;

const StyledRecipeDescription = styled.div`
  /* margin-left: 100px; */
`;

const StyledRecipeImage = styled.img`
  width: 400px;
  height: auto;
  border: 2px solid #333;
  zoom: 0.8;
`;

const StyledRecipeNameArea = styled.div``;

const StyledRecipeMaterialsArea = styled.div``;

const StyledSecondStepTitle = styled.h2`
  font-size: 26px;
  width: 700px;
  margin: 60px auto 0 auto;
`;

const StyledRecipeSecondStep = styled.div`
  width: 700px;
  margin: 16px auto;
  display: flex;
  justify-content: space-around;
`;

const StyledMaterilasWrap = styled.div`
  width: 500px;
  margin-right: 40px;
  padding: 16px;
  border-radius: 16px;
  background: #abf1ab;
  　h3 {
    margin: 0 0 16px 0;
  }
  p {
    margin: 0 0 0 16px;
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
  　h3 {
    margin: 0 0 16px 0;
  }
  p {
    margin: 0 0 0 16px;
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
`;

const StyledRecipeThirdStep = styled.div`
  width: 650px;
`;

const StyledMethodImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;
