import React from "react";
import { Header } from "../Componets";
import styled from "styled-components";

const Home: React.FC = () => {
  return (
    <StyledSection>
      <Header />
    </StyledSection>
  );
};
export default Home;

const StyledSection = styled.section``;
