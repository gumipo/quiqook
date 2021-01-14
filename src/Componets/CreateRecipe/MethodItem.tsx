import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

interface PropsType {
  description: string;
  time: number;
  index: number;
  deleteMethodDescription: (index: number) => void;
}

const MethodItem: React.FC<PropsType> = ({
  description,
  time,
  index,
  deleteMethodDescription,
}) => {
  return (
    <StyledMethodItem>
      <StyledDescriptionArea>
        <li>{description}</li>
      </StyledDescriptionArea>
      <div>
        <StyledTime>{time}分</StyledTime>
        <StyledIconButton>
          <EditIcon />
        </StyledIconButton>
        <StyledIconButton onClick={() => deleteMethodDescription(index)}>
          <DeleteIcon />
        </StyledIconButton>
      </div>
    </StyledMethodItem>
  );
};

export default MethodItem;

const StyledMethodItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
`;

const StyledDescriptionArea = styled.ul`
  margin: 8px 0;
`;

const StyledIconButton = styled(IconButton)`
  width: 40px;
  height: 40px;
  background: #fff;
`;

const StyledTime = styled.span`
  margin-right: 16px;
`;
