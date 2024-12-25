import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { find, get, isEmpty, map, size } from "lodash";
import {
  getImageUrlById,
  getSelectobjectValue,
} from "../../../utils/commonFunctions";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_ADMIN_PRODUCTS } from "../../../routes/routes";
import styled from "styled-components";
import * as Yup from "yup";
import useImage from "use-image";

import { ErrorMessage, FieldArray, FormikProvider, useFormik } from "formik";
import { Stage, Layer, Image, Rect } from "react-konva";
import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { LoaderContainer } from "../../../components/Loader";

import InputComponent from "../../../components/InputComponent";
import SelectComponent from "../../../components/SelectComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ImageUploadBox from "../../../components/ImageUploadBox";
import GobackButton from "../../../components/GoBackButton";

const subVariantsInitialData = {
  value: "",
  quantity: "",
};

const subVariantsStartInitialData = {
  value: "",
};

const productVariantsInitialData = {
  color_id: "",
  image_id: "",
  sub_variants: [subVariantsInitialData],
};

export const ProductFormWrapper = styled.div`
  .add-product-btn {
    width: 100%;
    border: 2px dashed #000;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    svg {
      width: 35px;
      height: 35px;
    }
  }

  .product-variant-box {
    padding: 20px;
    margin: 15px 0;
    background-color: #f4f4f4;
  }

  .konvajs-content {
    @media screen and (max-width: 768px) {
      width: 100% !important;

      canvas {
        width: 100% !important;
      }
    }
  }

  .sub-variant-value-btn {
    @media screen and (max-width: 768px) {
      margin-bottom: 20px;
    }
  }

  .positions-inputs {
    .col-12 {
      margin-bottom: 10px;
    }
  }
`;

