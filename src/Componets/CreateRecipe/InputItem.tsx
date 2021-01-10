import React from "react";
import styled from "styled-components";

const InputItem: React.FC = () => {
  return (
    <div>
      <h2>用意する材料と分量</h2>
      <input type="text" placeholder="" />
      <button>追加</button>
      <h2>用意する調味料</h2>
    </div>
  );
};

export default InputItem;

const StyledInputItem = styled.div``;
