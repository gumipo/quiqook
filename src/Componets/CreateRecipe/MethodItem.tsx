import React, { useState, useRef } from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

interface PropsType {
  description: string | null;
  time: number | null;
  index: number;
  deleteMethodDescription: (index: number) => void;
  editDescription: (
    editIndex: number,
    description: string,
    time: string
  ) => void;
}

const MethodItem: React.FC<PropsType> = ({
  description,
  time,
  index,
  deleteMethodDescription,
  editDescription,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const inputDescriptionEl = useRef<HTMLInputElement>(null);
  const inputTimeEl = useRef<HTMLInputElement>(null);

  return (
    <StyledMethodItem>
      {!isEdit ? (
        <StyledDescriptionArea>
          <li>{description}</li>
        </StyledDescriptionArea>
      ) : (
        <StyledEditDescription
          type="text"
          defaultValue={description!}
          ref={inputDescriptionEl}
        />
      )}
      <StyledTimeWrap>
        {!isEdit ? (
          time !== 0 && <StyledTime>{time}分</StyledTime>
        ) : (
          <>
            <StyledEditTime
              type="number"
              step="1"
              min="0"
              max="10"
              placeholder="分"
              defaultValue={time!}
              ref={inputTimeEl}
            />
            <StyledUnenteredText>分</StyledUnenteredText>
          </>
        )}
        {!isEdit ? (
          <>
            <StyledIconButton onClick={() => setIsEdit(true)}>
              <EditIcon />
            </StyledIconButton>
            <StyledIconButton onClick={() => deleteMethodDescription(index)}>
              <DeleteIcon />
            </StyledIconButton>
          </>
        ) : (
          <StyledEditButton
            onClick={() => {
              editDescription(
                index,
                inputDescriptionEl.current!.value,
                inputTimeEl.current!.value
              );
              setIsEdit(false);
            }}
          >
            変更
          </StyledEditButton>
        )}
      </StyledTimeWrap>
    </StyledMethodItem>
  );
};

export default MethodItem;

const StyledMethodItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  @media screen and (max-width: 767px) {
    width: 333px;
  }
`;

const StyledDescriptionArea = styled.ul`
  margin: 8px 0;
`;

const StyledIconButton = styled(IconButton)`
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  background: #fff;
`;

const StyledTime = styled.span`
  margin-right: 16px;
  place-items: center;
  font-size: 14px;
`;

const StyledTimeWrap = styled.div`
  display: flex;
  align-items: center;
`;

const StyledEditDescription = styled.input`
  display: block;
  width: 300px;
  height: 30px;
  margin-right: 8px;
`;

const StyledEditTime = styled.input`
  display: block;
  width: 40px;
  height: 30px;
  margin-right: 8px;
  @media screen and (max-width: 767px) {
    width: 40px;
  }
`;

const StyledUnenteredText = styled.span`
  font-size: 12px;
  color: "333";
  margin-right: 8px;
  @media screen and (max-width: 767px) {
    font-size: 10px;
  }
`;

const StyledEditButton = styled.button`
  font-size: 10px;
  color: white;
  background: #333;
  @media screen and (max-width: 767px) {
    width: 60px;
    height: 30px;
  }
`;
