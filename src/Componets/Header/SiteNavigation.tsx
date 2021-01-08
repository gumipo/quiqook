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
      label: "water only cookkingとは",
      value: "/site/description",
    },
  ];

  return (
    <StyledNavigation>
      <StyledMenuList>
        {navMenus.map((menu) => (
          <li key={menu.id} onClick={() => history.push(menu.value)}>
            <menu.icon />
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
  background-color: #90fffa9e;
  box-shadow: 0px 0px 5px 0px #333;
  line-height: 50px;
`;

const StyledMenuList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  li {
    display: flex;
    align-items: center;
    padding: 0 16px;
    span {
      margin-left: 8px;
    }
    :hover {
      background-color: #333;
      color: white;
    }
  }
`;
