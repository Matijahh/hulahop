import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { get, map } from "lodash";
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
import { Pagination } from "@mui/material";
import InputComponent from "../../../components/InputComponent";
import { debounce } from "lodash";

const ImageLibrary = ({ open, handleClose, onPickImage }) => {
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [searchVal, setSearchVal] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 3;

  const { t } = useTranslation();

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const getAllAssociateImage = async (page, searchVal) => {
    setLoading(true);

    let URL = `/associate_images?page=${page}&limit=${limit}`;

    if (searchVal) {
      URL += `&image_name=${searchVal}`;
    }
    const response = await commonGetQuery(URL);

    if (response) {
      const { data } = response.data;
      setImages(data.data);
      if(data.totalPages){
        setTotalPages(data.totalPages);
      }
      setLoading(false);
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
      getAllAssociateImage(page, searchVal);
      SuccessTaster(t(message));
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
      getAllAssociateImage(page, searchVal);
      const { message } = response.data;
      SuccessTaster(t(message));
    }
  };

  const onSearchValue = debounce((e) => {
    const value = e.target && e.target.value;
    getAllAssociateImage(page);
    setSearchVal(value);
  }, 300);

  useEffect(() => {
    getAllAssociateImage(page);
  }, [page]);

  return (
    <ModalComponent open={open} handleClose={handleClose}>
      <ImageLibraryContainer>
        <FlexBox className="mb-2 header">
          <div className="modal-title">{t("A Collection of Files")}</div>
          <FlexBox isWrap alignItems={"center"} justifyContent={"center"} className="filters-wrapper">
            <InputComponent
              type="search"
              onChange={onSearchValue}
              label={t("Search Images")}
            />
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
            <>
              <Row className="g-4">
                {map(images, (item, key) => (
                  <Col md={4} lg={4} sm={6} key={key}>
                    <div className="image-box">
                      <div className="image-cover">
                        <img src={`${REST_URL_SERVER}/images/${item.image_id}`} />
                      </div>
                      <div className="box-footer">
                        <div className="content">
                          <FlexBox
                            justifyContent={"center"}
                            className="content-list"
                          >
                            <ButtonComponent
                              variant="outlined"
                              onClick={() => {
                                onPickImage(
                                  `${REST_URL_SERVER}/images/${item.image_id}`
                                );
                              }}
                              text={t("Add")}
                            />
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
              <Row>
                {!loading && (
                  <div className="pagination-container">
                    <Pagination
                      page={page}
                      onChange={handlePageChange}
                      count={totalPages}
                      shape="rounded"
                    />
                  </div>
                )}
              </Row>
            </>
          )}
        </div>
      </ImageLibraryContainer>
    </ModalComponent>
  );
};

export default ImageLibrary;
