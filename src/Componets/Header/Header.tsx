import React from "react";
import styled from "styled-components";
import HeaderIcons from "./HeaderIcons";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getUserIcon,
  getIsSignedIn,
  getUserName,
} from "../../reducks/Users/selector";
import { signOut } from "../../reducks/Users/oparations";
import chef from "../../assets/Images/chef.png";

const Header: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const icon = getUserIcon(selector);
  const isSignedIn = getIsSignedIn(selector);
  const username = getUserName(selector);

  return (
    <StyledHeader>
      <HeaderIcons isReverce={false} />
      <StyledHeaderTitle onClick={() => history.push("/")}>
        Water Only Cokking
      </StyledHeaderTitle>
      {isSignedIn ? (
        <StyledHeaderNav>
          <UserIcon src={icon ? icon : chef} alt="usericon" />
          <UserName>{username}chef</UserName>
          <li onClick={() => dispatch(signOut())}>ログアウト</li>
        </StyledHeaderNav>
      ) : (
        <StyledHeaderNav>
          <li onClick={() => history.push("/signup")}>新規登録</li>
          <li onClick={() => history.push("/login")}>ログイン</li>
        </StyledHeaderNav>
      )}

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

const UserIcon = styled.img`
  width: 42px;
  height: 42px;
`;

const UserName = styled.p`
  width: 80px;
  font-size: 12px;
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
