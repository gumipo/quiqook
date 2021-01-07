import React, { useState } from "react";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import useStringChange from "../hooks/useStringChange";

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const userLogin = (email: string, password: string) => {
    if (email.length === 0 || password.length === 0) {
      setErr(true);
      return;
    }
  };

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
        <button>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Chrome_icon_%28September_2014%29.svg"
            alt="google icon"
          />
          Google with Login
        </button>
        <button>
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
`;

const StyledLoginTitle = styled.h1`
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

const StyledLoginButton = styled.button`
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

const StyledSnsLogin = styled.div`
  width: 600px;
  margin: 16px auto;
  display: flex;
  align-items: center;
  button {
    outline: none;
    width: 300px;
    height: 50px;
    margin: 0 15px;
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
  span {
    color: blue;
    border-bottom: 2px solid blue;
    cursor: pointer;
  }
`;
