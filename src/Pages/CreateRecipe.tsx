import React, { useState } from "react";
import styled from "styled-components";
import { CookItemInput, CookNameInput } from "../Componets/index";
import Divider from "@material-ui/core/Divider";
import { ImageType } from "../Componets/CreateRecipe/type";

const CreateRecipe: React.FC = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<ImageType>({ id: "", path: "" });

  return (
    <StyledCreateRecipes>
      <h2>STEP{step}</h2>
      <Divider />

      {step === 1 && (
        <CookNameInput
          step={step}
          setStep={setStep}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          image={image}
          setImage={setImage}
        />
      )}
      {step === 2 && <CookItemInput />}
    </StyledCreateRecipes>
  );
};

export default CreateRecipe;

const StyledCreateRecipes = styled.section`
  width: 1000px;
  margin: 24px auto;
  h2 {
    margin: 0 0 0 24px;
  }
`;
