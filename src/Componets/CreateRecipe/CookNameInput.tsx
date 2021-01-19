import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { ImageType, MethodListType } from "./type";
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
  methods: MethodListType[];
}

const CookNameInput: React.FC<PropsType> = ({
  setStep,
  name,
  setName,
  description,
  setDescription,
  image,
  setImage,
  methods,
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

  const validMethods = useMemo(() => {
    return methods.filter((item) => item.method.length !== 0);
  }, []);

  return (
    <StyledWrap>
      <StyledStepOneWap>
        <div>
          <ImageArea image={image} setImage={setImage} />
        </div>
        <StyledInputAreaWrap>
          <StyledDescriptionTitle>料理名</StyledDescriptionTitle>
          <StyledNameInput
            type="text"
            placeholder="例:超簡単チャーハン"
            value={name}
            onChange={useStringChange(setName)}
          />
          <StyledDescriptionTitle>
            キャッチコピーや料理の説明
          </StyledDescriptionTitle>
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
      {validMethods.length > 0 && (
        <StyledConfirmStepButton onClick={() => setStep(4)}>
          確認画面へ
        </StyledConfirmStepButton>
      )}
    </StyledWrap>
  );
};
export default CookNameInput;

const StyledWrap = styled.div`
  @media screen and (max-width: 767px) {
    margin-bottom: 100px;
  }
`;

const StyledNameInput = styled.input`
  width: 100%;
  height: 50px;
  font-size: 18px;
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 30px;
  }
`;

const StyledDescriptionInput = styled.textarea`
  width: 500px;
  font-size: 16px;
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 100px;
    font-size: 16px;
  }
`;

const StyledDescriptionTitle = styled.h3`
  @media screen and (max-width: 767px) {
    margin: 16px 0 0 0;
    font-size: 16px;
  }
`;

const StyledInputAreaWrap = styled.div`
  margin-left: 16px;
  @media screen and (max-width: 767px) {
    margin-left: 28px;
  }
`;

const StyledStepOneWap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    width: 350px;
    margin: 16px auto;
  }
`;

const StyledErrText = styled.p`
  width: 500px;
  margin: 10px auto;
  color: red;
  text-align: center;
  @media screen and (max-width: 767px) {
    width: 300px;
    margin: 0 auto;
    font-size: 15px;
  }
`;

const StyledNextButton = styled.button`
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
