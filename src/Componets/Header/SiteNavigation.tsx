import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CreateIcon from "@material-ui/icons/Create";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import RestaurantIcon from "@material-ui/icons/Restaurant";

const SiteNavigation: React.FC = () => {
  const history = useHistory();

  const navMenus = [
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
            {menu.label}
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
  background-color: #06fcf19e;
  box-shadow: 0px 0px 5px 0px #333;
  margin-top: 80px;
  line-height: 50px;
`;

const StyledMenuList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  li {
    padding: 0 16px;
    :hover {
      background-color: #333;
      color: white;
    }
  }
`;
