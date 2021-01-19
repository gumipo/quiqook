import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CreateIcon from "@material-ui/icons/Create";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import HomeIcon from "@material-ui/icons/Home";

const SiteNavigation: React.FC = () => {
  const history = useHistory();

  const navMenus = [
    {
      id: "home",
      icon: HomeIcon,
      label: "ホーム",
      value: "/",
    },
    {
      id: "allRecipe",
      icon: RestaurantIcon,
      label: "みんなのレシピ",
      value: "/all/recipe",
    },
    {
      id: "myRecipe",
      icon: EventNoteIcon,
      label: "マイレシピ",
      value: "/my/recipe",
    },
    {
      id: "writeRecipe",
      icon: CreateIcon,
      label: "レシピを書く",
      value: "/create/recipe",
    },
    {
      id: "siteDescription",
      icon: HelpOutlineIcon,
      label: "QuiCookとは",
      value: "/site/description",
    },
  ];

  return (
    <StyledNavigation>
      <StyledMenuList>
        {navMenus.map((menu) => (
          <li key={menu.id} onClick={() => history.push(menu.value)}>
            <menu.icon className="menu__icon" />
            <span>{menu.label}</span>
          </li>
        ))}
      </StyledMenuList>
    </StyledNavigation>
  );
};

export default SiteNavigation;

const StyledNavigation = styled.nav`
  width: 100%;
  height: 50px;
  background-color: #005500;
  box-shadow: 0px 0px 5px 0px #333;
  line-height: 50px;
  @media screen and (max-width: 767px) {
    height: 50px;
    position: fixed;
    bottom: 0;
    line-height: 20px;
    z-index: 2;
  }
`;

const StyledMenuList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  color: white;
  font-size: 10px;
  width: 100%;
  li {
    display: flex;
    align-items: center;
    padding: 0 16px;
    @media screen and (max-width: 767px) {
      flex-direction: column;
      padding: 5px 10px;
    }
    span {
      margin-left: 8px;
      font-size: 16px;
      @media screen and (max-width: 767px) {
        margin: 0;
        font-size: 10px;
      }
    }
    :nth-child(5) {
      font-family: "Amatic SC", cursive;
    }
    :hover {
      background-color: #333;
      color: white;
      @media screen and (max-width: 767px) {
        background-color: green;
      }
    }
  }
`;
