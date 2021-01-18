import React, { useEffect } from "react";
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
import { listenAuthState, signOut } from "../../reducks/Users/oparations";
import chef from "../../assets/Images/chef.png";

const Header: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const icon = getUserIcon(selector);
  const isSignedIn = getIsSignedIn(selector);
  const username = getUserName(selector);

  useEffect(() => {
    dispatch(listenAuthState());
  }, []);

  return (
    <StyledHeader>
      <HeaderIcons isReverce={false} />
      <StyledHeaderTitle onClick={() => history.push("/")}>
        QuiCook
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
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 767px) {
    height: 60px;
    box-shadow: 0px 3px 6px black;
  }
`;

const StyledHeaderTitle = styled.h1`
  margin: 0;
  font-family: "Amatic SC", cursive;
  color: black;
  margin-left: 48px;
  font-size: 45px;
  color: #333;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    width: 100px;
    margin-left: 32px;
    font-size: 32px;
  }
`;

const UserIcon = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 21px;
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
  @media screen and (max-width: 767px) {
    width: 200px;
    font-size: 12px;
  }
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
