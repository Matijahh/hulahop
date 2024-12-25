import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { map } from "lodash";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { ACCESS_TOKEN, REST_URL_SERVER } from "../../../utils/constant";
import axios from "axios";

import AddIcon from "@mui/icons-material/Add";
import ModalComponent from "../../../components/ModalComponent";
import ButtonComponent from "../../../components/ButtonComponent";

import { ImageLibraryContainer } from "./styled";
import { FlexBox } from "../../../components/Sections";
import { Col, Row } from "react-bootstrap";
import { ErrorTaster, SuccessTaster } from "../../../components/Toast";
import { Loader } from "../../../components/Loader";

const ImageLibrary = ({ open, handleClose, onPickImage }) => {
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [images, setImages] = useState([]);

  const { t } = useTranslation();

  const getAllAssociateImage = async () => {
    setLoading(true);

    const response = await commonGetQuery("/associate_images");

    setLoading(false);

    if (response) {
      const { data } = response.data;
      setImages(data);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target && e.target.files[0];

    if (file) {
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append("image", file);

    try {
      setButtonLoading(true);

      const response = await axios.post(
        `${REST_URL_SERVER}/images/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        const { data } = response.data;
        createAssociateImages(data.id);
        setButtonLoading(false);
      }
    } catch (error) {
      setButtonLoading(false);

      if (error && error.data) {
        const { message } = error.data;
        return ErrorTaster(t(message));
      }
    }
  };

  const createAssociateImages = async (id) => {
    setButtonLoading(true);

    const response = await commonAddUpdateQuery("/associate_images", {
      image_id: id,
    });

    setButtonLoading(false);

    if (response) {
      const { message } = response.data;
      getAllAssociateImage();
      SuccessTaster(message);
    }
  };

  const handleRemove = async (id) => {
    const response = await commonAddUpdateQuery(
      "/associate_images",
      {
        ids: [id],
      },
      "DELETE"
    );

    if (response) {
      getAllAssociateImage();
      const { message } = response.data;
      SuccessTaster(message);
    }
  };

  useEffect(() => {
    getAllAssociateImage();
  }, []);

  return (
    <ModalComponent open={open} handleClose={handleClose}>
      <ImageLibraryContainer>
        <FlexBox className="mb-2 header">
          <div className="modal-title">{t("A Collection of Files")}</div>
          <FlexBox>
            <ButtonComponent
              variant="contained"
              startIcon={<AddIcon />}
              styled={{ position: "relative" }}
              text={t("Add Photo")}
              type="file"
              handleFileChange={handleFileChange}
              loading={buttonLoading}
            />
          </FlexBox>
        </FlexBox>
        <div className="images-list">
          {loading ? (
            <Loader />
          ) : (
            <Row className="g-4">
              {map(images, (item, key) => (
                <Col md={4} lg={4} sm={6} key={key}>
                  <div className="image-box">
                    <div className="image-cover">
                      <img
                        onClick={() => {
                          onPickImage(
                            `${REST_URL_SERVER}/images/${item.image_id}`
                          );
                        }}
                        src={`${REST_URL_SERVER}/images/${item.image_id}`}
                      />
                    </div>
                    <div className="box-footer">
                      <div className="content">
                        <FlexBox
                          justifyContent={"flex-start"}
                          className="content-list"
                        >
                          <ButtonComponent
                            variant="outlined"
                            onClick={() => handleRemove(item.id)}
                            text={t("Remove")}
                          />
                        </FlexBox>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </ImageLibraryContainer>
    </ModalComponent>
  );
};

export default ImageLibrary;
