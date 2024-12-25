import { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

import { CircularProgress } from "@mui/material";

const BoxFileInputContainer = styled.div`
  border: 2px dashed rgb(241, 103, 109);
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  position: relative;

  .image-cover {
    width: 80px;
    height: 80px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .cancel-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 999;

      svg {
        cursor: pointer;
      }
    }
  }

  svg {
    color: rgb(241, 103, 109);
  }

  .text {
    margin-top: 5px;
    font-size: 12px;
    font-weight: bold;
    color: rgb(241, 103, 109);
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .file-input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;

const BoxFileInput = ({
  onFileSelect,
  previewURL,
  onCancel,
  type,
  loading,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!previewURL) {
      document.getElementById("fileInput").value = "";
    }
  }, [previewURL]);

  return (
    <BoxFileInputContainer>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {previewURL ? (
            <div className="image-cover">
              <img src={previewURL} />
              <div className="cancel-icon" onClick={onCancel}>
                <CloseIcon />
              </div>
            </div>
          ) : (
            <div className="content">
              <AddPhotoAlternateIcon />
              <div className="text">{t("Add Image")}</div>
            </div>
          )}
        </>
      )}

      <input
        type="file"
        className="file-input"
        accept={type}
        onChange={onFileSelect}
        id="fileInput"
      />
    </BoxFileInputContainer>
  );
};

export default BoxFileInput;
