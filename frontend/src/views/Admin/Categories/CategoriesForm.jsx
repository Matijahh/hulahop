import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { ACCESS_TOKEN, REST_URL_SERVER } from "../../../utils/constant";
import * as Yup from "yup";
import axios from "axios";

import ModalComponent from "../../../components/ModalComponent";
import InputComponent from "../../../components/InputComponent";
import SelectComponent from "../../../components/SelectComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import BoxFileInput from "../../../components/BoxFileInput";

import { FlexBox } from "../../../components/Sections";
import { ErrorTaster } from "../../../components/Toast";

const CategoriesForm = ({ isOpen, toggle, refresh, data, length }) => {
  const { t } = useTranslation();

  const [parentCategoryList, setParentCategoryList] = useState([
    { id: 0, title: t("Global Category") },
  ]);
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

  const optionList = [
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
  });

  const formik = useFormik({
    initialValues: {
      id: null,
      parentCategory: `0,${t("Global Category")}`,
      name: "",
      active: `true,${t("Active")}`,
      previewURL: null,
      imageObj: null,
      imageId: null,
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      let reqBody = {
        name: values.name,
        active: values.active.split(",")[0] === "true" ? true : false,
        image_id: values.imageId,
        category_order: length + 1,
      };

      if (values.parentCategory.split(",")[0] !== "0") {
        reqBody.category_id = parseInt(values.parentCategory.split(",")[0]);
        reqBody.sub_category_order = subCategories.length + 1;
        reqBody.category_order = undefined;
      }

      const URL =
        values.parentCategory.split(",")[0] !== "0"
          ? values.id
            ? `/sub_categories/${values.id}`
            : "/sub_categories"
          : values.id
          ? `/categories/${values.id}`
          : "/categories";

      setLoading(true);

      const response = await commonAddUpdateQuery(
        URL,
        reqBody,
        values.id ? "PATCH" : "POST"
      );

      setLoading(false);

      if (response) {
        toggle();
        refresh();
        formik.resetForm();
      }
    },
  });

  const categoryId = formik.values.parentCategory?.split(",")[0];

  const uploadImage = async (file) => {
    try {
      let formData = new FormData();
      formData.append("image", file);

      setFileLoading(true);

      const response = await axios.post(
        `${REST_URL_SERVER}/images/upload-compressed`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      setFileLoading(false);

      if (response.status === 200) {
        const { data } = response.data;
        formik.setFieldValue("imageId", data.id);
      }
    } catch (error) {
      setFileLoading(false);

      if (error && error.data) {
        const { message } = error.data;
        return ErrorTaster(t(message));
      }
    }
  };

  const onFileSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      uploadImage(file);
    }
  };

  const getParentCategory = async () => {
    const EditedCategory = data;
    const response = await commonGetQuery("/categories");

    if (response) {
      const { data } = response.data;
      const updatedList =
        data &&
        data.map((item) => {
          return { id: item.id, title: item.name };
        });

      if (EditedCategory) {
        const FindCategoryObj = updatedList.find(
          (item) => item.id === EditedCategory.category_id
        );

        if (FindCategoryObj && EditedCategory.isSubCategory) {
          formik.setFieldValue(
            "parentCategory",
            `${FindCategoryObj.id},${FindCategoryObj.title}`
          );
        }
      }

      setParentCategoryList([parentCategoryList[0], ...updatedList] || []);
    }
  };

  const onDeselect = () => {
    formik.setFieldValue("imageId", null);
  };

  const getSubCategoriesByCategoryId = async () => {
    const response = await commonGetQuery(
      `/sub_categories/category/${categoryId}`
    );
    setSubCategories(response?.data?.data ?? []);
  };

  useEffect(() => {
    getParentCategory();
  }, []);

  useEffect(() => {
    if (Number(categoryId > 0)) {
      getSubCategoriesByCategoryId();
    }
  }, [categoryId]);

  useEffect(() => {
    if (data) {
      formik.setValues({
        ...formik.values,
        id: data.id,
        parentCategory: `0,${t("Global Category")}`,
        name: data.name,
        active: data.active ? `true,${t("Active")}` : `false,${t("Inactive")}`,
        imageId: data.image_id,
      });
    } else {
      formik.resetForm();
    }
  }, [data]);

  return (
    <ModalComponent
      title={data ? t("Edit Category") : t("Add Category")}
      size={"m"}
      open={isOpen}
      handleClose={toggle}
    >
      <form onSubmit={formik.handleSubmit}>
        <SelectComponent
          fullWidth
          optionList={parentCategoryList}
          name="parentCategory"
          formik={formik}
          title={t("Select Parent Category")}
          disabled={loading}
        />
        <InputComponent
          label={t("Category Name")}
          fullWidth
          InnerPlaceholder={t("Enter Category Name")}
          name="name"
          formik={formik}
          className="mt-3"
          disabled={loading}
        />
        <SelectComponent
          fullWidth
          optionList={optionList}
          name="active"
          formik={formik}
          title={t("Status")}
          className="mt-2"
          disabled={loading}
        />

        <div className="mt-3">
          <BoxFileInput
            previewURL={
              formik.values.imageId &&
              `${REST_URL_SERVER}/images/compressed/${formik.values.imageId}`
            }
            onFileSelect={onFileSelect}
            onCancel={onDeselect}
            type="image/*"
            loading={fileLoading}
            disabled={loading}
          />
        </div>

        <>
          <FlexBox hasBorderTop={true} className="pt-3 mt-3">
            <ButtonComponent
              className=""
              variant="outlined"
              fullWidth
              text={t("Cancel")}
              onClick={toggle}
            />
            <ButtonComponent
              variant="contained"
              fullWidth
              text={data ? t("Edit Category") : t("Add Category")}
              type="submit"
              loading={loading}
            />
          </FlexBox>
        </>
      </form>
    </ModalComponent>
  );
};

export default CategoriesForm;
