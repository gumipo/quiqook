import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import useStringChange from "../hooks/useStringChange";
import { resetPassword } from "../reducks/Users/oparations";

const ResetPassword: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(false);

  const userResetPasword = (email: string) => {
    if (email.length === 0) {
      setErr(true);
      return;
    }
    dispatch(resetPassword(email));
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
  @media screen and (max-width: 767px) {
    width: 375px;
  }
`;

const StyledResetTitle = styled.h1`
  text-align: left;
  margin: 16px 0 0 8px;
  @media screen and (max-width: 767px) {
    font-size: 24px;
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
  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    margin: 32px auto;
  }
  span {
    margin-left: 16px;
    @media screen and (max-width: 767px) {
      margin: 0;
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

const StyledResetButton = styled.button`
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
