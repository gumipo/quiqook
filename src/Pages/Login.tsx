import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import useStringChange from "../hooks/useStringChange";
import { login, googleLogin, twitterLogin } from "../reducks/Users/oparations";

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const userLogin = (email: string, password: string) => {
    if (email.length === 0 || password.length === 0) {
      setErr(true);
      return;
    }
    dispatch(login(email, password));
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
    <StyledLogin>
      <StyledLoginTitle>ログイン</StyledLoginTitle>
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
      </StyledUserInputArea>
      <StyledLoginButton onClick={() => userLogin(email, password)}>
        ログインする
      </StyledLoginButton>
      <StyledSnsLogin>
        <button onClick={() => dispatch(googleLogin())}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Chrome_icon_%28September_2014%29.svg"
            alt="google icon"
          />
          Google with Login
        </button>
        <button onClick={() => dispatch(twitterLogin())}>
          <img
            src="https://upload.wikimedia.org/wikipedia/fr/c/c8/Twitter_Bird.svg"
            alt="twitter cion"
          />
          Twitter with Login
        </button>
      </StyledSnsLogin>
      <StyledText>
        アカウント登録がまだの方は
        <span onClick={() => history.push("/signup")}>こちら</span>
      </StyledText>
      <StyledText>
        パスワードをお忘れの方は
        <span onClick={() => history.push("/reset/password")}>こちら</span>
      </StyledText>
    </StyledLogin>
  );
};

export default Login;

const StyledLogin = styled.section`
  width: 800px;
  margin: 0 auto;
  text-align: center;
  @media screen and (max-width: 767px) {
    width: 375px;
    margin: 0 auto 100px auto;
  }
`;

const StyledLoginTitle = styled.h1`
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
    margin-top: 8px;
  }

  span {
    margin-left: 16px;
    @media screen and (max-width: 767px) {
      width: 300px;
      text-align: left;
      margin-left: 0;
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
      margin: 0 auto;
    }
  }
`;

const StyledLoginButton = styled.button`
  font-size: 16px;
  width: 200px;
  margin: 24px auto;
  height: 50px;
  background-color: hsl(111deg 100% 79%);
  border-radius: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  @media screen and (max-width: 767px) {
  }
`;

const StyledSnsLogin = styled.div`
  width: 600px;
  margin: 16px auto;
  display: flex;
  align-items: center;
  @media screen and (max-width: 767px) {
    width: 375px;
    flex-direction: column;
  }
  button {
    outline: none;
    width: 300px;
    height: 50px;
    margin: 8px 15px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    :nth-child(1) {
      background-color: #fff;
    }
    :nth-child(2) {
      background-color: #00acee;
      color: white;
    }
  }
  img {
    width: 30px;
    height: 30px;
    background-color: white;
    margin-right: 16px;
  }
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
