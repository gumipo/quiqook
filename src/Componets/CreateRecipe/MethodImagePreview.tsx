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
          <StyledImagePreview
            alt="プレビュー画像"
            src={path}
            style={{ zIndex: 2 }}
          />
          <StyledDeleteIcon
            onClick={() => deleteImage(id)}
            style={{ zIndex: 3 }}
          >
            <HighlightOffIcon color="error" />
          </StyledDeleteIcon>
        </StyledImageWrapin>
      )}
    </>
  );
};

export default ImagePreview;

const StyledImageWrapin = styled.div`
  width: 300px;
  height: 300px;
  border-style: groove;
`;

const StyledImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
`;

const StyledDeleteIcon = styled(IconButton)`
  width: 40px;
  height: 40px;
  display: block;
  position: absolute;
  top: -100%;
  right: -90%;
`;
