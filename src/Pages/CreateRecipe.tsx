import React, { useState } from "react";
import styled from "styled-components";
import { InputItem } from "../Componets/index";

const CreateRecipe: React.FC = () => {
  const [step, setStep] = useState(1);
  return (
    <StyledCreateRecipes>{step === 1 && <InputItem />}</StyledCreateRecipes>
  );
};

export default CreateRecipe;

const StyledCreateRecipes = styled.section``;
