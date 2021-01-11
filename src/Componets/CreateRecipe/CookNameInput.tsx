import React from "react";
import styled from "styled-components";
import { ImageType } from "./type";
import ImageArea from "./ImageArea";
import useStringChange from "../../hooks/useStringChange";

interface PropsType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  image: ImageType;
  setImage: React.Dispatch<React.SetStateAction<ImageType>>;
}

const CookNameInput: React.FC<PropsType> = ({
  step,
  setStep,
  name,
  setName,
  description,
  setDescription,
  image,
  setImage,
}) => {
  return (
    <>
      <StyledStepOneWap>
        <div>
          <ImageArea image={image} setImage={setImage} />
        </div>
        <StyledInputAreaWrap>
          <h3>料理名</h3>
          <StyledNameInput
            type="text"
            placeholder="例:超簡単チャーハン"
            value={name}
            onChange={useStringChange(setName)}
          />
          <h3>キャッチコピーや料理の説明</h3>
          <StyledDescriptionInput
            placeholder="忙しい人のための5分でできる爆速料理"
            value={description}
            onChange={useStringChange(setDescription)}
            rows={8}
          />
        </StyledInputAreaWrap>
      </StyledStepOneWap>
      <StyledNextButton onClick={() => setStep(2)}>
        材料入力に進む
      </StyledNextButton>
    </>
  );
};
export default CookNameInput;

const StyledNameInput = styled.input`
  width: 100%;
  height: 50px;
  font-size: 18px;
`;

const StyledNextButton = styled.button`
  display: block;
  width: 300px;
  height: 50px;
  background-color: orange;
  outline: none;
  margin: 24px auto;
`;

const StyledDescriptionInput = styled.textarea`
  width: 500px;
  font-size: 16px;
`;

const StyledInputAreaWrap = styled.div`
  margin-left: 16px;
`;

const StyledStepOneWap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;
