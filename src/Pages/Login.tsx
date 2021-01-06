import React from "react";
import styled from "styled-components";

const Login: React.FC = () => {
  return (
    <StyledLogin>
      <StyledLoginTitle>ログイン</StyledLoginTitle>
      <StyledUserInputArea>
        <input type="email" placeholder="メールアドレス" />
        <input type="password" placeholder="パスワード" />
      </StyledUserInputArea>
      <button>ログイン</button>
      <button>Google Login</button>
      <button>Twitter Login</button>
      <p>
        アカウント登録がまだの方は<span>こちら</span>
      </p>
      <p>パスワードをお忘れの方</p>
    </StyledLogin>
  );
};

export default Login;

const StyledLogin = styled.section`
  width: 800px;
  margin: 0 auto;
`;

const StyledLoginTitle = styled.h1``;

const StyledUserInputArea = styled.div``;
