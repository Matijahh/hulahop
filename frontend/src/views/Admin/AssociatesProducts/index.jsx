import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { renderHeader } from "./mock";
import { ROUTE_ADMIN_ASSOCIATE_EDIT_PRODUCTS } from "../../../routes/routes";
import {
  commonAddUpdateQuery,
  commonGetQuery,
  getQuerySearch,
} from "../../../utils/axiosInstance";
import map from "lodash/map";
import { getImageUrlById } from "../../../utils/commonFunctions";
import { debounce, get, size } from "lodash";

import InputComponent from "../../../components/InputComponent";
import Tables from "../../../components/SuperAdmin/Tables";
import ModalComponent from "../../../components/ModalComponent";
import ButtonComponent from "../../../components/ButtonComponent";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { LoaderContainer } from "../../../components/Loader";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AssociatesProductsContainer } from "./styled";

const AssociatesProducts = () => {
  const [loading, setLoading] = useState(false);
  const [associateProductsList, setAssociateProductsList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [searchFilterData, setSearchFilterData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [associatesList, setAssociatesList] = useState([]);
  const [associate, setAssociate] = useState(0);

  const navigation = useNavigate();
  const { t } = useTranslation();

  const getAssociateProducts = async (searchParams) => {
    setLoading(true);
    const response = await getQuerySearch("/associate_products", {
      ...searchParams,
    });
    if (response) {
      const { data } = response.data;
      setAssociateProductsList(data);
      setLoading(false);
    }
    setLoading(false);
  };

  const getAssociates = async () => {
    setLoading(true);
    const response = await commonGetQuery("/associates");
    if (response) {
      const { data } = response.data;
      setAssociatesList(formatAssociateListTitle(data));
      setLoading(false);
    }
    setLoading(false);
  };

  const formatAssociateListTitle = (data) => {
    return map(data, (item) => {
      return {
        ...item,
        title: `${item.first_name} ${item.last_name ? item.last_name : ""}`,
      };
    });
  };

  const setTableRenderData = (data) => {
    const renderData = map(data, (item, index) => {
      return {
        ...item,
        no: `${index + 1}`,
        product_name: get(item, "name", ""),
        product_image: get(item, "product.image_id", ""),
        product_description: get(item, "description", ""),
        id: get(item, "id"),
        base_price: `${get(item, "product.price", "") || 0} RSD`,
        associate_price: `${get(item, "price") || 0} RSD`,
        price_margine: `${
          Number(get(item, "price")) - Number(get(item, "product.price")) || 0
        } RSD`,
        category: get(item, "product.category.name", ""),
        previewImageUrl: getImageUrlById(
          get(item, "product.product_variants.0.image_id")
        ),
        json: get(item, "image_json.imageObj", "")
          ? JSON.parse(get(item, "image_json.imageObj", ""))
          : null,
        productData: item,
        isBestSelling: get(item, "best_selling", false),
        status: item.is_approve ? t("Active") : t("Inactive"),
        handleOpenToggle,
        EditAssociateProducts,
        handleBestSellingImage,
      };
    });

    return renderData;
  };

  const handleOpenToggle = (item) => {
    if (item) {
      setIsOpen(true);
      setSelectedProduct(item);
    }
  };

  const handleBestSellingImage = async (isBestSelling, id) => {
    setLoading(true);
    const response = await commonAddUpdateQuery(
      `/associate_products/best_selling/${id}`,
      { best_selling: !isBestSelling },
      "PATCH"
    );
    if (response) {
      getAssociateProducts();
    }
    setLoading(false);
  };

  const handleDelete = async (item) => {
    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/associate_products/${item.id}`,
      null,
      "DELETE"
    );

    if (response) {
      getAssociateProducts();
    }

    setLoading(false);
  };

  const EditAssociateProducts = (id, associate_p_id) => {
    let route = `${ROUTE_ADMIN_ASSOCIATE_EDIT_PRODUCTS.replace(
      ":productId",
      associate_p_id
    )}?edit=${id}`;
    navigation(route);
  };

  const filterItems = (query) => {
    return associateProductsList.filter(
      (item) =>
        item?.name?.toLowerCase().includes(query.toLowerCase()) || // Search English
        item?.description?.toLowerCase().includes(query.toLowerCase()) || // Search Serbian
        item?.product?.category?.name
          .toLowerCase()
          .includes(query.toLowerCase()) // Search Serbian
    );
  };

  // Debounced version of handleSearch
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

  // Event handler for input change
  const handleChange = (event) => {
    const value = event.target.value.trim();
    setSearchText(value);
    debouncedHandleSearch(value);
  };

  const handeleAssociateSelectChange = (event) => {
    const value = event.target.value;
    getAssociateProducts(value ? { user_id: value } : {});
    setAssociate(value);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);

    if (isOpen) {
      setSelectedProduct();
    }
  };

  useEffect(() => {
    getAssociateProducts();
    getAssociates();
  }, []);

  return (
    <AssociatesProductsContainer>
      {loading && <LoaderContainer />}

      <CommonWhiteBackground>
        <FlexBox className="mb-4 title-wrapper">
          <div className="main-title">{t("Associate Products")}</div>
          <FlexBox className="filters-wrapper">
            <FormControl fullWidth sx={{ minWidth: 150 }}>
              <InputLabel id="associate-select-label">
                {t("Select Associate")}
              </InputLabel>
              <Select
                labelId="associate-select"
                id="associate-select"
                value={associate}
                label={t("Select Associate")}
                onChange={handeleAssociateSelectChange}
                size="small"
                displayEmpty
              >
                <MenuItem value={0}>
                  <em>{t("Show All")}</em>
                </MenuItem>
                {associatesList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <InputComponent
              type="search"
              label={t("Search Associate Products")}
              value={searchText}
              onChange={handleChange}
            />
          </FlexBox>
        </FlexBox>

        <ModalComponent
          title={t("Delete Product")}
          size={"m"}
          open={isOpen}
          handleClose={handleToggle}
        >
          <p>
            {`${t("Are you sure you want to delete")} `}
            <span className="bold">{selectedProduct?.product_name}</span>
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
                text={t("Delete Product")}
                type="button"
                onClick={() => {
                  handleDelete(selectedProduct);
                }}
              />
            </FlexBox>
          </>
        </ModalComponent>

        <Tables
          className="products-table"
          body={
            isSearch
              ? size(searchFilterData) > 0
                ? setTableRenderData(searchFilterData)
                : []
              : size(associateProductsList) > 0
              ? setTableRenderData(associateProductsList)
              : []
          }
          header={renderHeader.map((item) => ({
            ...item,
            headerName: t(item.headerName),
          }))}
        />
      </CommonWhiteBackground>
    </AssociatesProductsContainer>
  );
};

export default AssociatesProducts;
