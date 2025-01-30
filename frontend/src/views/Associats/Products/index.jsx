import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ROUTE_ASSOCIATE_CREATE_PRODUCT,
  ROUTE_ASSOCIATE_EDIT_PRODUCT,
} from "../../../routes/routes";
import { ACCESS_TOKEN, REST_URL_SERVER } from "../../../utils/constant";
import { jwtDecode } from "jwt-decode";
import { size } from "lodash";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { ProductCardBox, ProductsListContainer } from "./styled";

import { Pagination, Tooltip } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { Loader } from "../../../components/Loader";
import { Helmet } from "react-helmet";

import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ButtonComponent from "../../../components/ButtonComponent";
import SelectComponent from "../../../components/SelectComponent";
import InputComponent from "../../../components/InputComponent";
import PreviewJsonImage from "../../../components/PreviewJsonImage";
import ImageLibrary from "../ImageLibrary";
import ModalComponent from "../../../components/ModalComponent";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchVal, setSearchVal] = useState([]);
  const [isOpenImageLibrary, setIsOpenImageLibrary] = useState();
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { t } = useTranslation();
  const navigation = useNavigate();

  const handleToggle = () => {
    setIsOpenImageLibrary(!isOpenImageLibrary);
  };

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const handleDeleteToggle = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  const getAllProduct = async (
    searchString,
    categoryId,
    subCategoryId,
    page
  ) => {
    setLoading(true);

    const decoded = jwtDecode(ACCESS_TOKEN);

    let URL = `/associate_products?user_id=${decoded.id}`;

    if (page) {
      URL += `&limit=${limit}&page=${page}`;
    }

    if (searchString) {
      URL += `&search_string=${searchString}`;
    }

    if (categoryId) {
      URL += `&category_ids=${parseFloat(categoryId)}`;
    }

    if (subCategoryId) {
      URL += `&sub_category_ids=${parseFloat(subCategoryId)}`;
    }

    const response = await commonGetQuery(URL);

    if (response) {
      const { data } = response.data;
      setProductsList(data.data);
      if (data.totalPages) {
        setTotalPages(data.totalPages);
      }
      setLoading(false);
    }

    setLoading(false);
  };

  const handleEditProduct = (id, associate_p_id) => {
    navigation(
      `${ROUTE_ASSOCIATE_EDIT_PRODUCT.replace(
        ":productId",
        associate_p_id
      )}?edit=${id}`
    );
  };

  const deleteProduct = async () => {
    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/associate_products/${productToDelete.id}`,
      null,
      "DELETE"
    );

    if (response) {
      getAllProduct(null, null, null, null);
    }

    setLoading(false);

    handleDeleteToggle();
  };

  const getAllCategory = async () => {
    const response = await commonGetQuery("/categories");

    if (response) {
      const { data } = response.data;

      if (size(data) > 0) {
        const categoryList = data.map((item) => {
          return {
            id: item?.id,
            title: item?.name,
            sub_category: item?.sub_categories,
          };
        });
        setCategories(categoryList);
      }
    }
  };

  const onSelectCategory = (e) => {
    const selectedId =
      e.target && e.target.value && e.target.value.split(",")[0];

    const selectedItem = categories.find(
      (item) => item.id === parseFloat(selectedId)
    );

    selectedItem
      ? getAllProduct(searchVal, selectedItem?.id, null, null)
      : getAllProduct(searchVal, null, null, null);

    setSubCategories(
      selectedItem?.sub_category?.map((item) => {
        return {
          id: item?.id,
          title: item?.name,
          sub_category: item?.sub_categories,
        };
      })
    );

    setSelectedCategory(e.target && e.target.value);
  };

  const handleSelectSubCategory = (e) => {
    const selectedId =
      e.target && e.target.value && e.target.value.split(",")[0];

    selectedId
      ? getAllProduct(
          searchVal,
          selectedCategory.split(",")[0],
          selectedId,
          null
        )
      : getAllProduct(searchVal, selectedCategory.split(",")[0], null, null);
    setSelectedSubCategory(e.target && e.target.value);
  };

  const onSearchValue = (e) => {
    const value = e.target && e.target.value;
    getAllProduct(value, null, null, null);
    setSearchVal(value);
  };

  const handleOpenDeleteModal = (id, title) => {
    setProductToDelete({ id, title });
    handleDeleteToggle();
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    getAllProduct(null, null, null, page);
  }, [page]);

  return (
    <CommonWhiteBackground>
      <Helmet>
        <title>{t("Products - Associate")}</title>
      </Helmet>
      <FlexBox isWrap className="title-wrapper">
        <div className="main-title">{t("Your Products")}</div>
        <FlexBox isWrap alignItems={"flex-start"} className="filters-wrapper">
          <SelectComponent
            id="1"
            labelId="demo-multiple-name-label"
            label={t("Select Categories")}
            width={200}
            size="small"
            onChange={onSelectCategory}
            optionList={categories}
            isShowValue
            value={selectedCategory}
            showAll
          />

          <SelectComponent
            id="1"
            labelId="demo-multiple-name-label"
            label={t("Select Sub Categories")}
            width={200}
            size="small"
            optionList={subCategories}
            isShowValue
            value={selectedSubCategory}
            onChange={handleSelectSubCategory}
            showAll
          />

          <InputComponent
            type="search"
            onChange={onSearchValue}
            label={t("Search Products")}
          />

          <ButtonComponent
            variant="contained"
            startIcon={<AddIcon />}
            text={t("Create Product")}
            onClick={() =>
              navigation(
                ROUTE_ASSOCIATE_CREATE_PRODUCT.replace(
                  ":categoryId",
                  "all"
                ).replace(":sub_categoryId", 0)
              )
            }
          />
        </FlexBox>
      </FlexBox>

      <ModalComponent
        title={t("Delete Product")}
        size={"m"}
        open={isDeleteOpen}
        handleClose={handleDeleteToggle}
      >
        <p>
          {`${t("Are you sure you want to delete")} `}
          <span className="bold">{productToDelete?.title}</span>
          {`?`}
        </p>
        <>
          <FlexBox hasBorderTop={true} className="pt-3 mt-3">
            <ButtonComponent
              className=""
              variant="outlined"
              fullWidth
              text={t("Cancel")}
              onClick={handleDeleteToggle}
            />
            <ButtonComponent
              variant="contained"
              fullWidth
              text={t("Delete")}
              type="button"
              onClick={deleteProduct}
            />
          </FlexBox>
        </>
      </ModalComponent>

      <ProductsListContainer>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Row>
              {productsList.length === 0 ? (
                <center>
                  <b>{t("No Product Found!")}</b>
                </center>
              ) : (
                <>
                  {productsList.map((item, i) => (
                    <Col md={4} lg={3} sm={6} key={i}>
                      <ProductCardBox>
                        <div className="image-cover">
                          <PreviewJsonImage
                            previewImageUrl={`${REST_URL_SERVER}/images/${item?.product?.image_id}`}
                            json={
                              item?.image_json?.imageObj
                                ? JSON.parse(item?.image_json?.imageObj)
                                : null
                            }
                            productData={item}
                          />
                          <div className="overlay">
                            <div className="overlay-icon">
                              <Tooltip title={t("Edit")} placement="bottom">
                                <EditOutlinedIcon
                                  onClick={() =>
                                    handleEditProduct(item.id, item?.product_id)
                                  }
                                />
                              </Tooltip>
                            </div>
                            <div className="overlay-icon">
                              <Tooltip title={t("Delete")} placement="bottom">
                                <DeleteOutlineOutlinedIcon
                                  onClick={() =>
                                    handleOpenDeleteModal(
                                      item.id,
                                      item.product?.name
                                    )
                                  }
                                />
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                        <div className="product-data">
                          <div className="product-title">
                            {item?.product?.name}
                          </div>
                          <div className="product-caregory">
                            {item?.sub_category?.name || item?.category?.name}
                          </div>
                          <div className="product-price">{item?.price} RSD</div>
                        </div>
                      </ProductCardBox>
                    </Col>
                  ))}
                </>
              )}
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
      </ProductsListContainer>
      <ImageLibrary handleClose={handleToggle} open={isOpenImageLibrary} />
    </CommonWhiteBackground>
  );
};

export default Products;
