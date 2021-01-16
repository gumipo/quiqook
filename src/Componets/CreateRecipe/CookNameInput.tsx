import React, { useState } from "react";
import styled from "styled-components";
import { ImageType } from "./type";
import ImageArea from "./ImageArea";
import useStringChange from "../../hooks/useStringChange";

interface PropsType {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  image: ImageType;
  setImage: React.Dispatch<React.SetStateAction<ImageType>>;
}

const CookNameInput: React.FC<PropsType> = ({
  setStep,
  name,
  setName,
  description,
  setDescription,
  image,
  setImage,
}) => {
  const [err, setErr] = useState(false);

  const nextStep = () => {
    if (name.length < 1 || description.length < 1) {
      setErr(true);
      return;
    } else {
      setStep(2);
    }
  };

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
            placeholder="500円でできる忙しい人のための5分でできる爆速料理"
            value={description}
            onChange={useStringChange(setDescription)}
            rows={8}
          />
        </StyledInputAreaWrap>
      </StyledStepOneWap>
      {err && (
        <StyledErrText>料理名またはキャッチコピーが見入力です</StyledErrText>
      )}
      <StyledNextButton onClick={() => nextStep()}>
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
  background-color: beige;
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

const StyledErrText = styled.p`
  width: 500px;
  margin: 10px auto;
  color: red;
  text-align: center;
`;
