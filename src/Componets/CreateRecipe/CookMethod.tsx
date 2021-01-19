import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MethodImageArea from "./MethodImageArea";
import { ImageType, MethodListType, MethodType } from "./type";
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
  method,
  methods,
  setMethods,
  index,
  deleteMethodInputArea,
  addMethodInputArea,
}) => {
  const inputDescriptionEl = useRef<HTMLInputElement>(null);
  const inputTimeEl = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<ImageType>({ id: "", path: "" });
  const [err, setErr] = useState(false);

  const addMethodDeacription = (
    index: number,
    description: string,
    time: string
  ) => {
    if (description.length > 1) {
      const numberTime = Number(time);
      const newMethods = methods;
      newMethods[index].method = [
        ...newMethods[index].method,
        { description: description, time: numberTime },
      ];
      setMethods([...newMethods]);
      inputDescriptionEl.current!.value = "";
      inputTimeEl!.current!.value = "";
    }
  };

  const deleteMethoddescription = (deleteIndex: number) => {
    const newMethod = method.method.filter((item, i) => i !== deleteIndex);
    const newMethods = methods;
    newMethods[index].method = newMethod;
    setMethods([...newMethods]);
  };

  const editDescription = (
    editIndex: number,
    description: string,
    time: string
  ) => {
    if (description.length !== 0) {
      const numberTime = Number(time);
      const newMethod = method;
      newMethod.method[editIndex] = {
        description: description,
        time: numberTime,
      };
      setMethods([...methods]);
    }
  };

  const nextStep = () => {
    const validConfirm = methods.filter((item) => item.method.length === 0);
    if (validConfirm.length > 0) {
      const res = true;

      if (res) {
        const validMethods = methods.filter((item) => item.method.length !== 0);
        if (validMethods.length === 0) {
          setErr(true);
          return;
        }
        setMethods([...validMethods]);
        if (methods.length > 0) {
          setStep(4);
        }
      }
    } else {
      setStep(4);
    }
  };

  useEffect(() => {
    const newMethods = methods;
    newMethods[index].image = image;
    setMethods([...newMethods]);
  }, [image]);

  return (
    <StyledWrap>
      <StyledCookMethod>
        <MethodImageArea method={method} image={image} setImage={setImage} />
        <StyledMethodInputArea>
          <h3>調理内容と調理時間</h3>
          <div>
            <StyledDescriptionInput
              type="text"
              placeholder="例:油をひき〇〇を強火で炒める"
              ref={inputDescriptionEl}
            />
            <StyledTimeInput
              type="number"
              step="1"
              min="0"
              max="10"
              placeholder="分"
              ref={inputTimeEl}
            />
            <StyledUnit>分</StyledUnit>
            <StyledAddButton
              onClick={() =>
                addMethodDeacription(
                  index,
                  inputDescriptionEl.current!.value,
                  inputTimeEl.current!.value
                )
              }
            >
              追加
            </StyledAddButton>
          </div>
          {method.method.length > 0 ? (
            method.method.map((list, index) => (
              <MethodItem
                key={index}
                index={index}
                description={list.description}
                time={list.time}
                deleteMethodDescription={deleteMethoddescription}
                editDescription={editDescription}
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
        <div>
          {err && <StyledErrText>調理内容が見入力です</StyledErrText>}
          <NextStepButton
            onClick={() => {
              nextStep();
            }}
          >
            確認画面へ
          </NextStepButton>
        </div>
      )}
    </StyledWrap>
  );
};

export default CookMethod;

const StyledWrap = styled.div``;

const StyledCookMethod = styled.div`
  width: 800px;
  margin: 24px auto;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 767px) {
    width: 360px;
    flex-direction: column;
  }
`;

const StyledMethodInputArea = styled.div`
  margin-left: 16px;
  margin-top: 16px;
  h3 {
    font-size: 16px;
    margin: 0;
    @media screen and (max-width: 767px) {
      font-size: 14px;
    }
  }
`;

const StyledDescriptionInput = styled.input`
  width: 300px;
  margin: 0 8px 0 0;
  height: 30px;
  @media screen and (max-width: 767px) {
    width: 200px;
  }
`;

const StyledTimeInput = styled.input`
  width: 40px;
  margin: 0 8px 0 0;
  height: 30px;
`;

const StyledUnit = styled.span`
  font-size: 10px;
  margin-right: 8px;
`;

const StyledAddButton = styled.button`
  background-color: #e0f3bc;
  width: 60px;
  @media screen and (max-width: 767px) {
    width: 60px;
    height: 30px;
    font-size: 12px;
  }
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
  background-color: #e0f3bc;
`;

const StyledDeleteInputAreaButton = styled.button`
  color: white;
  background-color: #ff0000;
`;

const NextStepButton = styled.button`
  display: block;
  width: 300px;
  height: 50px;
  margin: 0 auto;
  background-color: beige;
  @media screen and (max-width: 767px) {
    width: 200px;
    height: 30px;

    margin-bottom: 100px;
  }
`;

const StyledUnenteredText = styled.span`
  font-size: 12px;
  color: "333";
`;

const StyledErrText = styled.span`
  display: block;
  width: 500px;
  color: red;
  font-size: 16px;
  margin: 8px auto;
  text-align: center;
`;
