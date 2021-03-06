import React, { useCallback } from "react";
import { storage } from "../../Firebase/index";
import MethodImagePreview from "./MethodImagePreview";
import { ImageType, MethodListType } from "./type";
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import styled from "styled-components";

interface PropsType {
  method: MethodListType;
  image: ImageType;
  setImage: React.Dispatch<React.SetStateAction<ImageType>>;
}
const ImageArea: React.FC<PropsType> = ({ method, image, setImage }) => {
  //画像の削除
  const deleteImage = useCallback(
    async (id): Promise<ImageType | boolean> => {
      const ret = window.confirm("この画像を削除しますか");
      if (!ret) {
        return false;
      } else {
        setImage({ id: "", path: "" });
        return storage.ref("images").child(id).delete();
      }
    },
    [image]
  );

  const uploadImage = useCallback(
    (event) => {
      const file = event.target.files;

      let blob = new Blob(file, { type: "image/jpeg" });

      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");

      const uploadRef = storage.ref("images").child(fileName);
      const uploadTask = uploadRef.put(blob);

      uploadTask.then(() => {
        //アップロードできたら
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImage = { id: fileName, path: downloadURL };
          setImage(newImage);
        });
      });
    },
    [setImage]
  );

  return (
    <StyledImageArea>
      <div>
        {method.image.id !== "" ? (
          <MethodImagePreview
            id={method.image.id}
            path={method.image.path}
            key={method.image.id}
            deleteImage={deleteImage}
          />
        ) : (
          <StyledDummyImageArea>
            <div>
              <h4>画像を登録</h4>
              <StyledIconButton>
                <label>
                  <AddPhotoAlternateIcon />
                  <input
                    type="file"
                    id="image"
                    onChange={(event) => uploadImage(event)}
                  />
                </label>
              </StyledIconButton>
            </div>
          </StyledDummyImageArea>
        )}
      </div>
    </StyledImageArea>
  );
};
export default ImageArea;

const StyledImageArea = styled.div``;

const StyledDummyImageArea = styled.div`
  width: 300px;
  height: 300px;
  border-style: groove;
  display: grid;
  place-items: center;
  text-align: center;
  background-color: white;
  background-image: -webkit-gradient(
    linear,
    0 0,
    100% 100%,
    color-stop(0.25, #e0f3bc),
    color-stop(0.25, transparent),
    color-stop(0.5, transparent),
    color-stop(0.5, #e0f3bc),
    color-stop(0.75, #e0f3bc),
    color-stop(0.75, transparent),
    to(transparent)
  );
  background-size: 14px 14px;
  @media screen and (max-width: 767px) {
    width: 250px;
    height: 250px;
    margin: 0 auto;
  }
  h4 {
    margin: 0;
  }
  p {
    margin: 0;
    font-size: 12px;
  }
`;

const StyledIconButton = styled(IconButton)`
  width: 250px;

  label {
    width: 100px;
    display: flex;
    justify-content: center;
  }
`;
