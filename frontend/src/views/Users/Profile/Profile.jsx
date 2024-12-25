import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { Col, Row } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import * as Yup from "yup";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { ACCESS_TOKEN, REST_URL_SERVER } from "../../../utils/constant";
import { getUserType } from "../../../utils/commonFunctions";
import axios from "axios";

import ProfileComponent from ".";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import NoImage from "../../../assets/images/no-image-placeholder.png";

import { Loader } from "../../../components/Loader";
import { ErrorTaster, SuccessTaster } from "../../../components/Toast";
import { Helmet } from "react-helmet";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(t("First name is required.")),
    lastName: Yup.string().required(t("Last name is required.")),
    phone: Yup.string()
      .matches(/^\d{10}$/, t("Invalid phone number."))
      .required(t("Phone number is required.")),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      image_id: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const decoded = jwtDecode(ACCESS_TOKEN);

      setLoading(true);

      const response = await commonAddUpdateQuery(
        `/users/${decoded.id}`,
        {
          first_name: values.firstName,
          last_name: values.lastName,
          // email: values.email,
          mobile: values.phone,
          type: getUserType(),
          image_id: values.image_id,
        },
        "PATCH"
      );

      setLoading(false);

      if (response) {
        const { message } = response.data;
        SuccessTaster(t(message));
      }
    },
  });

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append("image", file);

    try {
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

      if (response.status === 200) {
        const { data } = response.data;
        formik.setFieldValue("image_id", data.id);
        setFileLoading(false);
      }
    } catch (error) {
      setFileLoading(false);

      if (error && error.data) {
        const { message } = error.data;
        return ErrorTaster(t(message));
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target && e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const getUserData = async () => {
    const decoded = jwtDecode(ACCESS_TOKEN);

    setLoading(true);

    const response = await commonGetQuery(`/users/${decoded.id}`);

    setLoading(false);

    if (response) {
      const { data } = response.data;

      setUserData(data);

      formik.setValues({
        ...formik.values,
        firstName: data.first_name,
        lastName: data.last_name,
        // email: data.email,
        phone: data.mobile,
        image_id: data.image_id,
      });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <ProfileComponent>
      <Helmet>
        <title>{t("Profile Settings - HulaHop")}</title>
      </Helmet>

      <div className="profile-box">
        <div className="hero-section">
          <h3 className="banner-head">{t("Edit Profile")}</h3>
        </div>
        <Row>
          <Col md={2} lg={2} sm={2}>
            <label>{t("Profile Picture")}</label>
            {fileLoading ? (
              <Loader />
            ) : (
              <div className="profile-pic-image">
                {formik.values.image_id ? (
                  <img
                    src={`${REST_URL_SERVER}/images/compressed/${formik.values.image_id}`}
                  />
                ) : (
                  <img src={NoImage} />
                )}
                <input
                  type="file"
                  className="hidden-input"
                  onChange={handleFileChange}
                />
                <div className="pick-image-icon">
                  <AddAPhotoIcon color="#fff" />
                </div>
              </div>
            )}
          </Col>
          <Col md={10} lg={10} sm={10}>
            <Row className="gy-3">
              <Col md={6} lg={6} sm={12}>
                <InputComponent
                  label={t("First Name")}
                  fullWidth
                  InnerPlaceholder={t("Enter First Name")}
                  name="firstName"
                  formik={formik}
                />
              </Col>
              <Col md={6} lg={6} sm={12}>
                <InputComponent
                  label={t("Last Name")}
                  fullWidth
                  InnerPlaceholder={t("Enter Last Name")}
                  name="lastName"
                  formik={formik}
                />
              </Col>
              <Col md={6} lg={6} sm={12}>
                <InputComponent
                  label={t("Email")}
                  fullWidth
                  InnerPlaceholder={t("Enter Email")}
                  name="email"
                  disabled
                />
              </Col>
              <Col md={6} lg={6} sm={12}>
                <InputComponent
                  label={t("Phone")}
                  fullWidth
                  InnerPlaceholder={t("Enter Phone Number")}
                  name="phone"
                  formik={formik}
                />
              </Col>
            </Row>
          </Col>
          <Col md={7} lg={7} sm={7} className="mt-4"></Col>
          <Col md={5} lg={5} sm={5} className="mt-4">
            <Row className="g-3">
              <Col md={6} lg={6} sm={6}></Col>
              <Col md={6} lg={6} sm={6}>
                <ButtonComponent
                  onClick={formik.handleSubmit}
                  variant="contained"
                  width="100%"
                  text={t("Save")}
                  loading={loading}
                  disabled={loading}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </ProfileComponent>
  );
};

export default Profile;
