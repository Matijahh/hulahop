import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { renderHeader } from "./mock";
import { get, size, debounce } from "lodash";
import map from "lodash/map";
import {
  ROUTE_ADMIN_ABOUT_PRODUCT_ADD,
  ROUTE_ADMIN_ABOUT_PRODUCT_EDIT,
} from "../../../routes/routes";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { LoaderContainer } from "../../../components/Loader";
import { AboutProductContainer } from "./styled";

import Tables from "../../../components/SuperAdmin/Tables";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import AddIcon from "@mui/icons-material/Add";
import ModalComponent from "../../../components/ModalComponent";

const AboutProduct = () => {
  const [loading, setLoading] = useState(false);
  const [aboutProductData, setAboutProductData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchFilterData, setSearchFilterData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const navigation = useNavigate();
  const { t } = useTranslation();

  const handleToggle = () => {
    setIsOpen(!isOpen);

    if (isOpen) {
      setSelectedProduct();
    }
  };

  const handleOpenToggle = (id, title) => {
    setIsOpen(true);
    setSelectedProduct({ id, title });
  };

  const getAboutProductData = async () => {
    setLoading(true);

    const response = await commonGetQuery("/about-product-data");

    if (response) {
      const { data } = response.data;
      setAboutProductData(data);
      setLoading(false);
    }

    setLoading(false);
  };

  const setTableRenderData = (data) => {
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      category_name: get(item, "category.name"),
      sub_category_name: get(item, "sub_category.name"),
      id: item.id,
      // status: item.status ? "Active" : "In Active",
      handleOpenToggle,
      EditAboutProduct,
    }));

    return renderData;
  };

  const handleDelete = async (id) => {
    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/about-product-data/${id}`,
      null,
      "DELETE"
    );

    if (response) {
      getAboutProductData();
    }

    setLoading(false);

    handleToggle();
  };

  const EditAboutProduct = (id) => {
    let route = ROUTE_ADMIN_ABOUT_PRODUCT_EDIT.replace(":id", id);
    navigation(route);
  };

  const filterItems = (query) => {
    return aboutProductData.filter(
      (item) =>
        item?.category?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
        item?.sub_category?.name?.toLowerCase()?.includes(query?.toLowerCase())
    );
  };

  const debouncedHandleSearch = useCallback(
    debounce((query) => {
      if (query) {
        setIsSearch(true);
      } else {
        setIsSearch(false);
      }

      const filteredItems = filterItems(query);
      setSearchFilterData(filteredItems);
    }, 1000),
    [searchText]
  );

  const handleChange = (event) => {
    const value = event.target.value.trim();
    setSearchText(value);
    debouncedHandleSearch(value);
  };

  useEffect(() => {
    getAboutProductData();
  }, []);

  return (
    <AboutProductContainer>
      <CommonWhiteBackground>
        <FlexBox className="mb-4 title-wrapper">
          <div className="main-title ">{t("About Product Data")}</div>
          <FlexBox className="filters-wrapper">
            <InputComponent
              type="search"
              label={t("Search About Product Data")}
              value={searchText}
              onChange={handleChange}
            />
            <ButtonComponent
              variant="contained"
              startIcon={<AddIcon />}
              text={t("Add Product Data")}
              onClick={() => navigation(ROUTE_ADMIN_ABOUT_PRODUCT_ADD)}
            />
          </FlexBox>
        </FlexBox>

        {loading && <LoaderContainer />}

        <Tables
          className="products-table"
          body={
            isSearch
              ? size(searchFilterData) > 0
                ? setTableRenderData(searchFilterData)
                : []
              : size(aboutProductData) > 0
              ? setTableRenderData(aboutProductData)
              : []
          }
          header={renderHeader.map((item) => ({
            ...item,
            headerName: t(item.headerName),
          }))}
        />

        <ModalComponent
          title={t("Delete About Product Data")}
          size={"m"}
          open={isOpen}
          handleClose={handleToggle}
        >
          <p>
            {`${t("Are you sure you want to delete")} `}
            <span className="bold">{selectedProduct?.title}</span>
            {`?`}
          </p>
          <>
            <FlexBox hasBorderTop={true} className="pt-3 mt-3">
              <ButtonComponent
                className=""
                variant="outlined"
                fullWidth
                text={t("Cancel")}
                onClick={handleToggle}
              />
              <ButtonComponent
                variant="contained"
                fullWidth
                text={t("Delete")}
                type="button"
                onClick={() => {
                  handleDelete(selectedProduct.id);
                }}
              />
            </FlexBox>
          </>
        </ModalComponent>
      </CommonWhiteBackground>
    </AboutProductContainer>
  );
};

export default AboutProduct;
