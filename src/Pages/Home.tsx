import React from "react";
import { PopularRecipe } from "../Componets";
import styled from "styled-components";

const Home: React.FC = () => {
  return (
    <StyledSection>
      <PopularRecipe />
    </StyledSection>
  );
};
export default Home;

const StyledSection = styled.section`
  margin: 0 auto;
`;
