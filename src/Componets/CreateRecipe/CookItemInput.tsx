import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { MaterialType, FlavorType } from "./type";
import CookItemTable from "./CookItemITable";

interface PropsType {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  materials: MaterialType[];
  setMaterials: React.Dispatch<React.SetStateAction<MaterialType[]>>;
  flavors: FlavorType[];
  setFlavors: React.Dispatch<React.SetStateAction<FlavorType[]>>;
}

const CookItemInput: React.FC<PropsType> = ({
  setStep,
  materials,
  setMaterials,
  flavors,
  setFlavors,
}) => {
  const inputMaterialEl = useRef<HTMLInputElement>(null);
  const inputMaterialAmountEl = useRef<HTMLInputElement>(null);
  const inputFlavorEl = useRef<HTMLInputElement>(null);
  const inputFlavorAmountEl = useRef<HTMLInputElement>(null);

  const addMaterial = (material: string, amount: string) => {
    if (material.length === 0 || amount.length === 0) {
      return;
    }
    setMaterials((prevState: MaterialType[]) => [
      ...prevState,
      { name: material, amount: amount },
    ]);
    inputMaterialEl.current!.value = "";
    inputMaterialAmountEl.current!.value = "";
  };

  const addFlavor = (flavor: string, amount: string) => {
    if (flavor.length === 0 || amount.length === 0) {
      return;
    }
    setFlavors((prevState: FlavorType[]) => [
      ...prevState,
      { name: flavor, amount: amount },
    ]);
    inputFlavorEl.current!.value = "";
    inputFlavorAmountEl.current!.value = "";
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

  return (
    <>
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
          />
        </StyledItemListArea>
      </StyledInputItem>
      <StyledNextStepButton>工程入力に進む</StyledNextStepButton>
    </>
  );
};

export default CookItemInput;

const StyledInputItem = styled.div`
  width: 1100px;
  margin: 16px auto;
  display: flex;
  justify-content: space-around;
`;

const StyledItemListArea = styled.div`
  width: 500px;
`;

const StyledItemTitle = styled.h3`
  font-size: 24px;
  margin: 0;
`;

const StyledNameInput = styled.input`
  width: 300px;
  height: 40px;
  margin-bottom: 16px;
  margin-right: 8px;
`;

const StyledAmountInput = styled.input`
  width: 100px;
  height: 40px;
  margin-right: 8px;
`;

const StyledItemAddButton = styled.button`
  width: 80px;
  height: 40px;
  background-color: #45d645;
`;

const StyledNextStepButton = styled.button`
  display: block;
  width: 300px;
  height: 50px;
  background-color: orange;
  margin: 10px auto;
`;
