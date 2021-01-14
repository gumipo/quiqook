import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MethodImageArea from "./MethodImageArea";
import { ImageType, MethodListType, MethodType } from "./type";
import useStringChange from "../../hooks/useStringChange";
import useNumberChange from "../../hooks/useNumberChange";
import MethodItem from "./MethodItem";

interface PropsType {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  method: MethodListType;
  methods: MethodListType[];
  setMethods: React.Dispatch<React.SetStateAction<MethodListType[]>>;
  index: number;
  deleteMethodInputArea: (index: number) => void;
  addMethodInputArea: () => void;
}

const CookMethod: React.FC<PropsType> = ({
  setStep,
  methods,
  setMethods,
  index,
  deleteMethodInputArea,
  addMethodInputArea,
}) => {
  const [image, setImage] = useState<ImageType>({ id: "", path: "" });
  const [lists, setLists] = useState<MethodType[]>([]);
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(0);

  const addMethodDeacription = (description: string, time: number) => {
    if (description.length === 0) {
      return;
    }
    setLists((prevState) => [
      ...prevState,
      {
        description: description,
        time: time,
      },
    ]);
    setDescription("");
    setTime(0);
  };

  const deleteMethodDescription = (index: number) => {
    const newLists = lists.filter((item, i) => i !== index);
    setLists(newLists);
  };

  const nextStep = () => {
    if (methods.length < 1) {
      return;
    }
    const validMethods = methods.splice(1, index);
    if (validMethods.length === 0) {
      return;
    }
    setMethods(validMethods);
    setStep(4);
  };

  return (
    <>
      <StyledCookMethod>
        <MethodImageArea image={image} setImage={setImage} />
        <StyledMethodInputArea>
          <h3>調理内容と調理時間</h3>
          <div>
            <input
              type="text"
              placeholder="例:油をひき〇〇を強火で炒める"
              value={description}
              onChange={useStringChange(setDescription)}
            />
            <input
              type="number"
              step="1"
              min="0"
              max="10"
              placeholder="分"
              value={time}
              onChange={useNumberChange(setTime)}
            />
            <StyledUnit>分</StyledUnit>
            <StyledAddButton
              onClick={() => addMethodDeacription(description, time)}
            >
              追加
            </StyledAddButton>
          </div>
          {lists.length > 0 ? (
            lists.map((list, index) => (
              <MethodItem
                key={index}
                index={index}
                description={list.description}
                time={list.time}
                deleteMethodDescription={deleteMethodDescription}
              />
            ))
          ) : (
            <StyledUnenteredText>内容を入力してください</StyledUnenteredText>
          )}
        </StyledMethodInputArea>
      </StyledCookMethod>
      <ButtonArea>
        {methods.length === index + 1 && (
          <StyledAddInputAreaButton onClick={() => addMethodInputArea()}>
            追加する
          </StyledAddInputAreaButton>
        )}
        {methods.length > 1 && (
          <StyledDeleteInputAreaButton
            onClick={() => deleteMethodInputArea(index)}
          >
            削除
          </StyledDeleteInputAreaButton>
        )}
      </ButtonArea>
      {methods.length === index + 1 && (
        <NextStepButton onClick={() => nextStep()}>確認画面へ</NextStepButton>
      )}
    </>
  );
};

export default CookMethod;

const StyledCookMethod = styled.div`
  width: 800px;
  margin: 24px auto;
  display: flex;
  justify-content: center;
`;

const StyledMethodInputArea = styled.div`
  margin-left: 16px;
  h3 {
    font-size: 16px;
    margin: 0;
  }
  input {
    height: 30px;
    :nth-of-type(1) {
      width: 300px;
      margin: 0 8px 0 0;
    }
    :nth-of-type(2) {
      width: 40px;
    }
  }
`;

const StyledUnit = styled.span`
  font-size: 10px;
  margin-right: 8px;
`;

const StyledAddButton = styled.button`
  background-color: #58e458;
  width: 60px;
`;

const ButtonArea = styled.div`
  width: 300px;
  height: 50px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  button {
    width: 100px;
  }
`;

const StyledAddInputAreaButton = styled.button`
  background-color: #41d141;
`;

const StyledDeleteInputAreaButton = styled.button`
  color: white;
  background-color: #b43232;
`;

const NextStepButton = styled.button`
  display: block;
  width: 300px;
  height: 50px;
  margin: 0 auto;
  background-color: #67ff67;
`;

const StyledUnenteredText = styled.span`
  font-size: 12px;
  color: "333";
`;
