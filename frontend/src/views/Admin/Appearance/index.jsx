import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  renderAboutSliderHeader,
  renderBlogSliderHeader,
  renderShopSliderHeader,
} from "./mock";
import map from "lodash/map";
import {
  ROUTE_ADMIN_APPEARANCE_ABOUT_SLIDER_ADD,
  ROUTE_ADMIN_APPEARANCE_ABOUT_SLIDER_EDIT,
  ROUTE_ADMIN_APPEARANCE_BLOG_SLIDER_ADD,
  ROUTE_ADMIN_APPEARANCE_BLOG_SLIDER_EDIT,
  ROUTE_ADMIN_APPEARANCE_SHOP_SLIDER_ADD,
  ROUTE_ADMIN_APPEARANCE_SHOP_SLIDER_EDIT,
} from "../../../routes/routes";
import { get, size } from "lodash";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { LoaderContainer } from "../../../components/Loader";
import { AppearanceContainer } from "./styled";

import Tables from "../../../components/SuperAdmin/Tables";
import ButtonComponent from "../../../components/ButtonComponent";
import AddIcon from "@mui/icons-material/Add";
import ModalComponent from "../../../components/ModalComponent";

const Appearance = () => {
  const [loading, setLoading] = useState(false);
  const [shopSliderList, setShopSliderList] = useState([]);
  const [aboutSliderList, setAboutSliderList] = useState([]);
  const [blogSliderList, setBlogSliderList] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigation = useNavigate();
  const { t } = useTranslation();

  const getShopSliderList = async () => {
    setLoading(true);

    const response = await commonGetQuery("/shop_slider");

    if (response) {
      const { data } = response.data;
      setShopSliderList(data);
      setLoading(false);
    }

    setLoading(false);
  };

  const getAboutSliderList = async () => {
    setLoading(true);

    const response = await commonGetQuery("/about_page_slider");

    if (response) {
      const { data } = response.data;
      setAboutSliderList(data);
      setLoading(false);
    }

    setLoading(false);
  };

  const getBlogSliderList = async () => {
    setLoading(true);

    const response = await commonGetQuery("/blog_page_slider");

    if (response) {
      const { data } = response.data;
      setBlogSliderList(data);
      setLoading(false);
    }

    setLoading(false);
  };

  const setShopSliderTableRenderData = (data) => {
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      image_id: item.image_id,
      description: get(item, "description", ""),
      id: get(item, "id", ""),
      status: item.status ? t("Active") : t("Inactive"),
      toggleDeleteModal,
      handleEditShopSlider,
    }));
    return renderData;
  };

  const setAboutSliderTableRenderData = (data) => {
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      image_id: item.image_id,
      description: get(item, "description", ""),
      id: get(item, "id", ""),
      status: item.status ? t("Active") : t("Inactive"),
      toggleDeleteModal,
      handleEditAboutSlider,
    }));
    return renderData;
  };

  const setBlogSliderTableRenderData = (data) => {
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      image_id: item.image_id,
      description: get(item, "description", ""),
      id: get(item, "id", ""),
      status: item.status ? t("Active") : t("Inactive"),
      toggleDeleteModal,
      handleEditBlogSlider,
    }));
    return renderData;
  };

  const handleDeleteItem = () => {
    if (selectedItem.handleEditShopSlider) {
      handleDeleteShopSlider();
    }

    if (selectedItem.handleEditAboutSlider) {
      handleDeleteAboutSlider();
    }

    if (selectedItem.handleEditBlogSlider) {
      handleDeleteBlogSlider();
    }
  };

  const handleDeleteBlogSlider = async () => {
    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/blog_page_slider/${selectedItem.id}`,
      null,
      "DELETE"
    );

    if (response) {
      getBlogSliderList();
    }

    toggleDeleteModal();

    setLoading(false);
  };

  const handleEditBlogSlider = async (id) => {
    const route = ROUTE_ADMIN_APPEARANCE_BLOG_SLIDER_EDIT.replace(":id", id);
    navigation(route);
  };

  const handleDeleteShopSlider = async () => {
    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/shop_slider/${selectedItem.id}`,
      null,
      "DELETE"
    );

    if (response) {
      getShopSliderList();
    }

    toggleDeleteModal();

    setLoading(false);
  };

  const handleEditShopSlider = (id) => {
    let route = ROUTE_ADMIN_APPEARANCE_SHOP_SLIDER_EDIT.replace(":id", id);
    navigation(route);
  };

  const handleDeleteAboutSlider = async () => {
    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/about_page_slider/${selectedItem.id}`,
      null,
      "DELETE"
    );

    if (response) {
      getAboutSliderList();
    }

    toggleDeleteModal();

    setLoading(false);
  };

  const handleEditAboutSlider = (id) => {
    let route = ROUTE_ADMIN_APPEARANCE_ABOUT_SLIDER_EDIT.replace(":id", id);
    navigation(route);
  };

  const toggleDeleteModal = (item) => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
    setSelectedItem(item || null);
  };

  useEffect(() => {
    getAboutSliderList();
    getShopSliderList();
    getBlogSliderList();
  }, []);

  return (
    <AppearanceContainer>
      <div className="w-100 mb-4">
        <CommonWhiteBackground>
          <FlexBox className="mb-4 title-wrapper">
            <div className="main-title ">{t("Shop Slider")}</div>
            <FlexBox className="filters-wrapper">
              <ButtonComponent
                variant="contained"
                startIcon={<AddIcon />}
                text={t("Add Slide")}
                onClick={() =>
                  navigation(ROUTE_ADMIN_APPEARANCE_SHOP_SLIDER_ADD)
                }
              />
            </FlexBox>
          </FlexBox>
          <Tables
            className="banner-table"
            body={
              size(shopSliderList) > 0
                ? setShopSliderTableRenderData(shopSliderList)
                : []
            }
            header={renderShopSliderHeader.map((item) => ({
              ...item,
              headerName: t(item.headerName),
            }))}
          />{" "}
        </CommonWhiteBackground>
      </div>

      <div className="w-100 mb-4">
        <CommonWhiteBackground>
          <FlexBox className="mb-4 title-wrapper">
            <div className="main-title ">{t("About Page Slider")}</div>
            <FlexBox className="filters-wrapper">
              <ButtonComponent
                variant="contained"
                startIcon={<AddIcon />}
                text={t("Add Slide")}
                onClick={() =>
                  navigation(ROUTE_ADMIN_APPEARANCE_ABOUT_SLIDER_ADD)
                }
              />
            </FlexBox>
          </FlexBox>
          <Tables
            className="banner-table"
            body={
              size(aboutSliderList) > 0
                ? setAboutSliderTableRenderData(aboutSliderList)
                : []
            }
            header={renderAboutSliderHeader.map((item) => ({
              ...item,
              headerName: t(item.headerName),
            }))}
          />{" "}
        </CommonWhiteBackground>
      </div>

      {loading && <LoaderContainer />}

      <ModalComponent
        title={t("Delete Slider Slide")}
        size={"m"}
        open={isDeleteModalOpen}
        handleClose={toggleDeleteModal}
      >
        <p>
          {`${t("Are you sure you want to delete")} `}
          {`${t("No.").toLowerCase()} `}
          <span className="bold">{selectedItem?.no}</span>
          {`?`}
        </p>
        <>
          <FlexBox hasBorderTop={true} className="pt-3 mt-3">
            <ButtonComponent
              className=""
              variant="outlined"
              fullWidth
              text={t("Cancel")}
              onClick={toggleDeleteModal}
            />
            <ButtonComponent
              variant="contained"
              fullWidth
              text={t("Delete")}
              type="button"
              onClick={handleDeleteItem}
            />
          </FlexBox>
        </>
      </ModalComponent>

      <div className="w-100 mb-4">
        <CommonWhiteBackground>
          <FlexBox className="mb-4 title-wrapper">
            <div className="main-title">{t("Blog Page Slider")}</div>
            <FlexBox className="filters-wrapper">
              <ButtonComponent
                variant="contained"
                startIcon={<AddIcon />}
                text={t("Add Slide")}
                onClick={() =>
                  navigation(ROUTE_ADMIN_APPEARANCE_BLOG_SLIDER_ADD)
                }
              />
            </FlexBox>
          </FlexBox>
          <Tables
            className="banner-table"
            body={
              size(blogSliderList) > 0
                ? setBlogSliderTableRenderData(blogSliderList)
                : []
            }
            header={renderBlogSliderHeader.map((item) => ({
              ...item,
              headerName: t(item.headerName),
            }))}
          />{" "}
        </CommonWhiteBackground>
      </div>
    </AppearanceContainer>
  );
};

export default Appearance;
