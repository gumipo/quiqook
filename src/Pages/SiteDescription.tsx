import React from "react";
import styled from "styled-components";
import cook from "../assets/Images/cook.jpg";
import cookMen from "../assets/Images/cook-men.png";
import cookWomen from "../assets/Images/cook-women.png";
import { useHistory } from "react-router-dom";

const SiteDescription: React.FC = () => {
  const history = useHistory();
  return (
    <StyledSiteDescription>
      <SectionTitle>
        <img src={cook} alt="cook" />
        <h1>QuiCook</h1>
      </SectionTitle>
      <StyledDescription>
        <FirstDescriptionText>
          <h3>水だけのレシピを考えよう</h3>
          <p>
            水は何にでも形を変えることができます　
            <br />
            料理をするのにもここでは
            <span>水しか使用できません</span>
          </p>
          <StyledRecipeLinkButton
            onClick={() => history.push("/create/recipe")}
          >
            レシピを書く
          </StyledRecipeLinkButton>
        </FirstDescriptionText>
        <img src={cookMen} alt="cook Men" />
      </StyledDescription>
      <StyledDescription>
        <FirstDescriptionText>
          <h3>レシピを公開しよう</h3>
          <p>
            作ったレシピを公開してみんなに見てもらおう。
            <br />
            見てくれた人からいいね❤️がもらえるかも。
          </p>
          <StyledRecipeLinkButton
            onClick={() => history.push("/create/recipe")}
          >
            レシピを書く
          </StyledRecipeLinkButton>
        </FirstDescriptionText>
        <img src={cookWomen} alt="cook Men" />
      </StyledDescription>
      <StyledSignUpButton onClick={() => history.push("/signup")}>
        今すぐ登録して始める
      </StyledSignUpButton>
    </StyledSiteDescription>
  );
};

export default SiteDescription;

const StyledSiteDescription = styled.section`
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

const SectionTitle = styled.div`
  position: relative;
  img {
    opacity: 1;
    width: 100%;
    height: 600px;
  }
  h1 {
    width: 700px;
    position: absolute;
    color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    font-family: "Amatic SC", cursive;
    font-size: 77px;
    margin: 10px 0 0 0;
    backdrop-filter: sepia(70%) contrast(230%) blur(5px);
    -webkit-backdrop-filter: sepia(70%) contrast(230%) blur(5px);
    ::after {
      content: "〜忙しい人の為のレシピサイト〜";
      font-size: 16px;
      padding-left: 12px;
    }
  }
`;

const StyledDescription = styled.div`
  width: 1000px;
  margin: 40px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #333;
  box-shadow: 30px 30px 0px #333;
  img {
    width: 500px;
    object-fit: cover;
  }
`;

const FirstDescriptionText = styled.div`
  text-align: left;
  h3 {
    margin: 0;
  }
  p {
    margin: 8px 0 0 0;
    span {
      background: linear-gradient(transparent 70%, aqua 70%);
    }
  }
`;

const StyledSignUpButton = styled.button`
  width: 500px;
  height: 50px;
  margin: 20px auto 50px auto;
  background-color: orange;
  border-radius: 10px;
  font-size: 20px;
`;

const StyledRecipeLinkButton = styled.button`
  width: 300px;
  height: 50px;
  margin: 16px 0 0 40px;
  background-color: #42ffdc;
  border-radius: 10px;
  font-size: 16px;
`;
