import { useTranslation } from "react-i18next";
import {
  ROUTE_ADMIN_DASHBOARD,
  ROUTE_ASSOCIATE_MAIN_DASHBOARD,
  ROUTE_MAIN_CHANGE_PASSWORD,
  ROUTE_MAIN_DASHBOARD,
  ROUTE_MAIN_ORDERS,
  ROUTE_MAIN_PROFILE,
  ROUTE_MAIN_WISHLIST,
  ROUTE_SIGN_UP,
} from "../../../routes/routes";
import {
  getUserType,
  handlePublicRedirection,
} from "../../../utils/commonFunctions";

import { NavLink, useNavigate } from "react-router-dom";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REST_URL_SERVER } from "../../../utils/constant";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { Loader, LoaderContainer } from "../../../components/Loader";
import ButtonComponent from "../../../components/ButtonComponent";

import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ErrorTaster, SuccessTaster } from "../../../components/Toast";
import NoImage from "../../../assets/images/no-image-placeholder.png";
import axios from "axios";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import InputComponent from "../../../components/InputComponent";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Wishlist from "./Wishlist";
import ChangePassword from "./ChangePassword";
import Orders from "./Orders";

const ProfileComponent = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const { t } = useTranslation();
  const navigate = useNavigate();

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

  const handleDashboard = () => {
    if (userData?.type === "ADMIN") {
      navigate(ROUTE_ADMIN_DASHBOARD);
    }

    if (userData?.type === "ASSOCIATE") {
      navigate(ROUTE_ASSOCIATE_MAIN_DASHBOARD);
    }

    if (userData?.type === "USER") {
      navigate(ROUTE_SIGN_UP);
    }
  };

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

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="profile-page page-wrapper">
      <div className="profile-banner-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head">{t("Profile Settings")}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-component-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <Dashboard />
            </div>
            <div className="col-lg-6">
              <Profile />
            </div>
          </div>
          <div className="row g-4 mt-2">
            <div className="col-lg-8">
              <Wishlist />
            </div>
            <div className="col-lg-4">
              <ChangePassword />
            </div>
          </div>
          <div className="row g-4 mt-2">
            <div className="col-lg-12">
              <Orders />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
