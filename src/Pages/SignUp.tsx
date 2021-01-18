import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import useStringChange from "../hooks/useStringChange";
import { signUp } from "../reducks/Users/oparations";

const SignUp: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState(false);
  const [passwordMatchErr, setpasswordMatchErr] = useState(false);

  const userSignUp = (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      setErr(true);
      return;
    }
    if (password !== confirmPassword) {
      setpasswordMatchErr(true);
    }
    dispatch(signUp(name, email, password));
  };

  useEffect(() => {
    if (!err) {
      return;
    }
    setTimeout(() => {
      setErr(false);
    }, 2000);
  }, [err]);

  return (
    <StyledSignUp>
      <StyledSignUpTitle>新規登録</StyledSignUpTitle>
      <Divider />
      {err && (
        <StyledErrText>
          必須項目を入力の上もう一度お確かめください
        </StyledErrText>
      )}
      {passwordMatchErr && (
        <StyledErrText>
          パスワードが一致していません。
          <br />
          もう一度お確かめください
        </StyledErrText>
      )}
      <StyledUserInputArea>
        <StyledInputArea>
          <span>ニックネーム</span>
          <input
            type="text"
            placeholder="water taro"
            value={name}
            onChange={useStringChange(setName)}
          />
        </StyledInputArea>
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
        onClick={() => userSignUp(name, email, password, confirmPassword)}
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
  @media screen and (max-width: 767px) {
    width: 375px;
    padding-bottom: 100px;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const StyledErrText = styled.p`
  color: red;
  font-size: 16px;
  display: inline-block;
  visibility: ${(err) => (err ? "visible" : "hiden")};
  animation: ${(err) => (err ? fadeOut : "")} 2s linear;
  transition: visibility 2s linear;
`;

const StyledSignUpTitle = styled.h1`
  text-align: left;
  margin: 16px 0 0 8px;
  @media screen and (max-width: 767px) {
    font-size: 24px;
  }
`;

const StyledUserInputArea = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    margin-top: 32px;
  }
`;

const StyledInputArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
  }
  span {
    margin-left: 16px;
    @media screen and (max-width: 767px) {
      margin: 8px 0 0 0;
      text-align: left;
      font-size: 14px;
    }
  }
  input {
    width: 600px;
    height: 50px;
    margin-right: 16px;
    font-size: 18px;
    @media screen and (max-width: 767px) {
      width: 300px;
      height: 30px;
    }
  }
`;

const StyledSignUpButton = styled.button`
  font-size: 16px;
  width: 200px;
  margin: 24px auto;
  height: 50px;
  background-color: hsl(111deg 100% 79%);
  border-radius: 16px;
  outline: none;
  border: none;
  cursor: pointer;
`;

const StyledText = styled.p`
  margin-top: 30px;
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
  span {
    color: blue;
    border-bottom: 2px solid blue;
    cursor: pointer;
  }
`;
