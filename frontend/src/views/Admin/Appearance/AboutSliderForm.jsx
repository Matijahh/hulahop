import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import { ROUTE_ADMIN_APPEARANCE } from "../../../routes/routes";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import styled from "styled-components";
import * as Yup from "yup";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";

import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import SelectComponent from "../../../components/SelectComponent";
import ImageUploadBox from "../../../components/ImageUploadBox";
import GobackButton from "../../../components/GoBackButton";

export const ColorsFormWrapper = styled.div``;

const AboutSliderForm = () => {
  const [loading, setLoading] = useState();

  const navigation = useNavigate();
  const params = useParams();
  const { t } = useTranslation();

  const StatusList = [
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
    image_id: Yup.string().required(t("Image is required!")),
    description: Yup.string().required(t("Description is required!")),
  });

  const formik = useFormik({
    initialValues: {
      image_id: "",
      description: "",
      status: `true,${t("Active")}`,
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      let id = get(params, "id");
      const URL = id ? `/about_page_slider/${id}` : "/about_page_slider";

      const reqBody = {
        image_id: values.image_id,
        description: values.description,
        status: values.status.split(",")[0] === "true" ? true : false,
      };

      setLoading(true);

      await commonAddUpdateQuery(URL, reqBody, id ? "PATCH" : "POST");

      setLoading(false);
      navigation(ROUTE_ADMIN_APPEARANCE);
    },
  });

  const getAboutPageSlider = async () => {
    setLoading(true);

    let id = get(params, "id");
    const response = await commonGetQuery(`/about_page_slider/${id}`);

    if (response) {
      const { data } = response.data;
      const { image_id, description, status } = data;
      formik.setFieldValue("image_id", image_id);
      formik.setFieldValue("description", description);
      formik.setFieldValue(
        "status",
        status ? `true,${t("Active")}` : `false,${t("Inactive")}`
      );
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    let id = get(params, "id");

    if (id) {
      getAboutPageSlider();
    }
  }, []);

  return (
    <ColorsFormWrapper>
      <CommonWhiteBackground>
        <FlexBox>
          <div className="main-title title-wrapper">
            {get(params, "id")
              ? t("Edit About Us Slider Slides")
              : t("Add About Us Slider Slides")}
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
                <div className="col-lg-5">
                  <ImageUploadBox
                    name="image_id"
                    id={formik.values.image_id}
                    formik={formik}
                  />
                  {formik &&
                    formik.touched["image_id"] &&
                    formik.errors["image_id"] && (
                      <p className="input-error">
                        {formik &&
                          formik.touched["image_id"] &&
                          formik.errors["image_id"]}
                      </p>
                    )}
                </div>
                <div className="col-lg-7">
                  <div className="row g-4">
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
                      <SelectComponent
                        fullWidth
                        name="status"
                        optionList={StatusList}
                        formik={formik}
                        title={t("Select Status")}
                        disabled={loading}
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
              </div>
            </div>
          </form>
        </div>
      </CommonWhiteBackground>
    </ColorsFormWrapper>
  );
};

export default AboutSliderForm;
