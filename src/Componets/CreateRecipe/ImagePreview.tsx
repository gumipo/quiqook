import React from "react";
import { ImageType } from "./type";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

interface PropsType {
  deleteImage: (id: string) => Promise<ImageType | boolean>;
  id: string;
  path: string;
}

const ImagePreview: React.FC<PropsType> = ({ id, deleteImage, path }) => {
  return (
    <>
      {path.length > 0 && (
        <StyledImageWrapin>
          <StyledImagePreview alt="プレビュー画像" src={path} />
          <StyledDeleteIcon
            onClick={() => deleteImage(id)}
            style={{ zIndex: 2 }}
          >
            <HighlightOffIcon color="error" style={{ zIndex: 3 }} />
          </StyledDeleteIcon>
        </StyledImageWrapin>
      )}
    </>
  );
};

export default ImagePreview;

const StyledImageWrapin = styled.div`
  width: 400px;
  height: 400px;
  border-style: groove;
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }
`;

const StyledImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
`;

const StyledDeleteIcon = styled(IconButton)`
  width: 50px;
  height: 50px;
  display: block;
  position: absolute;
  top: -100%;
  right: -90%;
  @media screen and (max-width: 767px) {
    right: -85%;
  }
`;
