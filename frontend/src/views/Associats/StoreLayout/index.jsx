import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { slugifyString } from "../../../utils/commonFunctions";
import { jwtDecode } from "jwt-decode";
import { ROUTE_ASSOCIATE_BRAND_STORE } from "../../../routes/routes";
import { ACCESS_TOKEN, REST_URL_SERVER } from "../../../utils/constant";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import axios from "axios";
import { connect } from "react-redux";
import * as Yup from "yup";
import * as Action from "../../../redux/actions";

import ButtonComponent from "../../../components/ButtonComponent";
import InputComponent from "../../../components/InputComponent";
import BoxFileInput from "../../../components/BoxFileInput";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { Col, Row } from "react-bootstrap";
import { ErrorTaster, SuccessTaster } from "../../../components/Toast";
import { Helmet } from "react-helmet";

const StoreLayout = () => {
  const [fileLoading, setFileLoading] = useState({
    loading: false,
    for: "logo",
  });
  const [storeName, setStoreName] = useState("");
  const [loading, setLoading] = useState(false);
  const decoded = jwtDecode(ACCESS_TOKEN);

  const { t } = useTranslation();

  const validation = Yup.object().shape({
    name: Yup.string()
      .required(t("Store name is required!"))
      .test(
        "no-invalid-characters",
        t("Store name can only contain letters and spaces!"),
        (value) => value && /^[a-zA-Z\s]+$/.test(value)
      ),
    logo_image: Yup.string().required(t("Store logo is required!")),
    description: Yup.string().required(t("Store description is required!")),
    sliderName: Yup.string().required(t("Slider name is required!")),
    sliderImage: Yup.string().required(t("Slider image is required!")),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      logo_image: "",
      description: "",
      ig_url: "",
      yt_url: "",
      fb_url: "",
      sliderName: "",
      sliderDesc: "",
      sliderImage: "",
      id: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      const reqBody = {
        user_id: decoded?.id,
        name: values?.name,
        logo_image: values?.logo_image,
        description: values?.description,
        social_links: {
          ig_url: values?.ig_url,
          yt_url: values?.yt_url,
          fb_url: values?.fb_url,
        },
        slider_name: values?.sliderName,
        slider_description: values?.sliderDesc,
        slider_image: values?.sliderImage,
      };

      setLoading(true);

      const response = await commonAddUpdateQuery(
        values?.id
          ? `/store_layout_details/${values?.id}`
          : "/store_layout_details",
        reqBody,
        values?.id ? "PATCH" : "POST"
      );

      setLoading(false);

      if (response) {
        const { message } = response.data;
        SuccessTaster(t(message));
      }
    },
  });

  const handleUploadImage = async (file, name) => {
    try {
      let formData = new FormData();

      formData.append("image", file);

      setFileLoading({
        loading: true,
        for: name,
      });

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

      setFileLoading({
        loading: false,
        for: name,
      });

      if (response.status === 200) {
        const { data } = response.data;
        if (name === "sliderImage") {
          formik.setFieldValue("sliderImage", data.id);
        } else {
          formik.setFieldValue("logo_image", data.id);
        }
      }
    } catch (error) {
      setFileLoading({
        loading: false,
        for: name,
      });

      if (error && error.data) {
        const { message } = error.data;
        return ErrorTaster(t(message));
      }
    }
  };

  const onLogoSelect = (e, name) => {
    const file = e.target && e.target.files[0];

    if (file) {
      handleUploadImage(file, name);
    }
  };

  const handleCancel = (file, name) => {
    if (name === "sliderImage") {
      formik.setFieldValue("sliderImage", null);
    } else {
      formik.setFieldValue("logo_image", null);
    }
  };

  const getStoreData = async () => {
    setLoading(true);

    const response = await commonGetQuery(
      `/store_layout_details/${decoded.id}`
    );

    setLoading(false);

    if (response) {
      const { data } = response.data;

      setStoreName(data?.name ?? "");

      formik.setValues({
        ...formik.values,
        name: data?.name,
        logo_image: data?.logo_image,
        description: data?.description,
        ig_url: data?.social_links && JSON.parse(data.social_links)?.ig_url,
        yt_url: data?.social_links && JSON.parse(data.social_links)?.yt_url,
        fb_url: data?.social_links && JSON.parse(data.social_links)?.fb_url,
        sliderName: data?.store_layout_sliders[0]?.name,
        sliderDesc: data?.store_layout_sliders[0]?.description,
        sliderImage: data?.store_layout_sliders[0]?.image_id,
        id: data?.id,
      });
    }
  };

  useEffect(() => {
    getStoreData();
  }, []);

  return (
    <CommonWhiteBackground>
      <Helmet>
        <title>{t("Store Layout - Associate")}</title>
      </Helmet>
      <FlexBox className="mb-4" isWrap>
        <div className="main-title ">{t("Store Layout")}</div>
        {formik.values.id && (
          <ButtonComponent
            variant="contained"
            text={t("View Your Shop")}
            onClick={() =>
              (window.location.href = ROUTE_ASSOCIATE_BRAND_STORE.replace(
                ":id",
                slugifyString(storeName)
              ))
            }
          />
        )}
      </FlexBox>
      <form>
        <Row className="gy-2 mb-4">
          <div className="sub-title">{t("1. Basic Details")}</div>
          <Col md={2} lg={2} sm={6}>
            <label className="mb-2">{t("Store Logo")}</label>
            <BoxFileInput
              onFileSelect={(e) => onLogoSelect(e, "store_logo")}
              previewURL={
                formik.values.logo_image &&
                `${REST_URL_SERVER}/images/compressed/${formik.values.logo_image}`
              }
              onCancel={(e) => handleCancel("store_logo")}
              loading={fileLoading.for === "store_logo" && fileLoading.loading}
            />
            {formik.touched.logo_image && formik.errors.logo_image && (
              <div className="error-msg">{formik.errors.logo_image}</div>
            )}
          </Col>
          <Col md={10} lg={10} sm={6}>
            <InputComponent
              label={t("Store Name")}
              fullWidth
              InnerPlaceholder={t("Enter Store Name")}
              type="text"
              name="name"
              formik={formik}
            />
          </Col>
          <Col className="col-12">
            <InputComponent
              label={t("About Store")}
              fullWidth
              InnerPlaceholder={t("Enter About Store Description")}
              type="textarea"
              name="description"
              formik={formik}
            />
          </Col>
          <Col md={12} lg={4} sm={4}>
            <InputComponent
              label={t("Instagram Url")}
              fullWidth
              InnerPlaceholder={t("Enter Instagram URL")}
              type="text"
              name="ig_url"
              formik={formik}
            />
          </Col>
          <Col md={12} lg={4} sm={4}>
            <InputComponent
              label={t("Youtube Url")}
              fullWidth
              InnerPlaceholder={t("Enter Youtube URL")}
              type="text"
              name="yt_url"
              formik={formik}
            />
          </Col>
          <Col md={12} lg={4} sm={4}>
            <InputComponent
              label={t("Facebook Url")}
              fullWidth
              InnerPlaceholder={t("Enter Facebook URL")}
              type="text"
              name="fb_url"
              formik={formik}
            />
          </Col>
          <div className="sub-title mt-3">{t("2. Layout Details")}</div>
          <Col md={6} lg={6} sm={6}>
            <InputComponent
              label={t("Slider Name")}
              fullWidth
              InnerPlaceholder={t("Enter Slider Name")}
              type="text"
              name="sliderName"
              formik={formik}
            />
          </Col>
          <Col md={6} lg={6} sm={6}>
            <InputComponent
              label={t("Slider Description")}
              fullWidth
              InnerPlaceholder={t("Enter Slider Description")}
              type="text"
              name="sliderDesc"
              formik={formik}
            />
          </Col>
          <Col md={2} lg={2} sm={6}>
            <label className="mb-2">{t("Slider Image")}</label>
            <BoxFileInput
              onFileSelect={(data) => onLogoSelect(data, "sliderImage")}
              previewURL={
                formik.values.sliderImage &&
                `${REST_URL_SERVER}/images/compressed/${formik.values.sliderImage}`
              }
              onCancel={(image) => handleCancel(image, "sliderImage")}
              loading={fileLoading.for === "sliderImage" && fileLoading.loading}
            />
            {formik.touched.sliderImage && formik.errors.sliderImage && (
              <div className="error-msg">{formik.errors.sliderImage}</div>
            )}
          </Col>
        </Row>
        <FlexBox justifyContent="flex-start justifyContentjustifyContentjustifyContent">
          <ButtonComponent
            onClick={formik.handleSubmit}
            variant="contained"
            text={t("Save")}
            loading={loading}
          />
        </FlexBox>
      </form>
    </CommonWhiteBackground>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = {
  saveUserData: (data) => Action.saveUserData(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreLayout);
