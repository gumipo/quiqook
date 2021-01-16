import React, { useState, useMemo } from "react";
import styled from "styled-components";
import {
  CookItemInput,
  CookNameInput,
  CookMethod,
  ConfirmationRecipe,
} from "../Componets/index";
import Divider from "@material-ui/core/Divider";
import {
  ImageType,
  MaterialType,
  FlavorType,
  MethodListType,
} from "../Componets/CreateRecipe/type";

const CreateRecipe: React.FC = () => {
  const [step, setStep] = useState(4);
  // step1
  const [name, setName] = useState("簡単炒飯");
  const [description, setDescription] = useState("爆速でできる激ウマ炒飯");
  const [image, setImage] = useState<ImageType>({ id: "", path: "" });

  //step2
  const [materials, setMaterials] = useState<MaterialType[]>([
    { name: "大根", amount: "１切れ" },
  ]);
  const [flavors, setFlavors] = useState<FlavorType[]>([
    { name: "醤油", amount: "大さじ１" },
  ]);

  //stpe3
  const initialMethodState: MethodListType = {
    image: { id: "", path: "" },
    method: [{ description: "油を引き炒める", time: 2 }],
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
      case 4: {
        return "〜確認画面〜";
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
      <StyledStep>
        STEP{step}
        <span>{titleText}</span>
      </StyledStep>
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
      {step === 4 && (
        <ConfirmationRecipe
          name={name}
          description={description}
          image={image}
          materials={materials}
          flavors={flavors}
          methods={methods}
          setStep={setStep}
        />
      )}
    </StyledCreateRecipes>
  );
};

export default CreateRecipe;

const StyledCreateRecipes = styled.section`
  width: 100%;
  margin: 24px auto;
`;

const StyledStep = styled.h2`
  width: 1000px;
  margin: 0 auto;
  span {
    font-size: 22px;
    margin-left: 16px;
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
