import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { find, get, isEmpty, map, size } from "lodash";
import { getImageUrlById } from "../../../utils/commonFunctions";
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

const DEFAULT_FRAME = { x: 163, y: 103, width: 171, height: 211 };

const FRAME_SIDES = [
  {
    key: "front",
    suffix: "",
    imageField: "image_id",
    title: "Front side",
    emptyText: "Upload the main color's front photo to set the print area.",
  },
  {
    key: "back",
    suffix: "_back",
    imageField: "image_id_back",
    title: "Back side",
    emptyText: "Upload the main color's back photo to set the back print area.",
  },
];

const FRAME_FIELDS = [
  { name: "x_position", label: "X Position", placeholder: "Enter X Position" },
  { name: "y_position", label: "Y Position", placeholder: "Enter Y Position" },
  { name: "frame_width", label: "Frame Width", placeholder: "Enter Frame Width" },
  {
    name: "frame_height",
    label: "Frame Height",
    placeholder: "Enter Frame Height",
  },
];

// Select values are stored as "id,title". Defaults can also be plain values,
// so read the id defensively instead of assuming a string.
const getSelectId = (value) => {
  if (value === null || value === undefined) return "";
  const text = String(value);
  return text.includes(",") ? text.split(",")[0] : text;
};

const createVariant = (t) => ({
  color_id: "",
  image_id: "",
  image_id_back: "",
  variant_status: `true,${t("Active")}`,
});

