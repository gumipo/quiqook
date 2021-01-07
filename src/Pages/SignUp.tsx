import React, { useState } from "react";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import useStringChange from "../hooks/useStringChange";

const SignUp: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState(false);

  const userSignUp = (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      setErr(true);
      return;
    }
  };

  return (
    <StyledSignUp>
      <StyledSignUpTitle>新規登録</StyledSignUpTitle>
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
        <StyledInputArea>
          <span>パスワード</span>
          <input
            type="password"
            value={password}
            onChange={useStringChange(setPassword)}
          />
        </StyledInputArea>
        <StyledInputArea>
          <span>確認パスワード</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={useStringChange(setConfirmPassword)}
          />
        </StyledInputArea>
      </StyledUserInputArea>
      <StyledSignUpButton
        onClick={() => userSignUp(email, password, confirmPassword)}
      >
        登録する
      </StyledSignUpButton>
      <StyledText>
        アカウントをお持ちの方は
        <span onClick={() => history.push("/login")}>こちら</span>
      </StyledText>
    </StyledSignUp>
  );
};

export default SignUp;

const StyledSignUp = styled.section`
  width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const StyledErrText = styled.p`
  color: red;
  font-size: 16px;
`;

const StyledSignUpTitle = styled.h1`
  text-align: left;
  margin: 16px 0 0 8px;
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

const StyledSignUpButton = styled.button`
  font-size: 16px;
  width: 200px;
  margin: 24px auto;
  height: 50px;
  background-color: #42ffdc;
  border-radius: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

const StyledText = styled.p`
  margin-top: 30px;
  span {
    color: blue;
    border-bottom: 2px solid blue;
    cursor: pointer;
  }
`;
