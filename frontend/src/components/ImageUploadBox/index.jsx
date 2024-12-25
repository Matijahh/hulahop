import { useEffect, useState } from "react";
import { getImageUrlById } from "../../utils/commonFunctions";
import { ACCESS_TOKEN, REST_URL_SERVER } from "../../utils/constant";
import { useTranslation } from "react-i18next";
import axios from "axios";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

import { ImageUploadBoxContainer } from "./styled";
import { ErrorTaster } from "../Toast";
import { CircularProgress } from "@mui/material";

const ImageUploadBox = (props) => {
  // eslint-disable-next-line react/prop-types, no-unused-vars
  const {
    accept = "images/*",
    id = "",
    formik,
    onUpload = () => {},
    onDelete = () => {},
    disabled = false,
    name,
  } = props;

  const [loading, setLoading] = useState(false);
  const [imageId, setImageId] = useState(id);

  const { t } = useTranslation();

  const onFileSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    try {
      let formData = new FormData();
      formData.append("image", file);
      setLoading(true);

      const response = await axios.post(
        `${REST_URL_SERVER}/images/upload-compressed`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      setLoading(false);

      if (response.status === 200) {
        const { data } = response.data;

        if (formik) {
          formik.setFieldValue(name, data.id);
        }

        onUpload(data.id);
        setImageId(data.id);
      }
    } catch (error) {
      setLoading(false);

      if (error && error.data) {
        const { message } = error.data;
        return ErrorTaster(t(message));
      }
    }
  };

  const onCancel = () => {
    setImageId(null);

    if (formik) {
      formik.setFieldValue(name, null);
    }

    onDelete();
  };

  useEffect(() => {
    if (id) {
      setImageId(id);
    } else {
      setImageId(null);
    }
  }, [id]);

  return (
    <ImageUploadBoxContainer>
      <div className="image-upload-box">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {imageId || id ? (
              <div className="image-cover">
                <img src={getImageUrlById(imageId || id)} />
                <div
                  className="cancel-icon"
                  onClick={disabled ? () => {} : onCancel}
                >
                  <CloseIcon />
                </div>
              </div>
            ) : (
              <div className="content">
                <AddPhotoAlternateIcon />
                <div className="text">{t("Add Image")}</div>
              </div>
            )}
            <input
              type="file"
              className="file-input"
              accept={accept}
              onChange={onFileSelect}
              id="fileInput"
              disabled={disabled}
            />
          </>
        )}
      </div>
    </ImageUploadBoxContainer>
  );
};

export default ImageUploadBox;
