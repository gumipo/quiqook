import React, { useRef, useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { MaterialType, FlavorType, MethodListType } from "./type";
import CookItemTable from "./CookItemITable";

interface PropsType {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  materials: MaterialType[];
  setMaterials: React.Dispatch<React.SetStateAction<MaterialType[]>>;
  flavors: FlavorType[];
  setFlavors: React.Dispatch<React.SetStateAction<FlavorType[]>>;
  methods: MethodListType[];
}

const CookItemInput: React.FC<PropsType> = ({
  setStep,
  materials,
  setMaterials,
  flavors,
  setFlavors,
  methods,
}) => {
  const [err, setErr] = useState(false);
  const [materialsIndex, setMaterialsIndex] = useState(0);
  const [flavorsIndex, setFlavorsIndex] = useState(0);
  const inputMaterialEl = useRef<HTMLInputElement>(null);
  const inputMaterialAmountEl = useRef<HTMLInputElement>(null);
  const inputFlavorEl = useRef<HTMLInputElement>(null);
  const inputFlavorAmountEl = useRef<HTMLInputElement>(null);

  const addMaterial = (
    materialsIndex: number,
    material: string,
    amount: string
  ) => {
    if (material.length === 0 || amount.length === 0) {
      return;
    }
    if (materialsIndex === materials.length) {
      setMaterials((prevState: MaterialType[]) => [
        ...prevState,
        { name: material, amount: amount },
      ]);
      setMaterialsIndex(materialsIndex + 1);
      inputMaterialEl.current!.value = "";
      inputMaterialAmountEl.current!.value = "";
    } else {
      const newMaterials = materials;
      newMaterials[materialsIndex] = { name: material, amount: amount };
      setMaterials(newMaterials);
      setMaterialsIndex(newMaterials.length);
      inputMaterialEl.current!.value = "";
      inputMaterialAmountEl.current!.value = "";
    }
  };

  const addFlavor = (flavorsIndex: number, flavor: string, amount: string) => {
    if (flavor.length === 0 || amount.length === 0) {
      return;
    }
    if (flavorsIndex === flavors.length) {
      setFlavors((prevState: FlavorType[]) => [
        ...prevState,
        { name: flavor, amount: amount },
      ]);
      setFlavorsIndex(flavorsIndex + 1);
      inputFlavorEl.current!.value = "";
      inputFlavorAmountEl.current!.value = "";
    } else {
      const newFlavors = flavors;
      newFlavors[flavorsIndex] = { name: flavor, amount: amount };
      setFlavors(newFlavors);
      setFlavorsIndex(newFlavors.length);
      inputFlavorEl.current!.value = "";
      inputFlavorAmountEl.current!.value = "";
    }
  };

  const deleteItem = (former: boolean, index: number) => {
    if (former) {
      const newValues = materials.filter((item, i) => i !== index);
      setMaterials(newValues);
    }
    if (!former) {
      const newValues = flavors.filter((item, i) => i !== index);
      setFlavors(newValues);
    }
  };

  const editItem = (
    former: boolean,
    index: number,
    name: string,
    amount: string
  ) => {
    if (former) {
      setMaterialsIndex(index);
      inputMaterialEl.current!.value = name;
      inputMaterialAmountEl.current!.value = amount;
    }
    if (!former) {
      setFlavorsIndex(index);
      inputFlavorEl.current!.value = name;
      inputFlavorAmountEl.current!.value = amount;
    }
  };

  useEffect(() => {
    setMaterialsIndex(materials.length);
  }, [materials.length]);

  useEffect(() => {
    setFlavorsIndex(flavors.length);
  }, [flavors.length]);

  const nextStep = () => {
    if (materials.length > 0 && flavors.length > 0) {
      setStep(3);
    } else {
      setErr(true);
    }
  };

  const validMethods = useMemo(() => {
    return methods.filter((item) => item.method.length !== 0);
  }, []);

  return (
    <StyledWrap>
      <StyledInputItem>
        <StyledItemListArea>
          <StyledItemTitle>材料</StyledItemTitle>
          <StyledNameInput
            type="text"
            placeholder="札幌ラーメン"
            ref={inputMaterialEl}
          />
          <StyledAmountInput
            type="text"
            placeholder="例:１袋"
            ref={inputMaterialAmountEl}
          />
          <StyledItemAddButton
            onClick={() =>
              addMaterial(
                materialsIndex,
                inputMaterialEl.current!.value,
                inputMaterialAmountEl.current!.value
              )
            }
          >
            追加
          </StyledItemAddButton>
          <CookItemTable
            values={materials}
            former={true}
            deleteItem={deleteItem}
            editItem={editItem}
          />
        </StyledItemListArea>
        <StyledItemListArea>
          <StyledItemTitle>調味料</StyledItemTitle>
          <StyledNameInput
            type="text"
            placeholder="例:醤油"
            ref={inputFlavorEl}
          />
          <StyledAmountInput
            type="text"
            placeholder="例:大さじ1"
            ref={inputFlavorAmountEl}
          />
          <StyledItemAddButton
            onClick={() =>
              addFlavor(
                flavorsIndex,
                inputFlavorEl.current!.value,
                inputFlavorAmountEl.current!.value
              )
            }
          >
            追加
          </StyledItemAddButton>
          <CookItemTable
            values={flavors}
            former={false}
            deleteItem={deleteItem}
            editItem={editItem}
          />
        </StyledItemListArea>
      </StyledInputItem>
      {err && <StyledErrText>材料または調味料が見入力です</StyledErrText>}
      <StyledNextStepButton onClick={() => nextStep()}>
        工程入力に進む
      </StyledNextStepButton>
      {validMethods.length > 0 && (
        <StyledConfirmStepButton onClick={() => setStep(4)}>
          確認画面へ
        </StyledConfirmStepButton>
      )}
    </StyledWrap>
  );
};

export default CookItemInput;

const StyledWrap = styled.div`
  @media screen and (max-width: 767px) {
    margin-bottom: 100px;
    width: 350px;
  }
`;

const StyledInputItem = styled.div`
  width: 1100px;
  margin: 16px auto;
  display: flex;
  justify-content: space-around;
  @media screen and (max-width: 767px) {
    width: 350px;
    flex-direction: column;
  }
`;

const StyledItemListArea = styled.div`
  width: 500px;
  margin-left: 5px;
  @media screen and (max-width: 767px) {
    width: 350px;
  }
`;

const StyledItemTitle = styled.h3`
  font-size: 24px;
  margin: 0;
  @media screen and (max-width: 767px) {
    font-size: 16px;
    margin: 16px 0 0 0;
  }
`;

const StyledNameInput = styled.input`
  width: 300px;
  height: 40px;
  margin-bottom: 16px;
  margin-right: 8px;
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 30px;
    margin-bottom: 8px;
  }
`;

const StyledAmountInput = styled.input`
  width: 100px;
  height: 40px;
  margin-right: 8px;
  @media screen and (max-width: 767px) {
    width: 100px;
    height: 30px;
    margin-bottom: 8px;
  }
`;

const StyledItemAddButton = styled.button`
  width: 80px;
  height: 40px;
  background-color: #e0f3bc;
  color: #333;
  @media screen and (max-width: 767px) {
    width: 100px;
    height: 30px;
  }
`;

const StyledNextStepButton = styled.button`
  display: block;
  width: 300px;
  height: 50px;
  background-color: beige;
  margin: 10px auto;
  @media screen and (max-width: 767px) {
    width: 200px;
    height: 30px;
  }
`;

const StyledErrText = styled.p`
  width: 500px;
  margin: 10px auto 0 auto;
  color: red;
  text-align: center;
  font-size: 14px;
  @media screen and (max-width: 767px) {
    width: 300px;
  }
`;

const StyledConfirmStepButton = styled.button`
  display: block;
  width: 300px;
  height: 50px;
  background-color: beige;
  outline: none;
  margin: 10px auto;
  @media screen and (max-width: 767px) {
    width: 200px;
    height: 30px;
  }
`;