const ProductForm = () => {
  const [loading, setLoading] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [productdata, setProductdata] = useState([]);

  const params = useParams();
  const stageRef = useRef();
  const navigation = useNavigate();
  const { t } = useTranslation();

  const validation = Yup.object().shape({
    name: Yup.string().required(t("Name is required!")),
    price: Yup.string().required(t("Price is required!")),
    category_id: Yup.string().required(t("Category is required!")),
    subcategory_id: Yup.string().required(t("Sub category is required!")),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image_id: "",
      price: "",
      category_id: "",
      subcategory_id: "",
      x_position: 163,
      y_position: 103,
      frame_width: 171,
      frame_height: 211,
      quantity: 9999,
      sub_variants: [
        {
          value: "",
        },
      ],
      product_variants: [
        {
          color_id: "",
          image_id: "",
          sub_variants: [
            {
              value: "",
              quantity: "",
            },
          ],
        },
      ],
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      let id = get(params, "id");

      const URL = id ? `/products/${id}` : "/products";
      let categoryId = getSelectobjectValue(values.category_id);
      let subcategoryId = getSelectobjectValue(values.subcategory_id);
      let productVariants = values.product_variants.map((variant) => ({
        color_id: variant.color_id.split(",")[0], // Extracting the ID from "2,Sky"
        image_id: variant.image_id,
        sub_variants: values.sub_variants.map((subVariant) => ({
          value: subVariant.value,
          quantity: values.quantity,
        })),
      }));

      const reqBody = {
        name: values.name,
        description: values.description,
        image_id: values.image_id,
        price: values.price,
        category_id: categoryId.id,
        subcategory_id: subcategoryId.id,
        product_variants: productVariants,
        x_position: values.x_position,
        y_position: values.y_position,
        frame_width: values.frame_width,
        frame_height: values.frame_height,
      };

      setLoading(true);

      await commonAddUpdateQuery(URL, reqBody, id ? "PATCH" : "POST");

      setLoading(false);
      navigation(ROUTE_ADMIN_PRODUCTS);
    },
  });

  const getCategoryList = async () => {
    const response = await commonGetQuery("/categories");

    if (response) {
      const { data } = response.data;

      if (size(data) > 0) {
        setCategoriesData(data);
        const updatedList =
          data &&
          data.map((item) => {
            return { id: item.id, title: item.name };
          });
        setCategoryList(updatedList);
      }

      getColorList();
    }
  };

  const getSubCategoriesByCategoryId = (categoryId) => {
    const category = find(categoriesData, { id: categoryId });

    if (category) {
      return category.sub_categories.map((subCategory) => {
        return {
          id: subCategory.id,
          title: subCategory.name,
        };
      });
    } else {
      return []; // Category with the given ID not found
    }
  };

  const handeleSelectChange = (e, name) => {
    const { value } = e.target;
    const SelectObj = getSelectobjectValue(value);

    if (name === "category_id") {
      if (size(categoriesData) > 0) {
        const subCategoriesData = getSubCategoriesByCategoryId(
          Number(SelectObj.id)
        );
        setSubCategoryList(subCategoriesData || []);
        formik.setFieldValue.subcategory_id = "";
      }
    }
  };

  const getColorList = async () => {
    setLoading(true);

    const response = await commonGetQuery("/colors");

    if (response) {
      const { data } = response.data;
      const updatedList =
        data &&
        data.map((item) => {
          return { id: item.id, title: item.name };
        });

      setColorList(updatedList);

      setLoading(false);

      let id = get(params, "id");

      if (id) {
        getProductData();
      }
    } else {
      let id = get(params, "id");

      if (id) {
        getProductData();
      }
    }
    setLoading(false);
  };

  const getProductData = async () => {
    setLoading(true);

    let id = get(params, "id");

    const response = await commonGetQuery(`/products/${id}`);

    if (response) {
      const { data } = response.data;

      const {
        name,
        description,
        image_id,
        price,
        product_variants,
        category,
        sub_category,
        x_position,
        y_position,
        frame_width,
        frame_height,
      } = data;

      setProductdata(data);

      if (size(categoriesData) > 0) {
        const subCategoriesData = getSubCategoriesByCategoryId(
          Number(category.id)
        );

        setSubCategoryList(subCategoriesData || []);
      }

      const productVariantsValues = product_variants.map((variant) => ({
        color_id: `${get(variant, "color.id", "")},${get(
          variant,
          "color.name",
          ""
        )}`,
        image_id: get(variant, "image_id", "") || "",
        sub_variants:
          variant.sub_variants && size(variant.sub_variants) > 0
            ? variant.sub_variants.map((subVariant) => ({
                value: subVariant.value || "",
                quantity: subVariant.quantity || "",
              }))
            : [],
      }));

      let quantity = "";
      const productSubVariantsValues = product_variants.map(
        (variant, index) => {
          if (index > 0) return;
          let SubVariantsValues = [];
          if (variant.sub_variants && size(variant.sub_variants) > 0) {
            variant.sub_variants.map((subVariant, sub_index) => {
              // if(sub_index>0) return;
              let item = {};
              item.value = subVariant.value;
              SubVariantsValues.push(item);
              if (sub_index == 0) {
                quantity = subVariant.quantity;
              }
            });
          }
          return SubVariantsValues;
        }
      );

      formik.setFieldValue("name", name || "");
      formik.setFieldValue("description", description || "");
      formik.setFieldValue("image_id", image_id || "");
      formik.setFieldValue("price", price || "");
      formik.setFieldValue("category_id", `${category?.id},${category?.name}`);
      formik.setFieldValue("x_position", x_position || 163);
      formik.setFieldValue("y_position", y_position || 103);
      formik.setFieldValue("frame_width", frame_width || 171);
      formik.setFieldValue("frame_height", frame_height || 211);
      formik.setFieldValue(
        "subcategory_id",
        `${sub_category.id},${sub_category.name}`
      );
      formik.setFieldValue("quantity", quantity || 9999);
      formik.setFieldValue(
        "sub_variants",
        (size(productSubVariantsValues) > 0 && productSubVariantsValues[0]) ||
          ""
      );
      formik.setFieldValue("product_variants", productVariantsValues);

      setLoading(false);
    }

    setLoading(false);
  };

  // the first very simple and recommended way:
  const MainImage = () => {
    let image_url =
      "https://api.hulahop.shop/images/ff904dee-8d74-4e9a-adbc-bc5b7e739f54";

    if (formik.values.image_id) {
      image_url = getImageUrlById(formik.values.image_id);
    }

    const [mainProductImage] = useImage(image_url, "anonymous", "origin");

    return (
      <Image
        width={500}
        height={500}
        className="main-image"
        image={mainProductImage}
      />
    );
  };

  const handelChangeCoverImage = (id) => {
    formik.setFieldValue("product_variants.0.image_id", id);
  };

  const handelDeleteCoverImage = () => {
    formik.setFieldValue("product_variants.0.image_id", "");
  };

  useEffect(() => {
    if (!isEmpty(categoriesData) && !isEmpty(productdata)) {
      if (size(categoriesData) > 0) {
        const subCategoriesData = getSubCategoriesByCategoryId(
          Number(get(productdata, "category_id"))
        );
        setSubCategoryList(subCategoriesData || []);
      }
    }
  }, [categoriesData, productdata]);

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <ProductFormWrapper>
      {loading && <LoaderContainer />}
      <CommonWhiteBackground>
        <FlexBox>
          <div className="main-title title-wrapper">
            {get(params, "id") ? t("Edit Product") : t("Add Product")}
          </div>
        </FlexBox>
        <hr />
        <div className="commomn-form-wrapper">
          <FormikProvider value={formik}>
            <form
              action=""
              className="commomn-form"
              onSubmit={formik.handleSubmit}
            >
              <div className="container-fluid">
                <div className="row g-4">
                  <div className="col-lg-5">
                    <ImageUploadBox
                      name="image_id"
                      id={formik.values.image_id}
                      formik={formik}
                      onUpload={handelChangeCoverImage}
                      onDelete={handelDeleteCoverImage}
                    />
                  </div>
                  <div className="col-lg-7">
                    <div className="row g-4">
                      <div className="col-lg-6">
                        <InputComponent
                          name="name"
                          InnerPlaceholder={t("Product Name")}
                          fullWidth
                          label={t("Product Name")}
                          formik={formik}
                          disabled={loading}
                        />
                      </div>
                      <div className="col-lg-6">
                        <InputComponent
                          name="price"
                          InnerPlaceholder={t("Price")}
                          fullWidth
                          formik={formik}
                          disabled={loading}
                          label={t("Price")}
                        />
                      </div>
                      <div className="col-lg-6">
                        <SelectComponent
                          fullWidth
                          name="category_id"
                          size="small"
                          title={t("Select Categories")}
                          onChange={handeleSelectChange}
                          optionList={categoryList}
                          formik={formik}
                          disabled={loading}
                          isCustumeChangeFunction
                        />
                        <ErrorMessage
                          component="p"
                          className="input-error"
                          name="category_id"
                        />
                      </div>
                      <div className="col-lg-6">
                        <SelectComponent
                          fullWidth
                          name="subcategory_id"
                          size="small"
                          title={t("Select Sub Categories")}
                          optionList={subCategoryList}
                          formik={formik}
                          disabled={loading}
                        />
                        <ErrorMessage
                          component="p"
                          className="input-error"
                          name="subcategory_id"
                        />
                      </div>
                      <div className="col-lg-12">
                        <InputComponent
                          InnerPlaceholder={t("Write Description")}
                          fullWidth
                          name="description"
                          label={t("Description")}
                          type="textarea"
                          formik={formik}
                          disabled={loading}
                        />
                      </div>
                      <div className="col-lg-12">
                        <InputComponent
                          name="quantity"
                          InnerPlaceholder={t("Quantity")}
                          fullWidth
                          formik={formik}
                          disabled={loading}
                          label={t("Quantity")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <h4 className="mb-3">{t("Product Sub Variant")}</h4>
                    <hr />

                    <FieldArray
                      name="sub_variants"
                      render={({ remove, push }) => (
                        <>
                          <div className="d-flex justify-content-end">
                            <ButtonComponent
                              variant="contained"
                              startIcon={<AddIcon />}
                              text={t("Add Sub Variant")}
                              className="sub-variant-value-btn"
                              onClick={() => push(subVariantsStartInitialData)}
                            />
                          </div>
                          <div className="row g-3">
                            {size(formik.values.sub_variants) > 0 &&
                              map(
                                formik.values.sub_variants,
                                (item, variantIndex) => {
                                  return (
                                    <>
                                      <div className="col-lg-4">
                                        <div className="d-flex">
                                          <div>
                                            <InputComponent
                                              InnerPlaceholder={t(
                                                "Sub Variant Value"
                                              )}
                                              fullWidth
                                              inputClassname="mb-0"
                                              name={`sub_variants.${variantIndex}.value`}
                                              value={
                                                formik.values.sub_variants[
                                                  variantIndex
                                                ].value
                                              }
                                              formik={formik}
                                              isUseCustomeValue
                                              label={t("Sub Variant Value")}
                                            />
                                          </div>
                                          <div className=" ms-3 pb-2 align-self-end">
                                            <DeleteOutlineOutlinedIcon
                                              onClick={() => {
                                                remove(variantIndex);
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                }
                              )}
                          </div>
                        </>
                      )}
                    />
                  </div>
                  <div className="col-12"></div>
                  <div className="col-12">
                    <h4 className="mb-3">{t("Set Frame Position")}</h4>
                    <hr />
                  </div>
                  <div className="col-lg-6">
                    <div className="container-canvas">
                      <Stage width={500} height={500} ref={stageRef}>
                        <Layer>
                          <MainImage />
                          <Rect
                            x={formik.values.x_position}
                            y={formik.values.y_position}
                            width={formik.values.frame_width}
                            height={formik.values.frame_height}
                            stroke="red"
                            strokeWidth={1}
                            dash={[0, 0]}
                          />
                        </Layer>
                      </Stage>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="row positions-inputs">
                      <div className="col-12">
                        <InputComponent
                          name="x_position"
                          InnerPlaceholder={t("Enter X Position")}
                          fullWidth
                          label={t("X Position")}
                          formik={formik}
                          disabled={loading}
                        />
                      </div>
                      <div className="col-12">
                        <InputComponent
                          name="y_position"
                          InnerPlaceholder={t("Enter Y Position")}
                          fullWidth
                          label={t("Y Position")}
                          formik={formik}
                          disabled={loading}
                        />
                      </div>
                      <div className="col-12">
                        <InputComponent
                          name="frame_width"
                          InnerPlaceholder={t("Enter Frame Width")}
                          fullWidth
                          label={t("Frame Width")}
                          formik={formik}
                          disabled={loading}
                        />
                      </div>
                      <div className="col-12">
                        <InputComponent
                          name="frame_height"
                          InnerPlaceholder={t("Enter Frame Height")}
                          fullWidth
                          label={t("Frame Height")}
                          formik={formik}
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <h5 className="">{t("Product Variant")}</h5>
                    <hr />
                    <FieldArray
                      name="product_variants"
                      render={({ remove, push }) => (
                        <>
                          <div className="d-flex justify-content-end">
                            <ButtonComponent
                              variant="contained"
                              startIcon={<AddIcon />}
                              text={t("Add Variant")}
                              onClick={() => push(productVariantsInitialData)}
                            />
                          </div>
                          <div className="product-variant-box pt-3">
                            <div className="row g-3">
                              {size(formik.values.product_variants) > 0 &&
                                map(
                                  formik.values.product_variants,
                                  (item, variantIndex) => {
                                    return (
                                      <>
                                        <div className="col-lg-4">
                                          <div>
                                            <ImageUploadBox
                                              name={`product_variants.${variantIndex}.image_id`}
                                              id={item.image_id}
                                              formik={formik}
                                              disabled={variantIndex == 0}
                                            />
                                          </div>
                                          <div className="my-3">
                                            <SelectComponent
                                              label={t("Select Color")}
                                              fullWidth
                                              size="small"
                                              name={`product_variants.${variantIndex}.color_id`}
                                              value={
                                                formik.values.product_variants[
                                                  variantIndex
                                                ].color_id
                                              }
                                              isShowValue
                                              optionList={colorList}
                                              formik={formik}
                                            />
                                          </div>
                                          <div>
                                            <ButtonComponent
                                              width="100%"
                                              variant="outlined"
                                              text={t("Remove")}
                                              disabled={variantIndex == 0}
                                              onClick={
                                                variantIndex == 0
                                                  ? () => {}
                                                  : () => {
                                                      remove(variantIndex);
                                                    }
                                              }
                                            />
                                          </div>
                                        </div>
                                      </>
                                    );
                                  }
                                )}
                            </div>
                          </div>
                        </>
                      )}
                    />
                  </div>
                  <div className="col-12">
                    <FlexBox justifyContent="end" className="mt-3">
                      <GobackButton />
                      <ButtonComponent
                        variant="contained"
                        text={t("Save")}
                        type="submit"
                      />
                    </FlexBox>
                  </div>
                </div>
              </div>
            </form>
          </FormikProvider>
        </div>
      </CommonWhiteBackground>
    </ProductFormWrapper>
  );
};

export default ProductForm;
