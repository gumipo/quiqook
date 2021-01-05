import React from "react";
import styled from "styled-components";
import HeaderIcons from "./HeaderIcons";

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <HeaderIcons isReverce={false} />
      <StyledHeaderTitle>Water Only Cokking</StyledHeaderTitle>
      <StyledHeaderNav>
        <li>新規登録</li>
        <li>ログイン</li>
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
  background-color: hsl(185deg 100% 86%);
  box-shadow: 0px 5px 9px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledHeaderTitle = styled.h1`
  margin: 0;
  font-family: "Amatic SC", cursive;
  color: black;
  margin-left: 16px;
  font-size: 40px;
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
  }
`;
