import React, { useState } from "react";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import useStringChange from "../hooks/useStringChange";

const ResetPassword: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(false);

  const userResetPasword = (email: string) => {
    if (email.length === 0) {
      setErr(true);
      return;
    }
  };

  return (
    <StyledResetPassword>
      <StyledResetTitle>パスワードのリセット</StyledResetTitle>
      <Divider />
      {err && (
        <StyledErrText>
          必須項目を入力の上もう一度お確かめください
        </StyledErrText>
      )}
      <StyledUserInputArea>
        <StyledInputArea>
          <span>メールアドレス</span>
          <input
            type="email"
            placeholder="example@xyz.com"
            value={email}
            onChange={useStringChange(setEmail)}
          />
        </StyledInputArea>
      </StyledUserInputArea>
      <StyledResetButton onClick={() => userResetPasword(email)}>
        パスワードリセット
      </StyledResetButton>
      <StyledText>
        新規登録の方は
        <span onClick={() => history.push("/signup")}>こちら</span>
      </StyledText>
      <StyledText>
        アカウントをお持ちの方は
        <span onClick={() => history.push("/login")}>こちら</span>
      </StyledText>
    </StyledResetPassword>
  );
};

export default ResetPassword;

const StyledResetPassword = styled.section`
  width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const StyledResetTitle = styled.h1`
  text-align: left;
  margin: 16px 0 0 8px;
`;

const StyledErrText = styled.p`
  color: red;
  font-size: 16px;
`;

const StyledUserInputArea = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`;

const StyledInputArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  span {
    margin-left: 16px;
  }
  input {
    width: 600px;
    height: 50px;
    margin-right: 16px;
    font-size: 18px;
  }
`;

const StyledResetButton = styled.button`
  font-size: 16px;
  width: 200px;
  margin: 24px auto;
  height: 50px;
  background-color: #42ffdc;
  border-radius: 16px;
  outline: none;
  border: none;
  cursor: pointer;
`;

const StyledText = styled.p`
  margin-top: 30px;
  span {
    color: blue;
    border-bottom: 2px solid blue;
    cursor: pointer;
  }
`;
