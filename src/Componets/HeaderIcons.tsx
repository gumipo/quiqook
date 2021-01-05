import React, { useMemo } from "react";
import flypan from "../assets/Images/flypan.svg";
import nabe from "../assets/Images/nabe.svg";
import nife from "../assets/Images/nife.svg";
import water from "../assets/Images/water.svg";
import styled from "styled-components";

type Props = {
  isReverce: boolean;
};

const HeaderIcons: React.FC<Props> = ({ isReverce }) => {
  const headerIcons = useMemo(() => {
    const icons = [
      { id: 1, icon: flypan, alt: "flypan" },
      { id: 2, icon: nabe, alt: "nabe" },
      { id: 3, icon: nife, alt: "nife" },
      { id: 4, icon: water, alt: "water" },
    ];

    if (!isReverce) {
      return icons;
    } else {
      return icons.reverse();
    }
  }, [isReverce]);

  return (
    <StyledHeaderIconsList>
      {headerIcons.map((icon) => (
        <img key={icon.id} src={icon.icon} alt={icon.alt} />
      ))}
    </StyledHeaderIconsList>
  );
};

export default HeaderIcons;

const StyledHeaderIconsList = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin: 0 50px;
  img {
    width: 30px;
    height: 30px;
  }
`;