export const ProductFormWrapper = styled.div`
  .form-section {
    margin-bottom: 40px;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;

    h4 {
      margin: 0;
    }
  }

  .section-hint,
  .field-hint {
    font-size: 12px;
    color: #666666;
    margin: 8px 0 0;
  }

  .product-variant-box {
    padding: 20px;
    height: 100%;
    background-color: #f4f4f4;
  }

  .variant-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 15px;
  }

  .variant-badge {
    font-size: 12px;
    font-weight: 700;
    color: #004e64;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .size-remove {
    cursor: pointer;

    &.disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }
  }

  .frame-side {
    margin-bottom: 30px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .frame-side-title {
    font-weight: 600;
    margin-bottom: 10px;
  }

  .empty-frame {
    min-height: 150px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 2px dotted #004e64;
    font-size: 12px;
    font-weight: bold;
    color: #004e64;
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

const FramePreview = ({ imageId, x, y, width, height }) => {
  const [image] = useImage(getImageUrlById(imageId), "anonymous", "origin");

  return (
    <Stage width={500} height={500}>
      <Layer>
        <Image width={500} height={500} image={image} />
        <Rect
          x={Number(x) || 0}
          y={Number(y) || 0}
          width={Number(width) || 0}
          height={Number(height) || 0}
          stroke="red"
          strokeWidth={1}
        />
      </Layer>
    </Stage>
  );
};

const ProductForm = () => {
  const [loading, setLoading] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [productData, setProductData] = useState({});

  const params = useParams();
  const navigation = useNavigate();
  const { t } = useTranslation();

  const productId = get(params, "id");

  const statusList = [
    {
      id: true,
      title: t("Active"),
    },
    {
      id: false,
      title: t("Inactive"),
    },
  ];

  const validation = Yup.object().shape({
    name: Yup.string().required(t("Name is required!")),
    price: Yup.string().required(t("Price is required!")),
    category_id: Yup.string().required(t("Category is required!")),
    subcategory_id: Yup.string().required(t("Sub category is required!")),
    sub_variants: Yup.array().of(
      Yup.object().shape({
        value: Yup.string().required(t("Size is required!")),
      })
    ),
    product_variants: Yup.array().of(
      Yup.object().shape({
        color_id: Yup.string().required(t("Color is required!")),
        image_id: Yup.string()
          .nullable()
          .required(t("Front photo is required!")),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      double_design_price: "0",
      category_id: "",
      subcategory_id: "",
      status: `true,${t("Active")}`,
      x_position: DEFAULT_FRAME.x,
      y_position: DEFAULT_FRAME.y,
      frame_width: DEFAULT_FRAME.width,
      frame_height: DEFAULT_FRAME.height,
      x_position_back: DEFAULT_FRAME.x,
      y_position_back: DEFAULT_FRAME.y,
      frame_width_back: DEFAULT_FRAME.width,
      frame_height_back: DEFAULT_FRAME.height,
      quantity: 9999,
      sub_variants: [{ value: "" }],
      product_variants: [createVariant(t)],
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      const sizes = values.sub_variants.map((subVariant) => ({
        value: subVariant.value,
        quantity: values.quantity,
      }));

      const productVariants = values.product_variants.map((variant) => ({
        color_id: getSelectId(variant.color_id),
        image_id: variant.image_id || null,
        image_id_back: variant.image_id_back || null,
        sub_variants: sizes,
        variant_status: getSelectId(variant.variant_status) !== "false",
      }));

      // The main (first) color is the product cover and the print area preview.
      const mainVariant = values.product_variants[0] || {};

      const reqBody = {
        name: values.name,
        description: values.description,
        image_id: mainVariant.image_id || null,
        image_id_back: mainVariant.image_id_back || null,
        price: values.price,
        double_design_price: values.double_design_price,
        category_id: getSelectId(values.category_id),
        subcategory_id: getSelectId(values.subcategory_id),
        status: getSelectId(values.status) !== "false",
        product_variants: productVariants,
        x_position: values.x_position,
        y_position: values.y_position,
        frame_width: values.frame_width,
        frame_height: values.frame_height,
        x_position_back: values.x_position_back,
        y_position_back: values.y_position_back,
        frame_width_back: values.frame_width_back,
        frame_height_back: values.frame_height_back,
      };

      setLoading(true);

      const response = await commonAddUpdateQuery(
        productId ? `/products/${productId}` : "/products",
        reqBody,
        productId ? "PATCH" : "POST"
      );

      setLoading(false);

      if (response) {
        navigation(ROUTE_ADMIN_PRODUCTS);
      }
    },
  });

  const getSubCategoriesByCategoryId = (categoryId, categories = categoriesData) => {
    const category = find(categories, { id: categoryId });

    return category
      ? category.sub_categories.map((subCategory) => ({
          id: subCategory.id,
          title: subCategory.name,
        }))
      : [];
  };

  const handleCategoryChange = (e) => {
    const categoryId = Number(getSelectId(e.target.value));

    setSubCategoryList(getSubCategoriesByCategoryId(categoryId));
    formik.setFieldValue("subcategory_id", "");
  };

  const getProductData = async () => {
    const response = await commonGetQuery(`/products/${productId}`);

    if (!response) return;

    const { data } = response.data;
    const variants = get(data, "product_variants") || [];
    const firstSizes = get(variants, "0.sub_variants") || [];

    setProductData(data);

    formik.setValues({
      ...formik.values,
      name: data.name || "",
      description: data.description || "",
      price: data.price || "",
      double_design_price: data.double_design_price || "0",
      category_id: data.category
        ? `${data.category.id},${data.category.name}`
        : "",
      subcategory_id: data.sub_category
        ? `${data.sub_category.id},${data.sub_category.name}`
        : "",
      status:
        data.status === false
          ? `false,${t("Inactive")}`
          : `true,${t("Active")}`,
      x_position: data.x_position || DEFAULT_FRAME.x,
      y_position: data.y_position || DEFAULT_FRAME.y,
      frame_width: data.frame_width || DEFAULT_FRAME.width,
      frame_height: data.frame_height || DEFAULT_FRAME.height,
      x_position_back: data.x_position_back || DEFAULT_FRAME.x,
      y_position_back: data.y_position_back || DEFAULT_FRAME.y,
      frame_width_back: data.frame_width_back || DEFAULT_FRAME.width,
      frame_height_back: data.frame_height_back || DEFAULT_FRAME.height,
      quantity: get(firstSizes, "0.quantity") || 9999,
      sub_variants:
        size(firstSizes) > 0
          ? firstSizes.map((subVariant) => ({ value: subVariant.value || "" }))
          : [{ value: "" }],
      product_variants:
        size(variants) > 0
          ? variants.map((variant, index) => ({
              color_id: variant.color
                ? `${variant.color.id},${variant.color.name}`
                : "",
              image_id: variant.image_id || "",
              // Before per-color back photos, the product's back photo
              // belonged to the main color, so keep it there.
              image_id_back:
                variant.image_id_back ||
                (index === 0 ? data.image_id_back || "" : ""),
              variant_status:
                variant.variant_status === false
                  ? `false,${t("Inactive")}`
                  : `true,${t("Active")}`,
            }))
          : [
              {
                ...createVariant(t),
                image_id: data.image_id || "",
                image_id_back: data.image_id_back || "",
              },
            ],
    });
  };

  const loadFormData = async () => {
    setLoading(true);

    const [categoriesResponse, colorsResponse] = await Promise.all([
      commonGetQuery("/categories"),
      commonGetQuery("/colors"),
    ]);

    const categories = get(categoriesResponse, "data.data") || [];
    setCategoriesData(categories);
    setCategoryList(
      categories.map((item) => ({ id: item.id, title: item.name }))
    );

    const colors = get(colorsResponse, "data.data") || [];
    setColorList(colors.map((item) => ({ id: item.id, title: item.name })));

    if (productId) {
      await getProductData();
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!isEmpty(categoriesData) && !isEmpty(productData)) {
      setSubCategoryList(
        getSubCategoriesByCategoryId(Number(get(productData, "category_id")))
      );
    }
  }, [categoriesData, productData]);

  useEffect(() => {
    loadFormData();
  }, []);

  const variants = formik.values.product_variants;
  const sizes = formik.values.sub_variants;

  return (
    <ProductFormWrapper>
      {loading && <LoaderContainer />}
      <CommonWhiteBackground>
        <FlexBox>
          <div className="main-title title-wrapper">
            {productId ? t("Edit Product") : t("Add Product")}
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
                <section className="form-section">
                  <div className="section-header">
                    <h4>{t("Product Details")}</h4>
                  </div>
                  <hr />
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
                      <SelectComponent
                        fullWidth
                        name="status"
                        size="small"
                        title={t("Status")}
                        optionList={statusList}
                        formik={formik}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-lg-6">
                      <SelectComponent
                        fullWidth
                        name="category_id"
                        size="small"
                        title={t("Select Categories")}
                        onChange={handleCategoryChange}
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
                      <InputComponent
                        name="double_design_price"
                        InnerPlaceholder={t("Price for Second Design")}
                        fullWidth
                        formik={formik}
                        disabled={loading}
                        label={t("Price for Second Design")}
                      />
                    </div>
                    <div className="col-12">
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
                  </div>
                </section>

                <section className="form-section">
                  <FieldArray
                    name="sub_variants"
                    render={({ remove, push }) => (
                      <>
                        <div className="section-header">
                          <h4>{t("Sizes")}</h4>
                          <ButtonComponent
                            variant="contained"
                            startIcon={<AddIcon />}
                            text={t("Add Sub Variant")}
                            className="sub-variant-value-btn"
                            onClick={() => push({ value: "" })}
                          />
                        </div>
                        <p className="section-hint">
                          {t("Quantity is applied to every size of every color.")}
                        </p>
                        <hr />
                        <div className="row g-3">
                          <div className="col-lg-3 col-sm-6">
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
                        <div className="row g-3 mt-1">
                          {map(sizes, (item, sizeIndex) => (
                            <div className="col-lg-3 col-sm-6" key={sizeIndex}>
                              <div className="d-flex">
                                <div className="flex-grow-1">
                                  <InputComponent
                                    InnerPlaceholder={t("Sub Variant Value")}
                                    fullWidth
                                    inputClassname="mb-0"
                                    name={`sub_variants.${sizeIndex}.value`}
                                    value={item.value}
                                    formik={formik}
                                    isUseCustomeValue
                                    label={t("Sub Variant Value")}
                                  />
                                </div>
                                <div className="ms-2 pb-2 align-self-end">
                                  <DeleteOutlineOutlinedIcon
                                    className={`size-remove ${
                                      size(sizes) < 2 ? "disabled" : ""
                                    }`}
                                    onClick={() => {
                                      if (size(sizes) > 1) remove(sizeIndex);
                                    }}
                                  />
                                </div>
                              </div>
                              <ErrorMessage
                                component="p"
                                className="input-error"
                                name={`sub_variants.${sizeIndex}.value`}
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  />
                </section>

                <section className="form-section">
                  <FieldArray
                    name="product_variants"
                    render={({ remove, push }) => (
                      <>
                        <div className="section-header">
                          <h4>{t("Colors and Photos")}</h4>
                          <ButtonComponent
                            variant="contained"
                            startIcon={<AddIcon />}
                            text={t("Add Color")}
                            onClick={() => push(createVariant(t))}
                          />
                        </div>
                        <p className="section-hint">
                          {t(
                            "The main color's photos are the product cover and set the print area preview."
                          )}
                        </p>
                        <hr />
                        <div className="row g-4">
                          {map(variants, (variant, variantIndex) => (
                            <div className="col-xl-6" key={variantIndex}>
                              <div className="product-variant-box">
                                <div className="variant-header">
                                  <span className="variant-badge">
                                    {variantIndex === 0
                                      ? t("Main color")
                                      : `${t("Color")} ${variantIndex + 1}`}
                                  </span>
                                  <ButtonComponent
                                    variant="outlined"
                                    startIcon={<DeleteOutlineOutlinedIcon />}
                                    text={t("Remove")}
                                    fontSize="12px"
                                    disabled={size(variants) < 2}
                                    onClick={() => {
                                      if (size(variants) > 1) {
                                        remove(variantIndex);
                                      }
                                    }}
                                  />
                                </div>
                                <div className="row g-3">
                                  <div className="col-md-6">
                                    <SelectComponent
                                      title={t("Select Color")}
                                      fullWidth
                                      size="small"
                                      name={`product_variants.${variantIndex}.color_id`}
                                      value={variant.color_id}
                                      isShowValue
                                      optionList={colorList}
                                      formik={formik}
                                      disabled={loading}
                                    />
                                    <ErrorMessage
                                      component="p"
                                      className="input-error"
                                      name={`product_variants.${variantIndex}.color_id`}
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <SelectComponent
                                      title={t("Status")}
                                      fullWidth
                                      size="small"
                                      name={`product_variants.${variantIndex}.variant_status`}
                                      value={variant.variant_status}
                                      isShowValue
                                      optionList={statusList}
                                      formik={formik}
                                      disabled={loading}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <label className="mb-2">
                                      {t("Front side")}
                                    </label>
                                    <ImageUploadBox
                                      name={`product_variants.${variantIndex}.image_id`}
                                      id={variant.image_id}
                                      formik={formik}
                                    />
                                    <ErrorMessage
                                      component="p"
                                      className="input-error"
                                      name={`product_variants.${variantIndex}.image_id`}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <label className="mb-2">
                                      {t("Back side")}
                                    </label>
                                    <ImageUploadBox
                                      name={`product_variants.${variantIndex}.image_id_back`}
                                      id={variant.image_id_back}
                                      formik={formik}
                                    />
                                    {variantIndex > 0 &&
                                      !variant.image_id_back && (
                                        <p className="field-hint">
                                          {t(
                                            "Optional. If empty, the main color's back photo is shown."
                                          )}
                                        </p>
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  />
                </section>

                <section className="form-section">
                  <div className="section-header">
                    <h4>{t("Print Area")}</h4>
                  </div>
                  <p className="section-hint">
                    {t("The print area is the same for every color.")}
                  </p>
                  <hr />
                  {FRAME_SIDES.map((side) => {
                    const imageId = get(variants, `0.${side.imageField}`);

                    return (
                      <div className="frame-side" key={side.key}>
                        <div className="frame-side-title">{t(side.title)}</div>
                        {imageId ? (
                          <div className="row g-4">
                            <div className="col-lg-7">
                              <div className="container-canvas">
                                <FramePreview
                                  imageId={imageId}
                                  x={formik.values[`x_position${side.suffix}`]}
                                  y={formik.values[`y_position${side.suffix}`]}
                                  width={
                                    formik.values[`frame_width${side.suffix}`]
                                  }
                                  height={
                                    formik.values[`frame_height${side.suffix}`]
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-lg-5">
                              <div className="row positions-inputs">
                                {FRAME_FIELDS.map((field) => (
                                  <div className="col-12" key={field.name}>
                                    <InputComponent
                                      name={`${field.name}${side.suffix}`}
                                      InnerPlaceholder={t(field.placeholder)}
                                      fullWidth
                                      label={t(field.label)}
                                      formik={formik}
                                      disabled={loading}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="empty-frame">{t(side.emptyText)}</div>
                        )}
                      </div>
                    );
                  })}
                </section>

                <FlexBox justifyContent="end" className="mt-3">
                  <GobackButton />
                  <ButtonComponent
                    variant="contained"
                    text={t("Save")}
                    type="submit"
                    loading={loading}
                  />
                </FlexBox>
              </div>
            </form>
          </FormikProvider>
        </div>
      </CommonWhiteBackground>
    </ProductFormWrapper>
  );
};

export default ProductForm;
