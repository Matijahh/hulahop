import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { renderHeader } from "./mock";
import {
  ROUTE_ADMIN_PRODUCTS_ADD,
  ROUTE_ADMIN_PRODUCTS_EDIT,
} from "../../../routes/routes";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { debounce, get, size } from "lodash";
import map from "lodash/map";

import AddIcon from "@mui/icons-material/Add";
import InputComponent from "../../../components/InputComponent";
import Tables from "../../../components/SuperAdmin/Tables";
import ButtonComponent from "../../../components/ButtonComponent";
import ModalComponent from "../../../components/ModalComponent";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { LoaderContainer } from "../../../components/Loader";
import { CreateProductContainer } from "./styled";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [searchFilterData, setSearchFilterData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const navigation = useNavigate();
  const { t } = useTranslation();

  const handleToggle = () => {
    setIsOpen(!isOpen);

    if (isOpen) {
      setSelectedProduct();
    }
  };

  const handleOpenToggle = (item) => {
    if (item) {
      setIsOpen(true);
      setSelectedProduct(item);
    }
  };

  const getProductList = async () => {
    setLoading(true);

    const response = await commonGetQuery("/products");

    if (response) {
      const { data } = response.data;
      setProductList(data);
      setLoading(false);
    }

    setLoading(false);
  };

  const setTableRenderData = (data) => {
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      product_image: item.image_id,
      product_description: get(item, "description", ""),
      product_name: get(item, "name", ""),
      product_id: get(item, "id", ""),
      id: get(item, "id", ""),
      price: `${get(item, "price", "") || 0} RSD`,
      colors: "Red, Yellow, Green",
      status: t("Active"),
      handleOpenToggle,
      EditProduct,
    }));

    return renderData;
  };

  const handleDelete = async (item) => {
    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/products/${item.id}`,
      null,
      "DELETE"
    );

    if (response) {
      getProductList();
    }

    setLoading(false);
    handleToggle();
  };

  const EditProduct = (id) => {
    let route = ROUTE_ADMIN_PRODUCTS_EDIT.replace(":id", id);
    navigation(route);
  };

  const filterItems = (query) => {
    return productList.filter(
      (item) =>
        item?.name?.toLowerCase().includes(query.toLowerCase()) || // Search English
        item?.description?.toLowerCase().includes(query.toLowerCase()) // Search Serbian
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

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <CreateProductContainer>
      <CommonWhiteBackground>
        <FlexBox className="mb-4 title-wrapper">
          <div className="main-title">{t("Products")}</div>
          <FlexBox className="filters-wrapper">
            <InputComponent
              type="search"
              label={t("Search Products")}
              value={searchText}
              onChange={handleChange}
            />
            <ButtonComponent
              variant="contained"
              startIcon={<AddIcon />}
              text={t("Add Product")}
              onClick={() => navigation(ROUTE_ADMIN_PRODUCTS_ADD)}
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
              : size(productList) > 0
              ? setTableRenderData(productList)
              : []
          }
          header={renderHeader.map((item) => ({
            ...item,
            headerName: t(item.headerName),
          }))}
        />

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
      </CommonWhiteBackground>
    </CreateProductContainer>
  );
};

export default Products;
