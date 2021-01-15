import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { CookItemInput, CookNameInput, CookMethod } from "../Componets/index";
import Divider from "@material-ui/core/Divider";
import {
  ImageType,
  MaterialType,
  FlavorType,
  MethodListType,
} from "../Componets/CreateRecipe/type";

const CreateRecipe: React.FC = () => {
  const [step, setStep] = useState(3);
  // step1
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<ImageType>({ id: "", path: "" });

  //step2
  const [materials, setMaterials] = useState<MaterialType[]>([]);
  const [flavors, setFlavors] = useState<FlavorType[]>([]);

  //stpe3
  const initialMethodState: MethodListType = {
    image: { id: "", path: "" },
    method: [],
  };

  const [methods, setMethods] = useState<MethodListType[]>([
    initialMethodState,
  ]);

  const titleText = useMemo(() => {
    switch (step) {
      case 1:
        return "〜料理名、キャッチコピーの作成〜";
      case 2:
        return "〜材料と調味料リスト作成〜";
      case 3: {
        return "〜料理工程の作成〜";
      }
      default:
        break;
    }
  }, [step]);

  const reverceStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const addMethodInputArea = () => {
    setMethods((prevState) => [...prevState, initialMethodState]);
  };

  const deleteMethodInputArea = (index: number) => {
    const isDelete = window.confirm("本当に削除してもよろしいですか？");
    if (isDelete) {
      const newMethods = methods.filter((item, i) => i !== index);
      setMethods(newMethods);
    }
  };

  return (
    <StyledCreateRecipes>
      {step >= 2 && (
        <StyledPrevStep onClick={reverceStep}>← 前のSTEPへ</StyledPrevStep>
      )}
      <h2>
        STEP{step}
        <span>{titleText}</span>
      </h2>
      <Divider />
      {step === 1 && (
        <CookNameInput
          setStep={setStep}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          image={image}
          setImage={setImage}
        />
      )}
      {step === 2 && (
        <CookItemInput
          setStep={setStep}
          materials={materials}
          setMaterials={setMaterials}
          flavors={flavors}
          setFlavors={setFlavors}
        />
      )}
      {step === 3 &&
        methods.map((method, index) => (
          <CookMethod
            method={method}
            index={index}
            key={index}
            setStep={setStep}
            methods={methods}
            setMethods={setMethods}
            deleteMethodInputArea={deleteMethodInputArea}
            addMethodInputArea={addMethodInputArea}
          />
        ))}
    </StyledCreateRecipes>
  );
};

export default CreateRecipe;

const StyledCreateRecipes = styled.section`
  width: 100%;
  margin: 24px auto;
  h2 {
    width: 1000px;
    margin: 0 auto;
    span {
      font-size: 22px;
      margin-left: 16px;
    }
  }
`;

const StyledPrevStep = styled.p`
  cursor: pointer;
  width: 1000px;
  font-size: 12px;
  color: #333;
  opacity: 0.5;
  margin: 0 auto;
`;
