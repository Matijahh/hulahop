import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import * as Yup from "yup";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { ErrorMessage, FieldArray, FormikProvider, useFormik } from "formik";
import { find, get, isEmpty, map, size } from "lodash";
import { getSelectobjectValue } from "../../../utils/commonFunctions";
import { ROUTE_ADMIN_ABOUT_PRODUCT } from "../../../routes/routes";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { LoaderContainer } from "../../../components/Loader";

import SelectComponent from "../../../components/SelectComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ReactQuillEditor from "../../../components/ReactQuillEditor";
import ImageUploadBox from "../../../components/ImageUploadBox";
import GobackButton from "../../../components/GoBackButton";

const AboutProductFormWrapper = styled.div`
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
`;

const AboutProductForm = () => {
  const [loading, setLoading] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [aboutProductData, setAboutProductdata] = useState([]);

  const params = useParams();
  const navigation = useNavigate();
  const { t } = useTranslation();

  const validation = Yup.object().shape({
    category_id: Yup.string().required(t("Category is required!")),
    subcategory_id: Yup.string().required(t("Sub category is required!")),
    product_description_1: Yup.string().required(
      t("Product description is required!")
    ),
    product_description_2: Yup.string().required(
      t("Product description is required!")
    ),
    product_description_1_ab: Yup.string().required(
      t("Product description is required!")
    ),
    product_description_2_sb: Yup.string().required(
      t("Product description is required!")
    ),
  });

  const formik = useFormik({
    initialValues: {
      category_id: "",
      subcategory_id: "",
      product_description_1: "",
      product_description_2: "",
      product_description_1_ab: "",
      product_description_2_sb: "",
      top_bar_images_ids: [],
      size_chart_image_ids: [],
      bottom_bar_images_ids: [],
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      let id = get(params, "id");
      const URL = id ? `/about-product-data/${id}` : "/about-product-data";
      let categoryId = getSelectobjectValue(values.category_id);
      let subcategoryId = getSelectobjectValue(values.subcategory_id);
      const reqBody = {
        category_id: categoryId.id,
        subcategory_id: subcategoryId.id,
        product_description_1: values.product_description_1,
        product_description_2: values.product_description_2,
        product_description_1_ab: values.product_description_1_ab,
        product_description_2_sb: values.product_description_2_sb,
        top_bar_images_ids: values.top_bar_images_ids,
        size_chart_image_ids: values.size_chart_image_ids,
        bottom_bar_images_ids: values.bottom_bar_images_ids,
      };
      setLoading(true);
      await commonAddUpdateQuery(URL, reqBody, id ? "PATCH" : "POST");
      setLoading(false);
      navigation(ROUTE_ADMIN_ABOUT_PRODUCT);
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

      let id = get(params, "id");

      if (id) {
        getAboutProductData();
      }
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

  const handleChangeTextArea = (name, value) => {
    formik.setFieldValue(name, value);
  };

  const getAboutProductData = async () => {
    setLoading(true);

    let id = get(params, "id");
    const response = await commonGetQuery(`/about-product-data/${id}`);

    if (response) {
      const { data } = response.data;

      const {
        category_id,
        product_description_1,
        product_description_2,
        product_description_1_ab,
        product_description_2_sb,
        about_product_top_bar_image,
        about_product_size_chart_image,
        about_product_bottom_bar_images,
        category,
        sub_category,
      } = data;

      setAboutProductdata(data);

      if (size(categoriesData) > 0) {
        const subCategoriesData = getSubCategoriesByCategoryId(
          Number(category_id)
        );
        setSubCategoryList(subCategoriesData || []);
      }

      let topBarImagesIds = [];
      if (size(about_product_top_bar_image) > 0) {
        topBarImagesIds = map(about_product_top_bar_image, "top_bar_images_id");
      }

      let sizeChartImagesIds = [];
      if (about_product_size_chart_image) {
        sizeChartImagesIds = map(
          about_product_size_chart_image,
          "size_chart_image_id"
        );
      }

      let bottomBarImagesIds = [];
      if (size(about_product_bottom_bar_images) > 0) {
        bottomBarImagesIds = map(
          about_product_bottom_bar_images,
          "bottom_bar_images_id"
        );
      }

      formik.setFieldValue(
        "product_description_1",
        product_description_1 || ""
      );

      formik.setFieldValue(
        "product_description_2",
        product_description_2 || ""
      );

      formik.setFieldValue(
        "product_description_1_ab",
        product_description_1_ab || ""
      );

      formik.setFieldValue(
        "product_description_2_sb",
        product_description_2_sb || ""
      );

      formik.setFieldValue("top_bar_images_ids", topBarImagesIds || "");
      formik.setFieldValue("size_chart_image_ids", sizeChartImagesIds || "");
      formik.setFieldValue("bottom_bar_images_ids", bottomBarImagesIds || "");
      formik.setFieldValue("category_id", `${category?.id},${category?.name}`);
      formik.setFieldValue(
        "subcategory_id",
        `${sub_category.id},${sub_category.name}`
      );

      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isEmpty(categoriesData) && !isEmpty(aboutProductData)) {
      if (size(categoriesData) > 0) {
        const subCategoriesData = getSubCategoriesByCategoryId(
          Number(get(aboutProductData, "category_id"))
        );

        setSubCategoryList(subCategoriesData || []);
      }
    }
  }, [categoriesData, aboutProductData]);

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <AboutProductFormWrapper>
      {loading && <LoaderContainer />}
      <CommonWhiteBackground>
        <FlexBox className="title-wrapper">
          <div className="main-title ">
            {get(params, "id")
              ? t("Edit About Product Data")
              : t("Add About Product Data")}
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
                  <div className="col-12 col-lg-6">
                    <ReactQuillEditor
                      handleChange={(e) =>
                        handleChangeTextArea("product_description_1", e)
                      }
                      name="product_description_1"
                      value={formik.values.product_description_1}
                      label={`${t("Product Description")} 1 ${t("English")}`}
                    />
                    {formik.errors.product_description_1 && (
                      <p className="error-msg">
                        {formik.errors.product_description_1}
                      </p>
                    )}
                  </div>
                  <div className="col-12 col-lg-6">
                    <ReactQuillEditor
                      handleChange={(e) =>
                        handleChangeTextArea("product_description_1_ab", e)
                      }
                      name="product_description_1_ab"
                      value={formik.values.product_description_1_ab}
                      label={`${t("Product Description")} 1 ${t("Serbian")}`}
                    />
                    {formik.errors.product_description_1_ab && (
                      <p className="error-msg">
                        {formik.errors.product_description_1_ab}
                      </p>
                    )}
                  </div>
                  <div className="col-12 col-lg-6">
                    <ReactQuillEditor
                      handleChange={(e) =>
                        handleChangeTextArea("product_description_2", e)
                      }
                      name="product_description_2"
                      value={formik.values.product_description_2}
                      label={`${t("Product Description")} 2 ${t("English")}`}
                    />
                    {formik.errors.product_description_2 && (
                      <p className="error-msg">
                        {formik.errors.product_description_2}
                      </p>
                    )}
                  </div>
                  <div className="col-12 col-lg-6">
                    <ReactQuillEditor
                      handleChange={(e) =>
                        handleChangeTextArea("product_description_2_sb", e)
                      }
                      name="product_description_2_sb"
                      value={formik.values.product_description_2_sb}
                      label={`${t("Product Description")} 2 ${t("Serbian")}`}
                    />
                    {formik.errors.product_description_2_sb && (
                      <p className="error-msg">
                        {formik.errors.product_description_2_sb}
                      </p>
                    )}
                  </div>
                  <div className="col-lg-12">
                    <h5 className="mb-3">{t("Top Bar Images")}</h5>
                    <div className="row g-4 ">
                      <FieldArray
                        name="top_bar_images_ids"
                        render={({ remove, push }) => (
                          <>
                            {size(formik.values.top_bar_images_ids) > 0 &&
                              map(
                                formik.values.top_bar_images_ids,
                                (item, index) => {
                                  return (
                                    <div className="col-lg-6">
                                      <ImageUploadBox
                                        name={`top_bar_images_ids.${index}`}
                                        id={item}
                                        formik={formik}
                                      />
                                      <FlexBox className="justify-content-end mt-2">
                                        <ButtonComponent
                                          variant="contained"
                                          width="100%"
                                          text="Remove"
                                          onClick={() => {
                                            remove(index);
                                          }}
                                        />
                                      </FlexBox>
                                    </div>
                                  );
                                }
                              )}
                            <div
                              className="add-product-btn"
                              onClick={() => push(0)}
                            >
                              <AddOutlinedIcon />
                            </div>
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <h5 className="mb-3">{t("Bottom Bar Images")}</h5>
                    <div className="row g-4 ">
                      <FieldArray
                        name="bottom_bar_images_ids"
                        render={({ remove, push }) => (
                          <>
                            {size(formik.values.bottom_bar_images_ids) > 0 &&
                              map(
                                formik.values.bottom_bar_images_ids,
                                (item, index) => {
                                  return (
                                    <div className="col-lg-6">
                                      <ImageUploadBox
                                        name={`bottom_bar_images_ids.${index}`}
                                        id={item}
                                        formik={formik}
                                      />
                                      <FlexBox className="justify-content-end mt-2">
                                        <ButtonComponent
                                          variant="contained"
                                          width="100%"
                                          text="Remove"
                                          onClick={() => {
                                            remove(index);
                                          }}
                                        />
                                      </FlexBox>
                                    </div>
                                  );
                                }
                              )}
                            <div
                              className="add-product-btn"
                              onClick={() => push(0)}
                            >
                              <AddOutlinedIcon />
                            </div>
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <h5 className="mb-3">{t("Size Chart Images")}</h5>
                    <div className="row g-4 ">
                      <FieldArray
                        name="size_chart_image_ids"
                        render={({ remove, push }) => (
                          <>
                            {size(formik.values.size_chart_image_ids) > 0 &&
                              map(
                                formik.values.size_chart_image_ids,
                                (item, index) => {
                                  return (
                                    <div className="col-lg-6">
                                      <ImageUploadBox
                                        name={`size_chart_image_ids.${index}`}
                                        id={item}
                                        formik={formik}
                                      />
                                      <FlexBox className="justify-content-end mt-2">
                                        <ButtonComponent
                                          variant="contained"
                                          width="100%"
                                          text={t("Remove")}
                                          onClick={() => {
                                            remove(index);
                                          }}
                                        />
                                      </FlexBox>
                                    </div>
                                  );
                                }
                              )}
                            <div
                              className="add-product-btn"
                              onClick={() => push(0)}
                            >
                              <AddOutlinedIcon />
                            </div>
                          </>
                        )}
                      />
                    </div>
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
    </AboutProductFormWrapper>
  );
};

export default AboutProductForm;
