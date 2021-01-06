import React from "react";
import styled from "styled-components";
import HeaderIcons from "./HeaderIcons";
import { useHistory } from "react-router-dom";

const Header: React.FC = () => {
  const history = useHistory();

  return (
    <StyledHeader>
      <HeaderIcons isReverce={false} />
      <StyledHeaderTitle onClick={() => history.push("/")}>
        Water Only Cokking
      </StyledHeaderTitle>
      <StyledHeaderNav>
        <li onClick={() => history.push("/signin")}>新規登録</li>
        <li onClick={() => history.push("/login")}>ログイン</li>
      </StyledHeaderNav>
      <HeaderIcons isReverce={true} />
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledHeaderTitle = styled.h1`
  margin: 0;
  font-family: "Amatic SC", cursive;
  color: black;
  margin-left: 16px;
  font-size: 45px;
  color: #333;
  cursor: pointer;
`;

const StyledHeaderNav = styled.ul`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
  li {
    list-style: none;
    text-decoration: none;
    margin: 0 16px;
    cursor: pointer;
    :hover {
      color: aqua;
    }
  }
`;
