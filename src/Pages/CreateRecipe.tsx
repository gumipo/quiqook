import React, { useState, useMemo, useEffect } from "react";
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
import { db } from "../Firebase";
import { RecipeDataType } from "../reducks/Recipes/types";

const CreateRecipe: React.FC = () => {
  let id = window.location.pathname.split("/create/recipe")[1];
  if (id !== "") {
    id = id.split("/")[1];
  }

  const [step, setStep] = useState(1);
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

  const [favoriteCount, setFavoriteCount] = useState(0);

  const titleText = useMemo(() => {
    switch (step) {
      case 1:
        return "料理名、キャッチコピーの作成";
      case 2:
        return "材料と調味料リスト作成";
      case 3: {
        return "料理工程の作成";
      }
      case 4: {
        return "確認画面";
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

  useEffect(() => {
    if (id !== "") {
      db.collection("recipes")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data() as RecipeDataType;
          setName(data.name);
          setImage(data.image);
          setDescription(data.description);
          setMaterials(data.materials);
          setFlavors(data.flavors);
          setMethods(data.methods);
          setFavoriteCount(data.favoriteCount);
        });
      setStep(4);
    }
  }, [id]);

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
          methods={methods}
        />
      )}
      {step === 2 && (
        <CookItemInput
          setStep={setStep}
          materials={materials}
          setMaterials={setMaterials}
          flavors={flavors}
          setFlavors={setFlavors}
          methods={methods}
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
          favoriteCount={favoriteCount}
        />
      )}
    </StyledCreateRecipes>
  );
};

export default CreateRecipe;

const StyledCreateRecipes = styled.section`
  width: 100%;
  margin: 24px auto;
  @media screen and (max-width: 767px) {
    width: 360px;
  }
`;

const StyledStep = styled.h2`
  width: 1000px;
  margin: 0 auto;
  @media screen and (max-width: 767px) {
    width: 300px;
    font-size: 14px;
    margin-left: 16px;
  }
  span {
    font-size: 22px;
    margin-left: 16px;
    @media screen and (max-width: 767px) {
      width: 300px;
      font-size: 16px;
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
  @media screen and (max-width: 767px) {
    width: 350px;
  }
`;
