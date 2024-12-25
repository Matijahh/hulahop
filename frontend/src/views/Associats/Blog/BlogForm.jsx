import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { ROUTE_ASSOCIATE_BLOG } from "../../../routes/routes";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { get } from "lodash";
import styled from "styled-components";
import * as Yup from "yup";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { Checkbox } from "@mui/material";

import ReactQuillEditor from "../../../components/ReactQuillEditor";
import InputComponent from "../../../components/InputComponent";
import ImageUploadBox from "../../../components/ImageUploadBox";
import ButtonComponent from "../../../components/ButtonComponent";
import GobackButton from "../../../components/GoBackButton";

const BlogFormWrapper = styled.div``;

const AssociateBlogForm = () => {
  const [loading, setLoading] = useState();
  const [checked, setChecked] = useState(false);

  const navigation = useNavigate();
  const params = useParams();
  const { t } = useTranslation();

  const validation = Yup.object().shape({
    heading: Yup.string().required(t("Heading is required!")),
    content: Yup.string().required(t("Content is required!")),
  });

  const formik = useFormik({
    initialValues: {
      image_id: null,
      heading: "",
      category_name: "",
      content: "",
      show_on_main: false,
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      let id = get(params, "id");

      const URL = id ? `/associate_blogs/${id}` : "/associate_blogs";

      const reqBody = {
        heading: values.heading,
        category_name: values.category_name,
        content: values.content,
        image_id: values.image_id,
        show_on_main: checked ? 1 : 0,
      };

      setLoading(true);

      await commonAddUpdateQuery(URL, reqBody, id ? "PATCH" : "POST");

      setLoading(false);
      navigation(ROUTE_ASSOCIATE_BLOG);
    },
  });

  const handleChangeTextArea = (name, value) => {
    formik.setFieldValue(name, value);
  };

  const getBlogData = async () => {
    setLoading(true);

    let id = get(params, "id");

    const response = await commonGetQuery(`/associate_blogs/${id}`);

    if (response) {
      const { data } = response.data;
      const { image_id, heading, category_name, content, show_on_main } = data;
      formik.setFieldValue("image_id", image_id);
      formik.setFieldValue("heading", heading);
      formik.setFieldValue("category_name", category_name);
      formik.setFieldValue("content", content);
      setChecked(show_on_main);
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    let id = get(params, "id");

    if (id) {
      getBlogData();
    }
  }, []);

  return (
    <BlogFormWrapper>
      <CommonWhiteBackground>
        <FlexBox>
          <div className="main-title ">
            {get(params, "id") ? t("Edit Blog") : t("Add Blog")}
          </div>
        </FlexBox>
        <hr />
        <div className="commomn-form-wrapper">
          <form
            action=""
            className="commomn-form"
            onSubmit={formik.handleSubmit}
          >
            <div className="container-fluid">
              <div className="row g-4">
                <div className="col-lg-12">
                  <ImageUploadBox
                    name="image_id"
                    id={formik.values.image_id}
                    formik={formik}
                  />
                </div>
                <div className="col-lg-12">
                  <InputComponent
                    name="heading"
                    InnerPlaceholder={t("Blog Heading")}
                    fullWidth
                    label={t("Blog Heading")}
                    formik={formik}
                    disabled={loading}
                  />
                </div>
                <div className="col-lg-12">
                  <InputComponent
                    name="category_name"
                    InnerPlaceholder={t("Blog Category")}
                    fullWidth
                    formik={formik}
                    disabled={loading}
                    label={t("Blog Category")}
                  />
                </div>
                <div className="col-lg-12">
                  <ReactQuillEditor
                    handleChange={(e) => handleChangeTextArea("content", e)}
                    name="content"
                    value={formik.values.content}
                    label={t("Blog Content")}
                  />
                </div>

                <div className="col-lg-12">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={checked}
                      onChange={(_, checked) => setChecked(checked)}
                    />
                    <label>{t("Show on Main Page")}</label>
                  </div>
                </div>

                <div className="col-12">
                  <FlexBox justifyContent="end" className="mt-3">
                    <GobackButton />
                    <ButtonComponent
                      variant="contained"
                      text={t("Save")}
                      type="submit"
                      disabled={loading}
                    />
                  </FlexBox>
                </div>
              </div>
            </div>
          </form>
        </div>
      </CommonWhiteBackground>
    </BlogFormWrapper>
  );
};

export default AssociateBlogForm;
