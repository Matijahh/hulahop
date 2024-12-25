import { useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { SignInContainer } from "./styled";
import { ROUTE_MAIN, ROUTE_SIGN_IN } from "../../../routes/routes";
import { commonAddUpdateQuery } from "../../../utils/axiosInstance";
import * as Yup from "yup";
import logo from "../../../assets/images/logo.png";

import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Radio from "@mui/material/Radio";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";

import { FormControlLabel } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { FlexBox } from "../../../components/Sections";
import { SuccessTaster } from "../../../components/Toast";
import { Helmet } from "react-helmet";
import {
  handleRedirection,
  setTokenAfterLogin,
  setTokenAfterRegistration,
} from "../../../utils/commonFunctions";

const SignUp = ({ maxWidth }) => {
  const [loading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);

  const navigation = useNavigate();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("Invalid email!"))
      .required(t("Email is required!")),
    password: Yup.string()
      .required(t("Password is required."))
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/,
        t("Please enter a valid password.")
      ),
    first_name: Yup.string().required(t("First name is required.")),
    last_name: Yup.string().required(t("Last name is required.")),
    mobile: Yup.string().required(t("Mobile number is required.")),
    status: Yup.boolean().required(t("Status is required.")),
    type: Yup.string().required(t("Type is required.")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("Passwords must match."))
      .required(t("Please confirm your password.")),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      status: true,
      type: "USER",
      password: "",
      confirmPassword: "",
      image_id: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (value) => {
      setLoading(true);
      const response = await commonAddUpdateQuery("/auth/sign-up", value);

      if (response) {
        const { message, data } = response.data;
        setTokenAfterRegistration(response);
        handleRedirection(data.user.type);
        SuccessTaster(t(message));
      } else {
        setLoading(false);
      }
    },
  });

  const handleCheckboxChange = (e) => {
    const value = e.target && e.target.value;
    formik.setFieldValue("type", value);
  };

  return (
    <SignInContainer maxWidth={maxWidth}>
      <Helmet>
        <title>{t("Sign Up - HulaHop")}</title>
      </Helmet>
      <div className="logo-container">
        <div
          className="cover cursor-pointer"
          onClick={() => {
            navigation(ROUTE_MAIN);
          }}
        >
          <img src={logo} />
        </div>
      </div>
      <div className="title-container">
        <div className="title">{t("Sign Up")}</div>
        <div className="description">
          {t("Please create your account to explore AI image repository.")}
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Row>
          <Col className="col-12">
            <Row>
              <Col>
                <InputComponent
                  label={t("First Name")}
                  fullWidth
                  name="first_name"
                  formik={formik}
                  disabled={loading}
                  InnerPlaceholder={t("Enter First Name")}
                  renderIcon={
                    <>
                      <PersonOutlineOutlinedIcon />
                    </>
                  }
                  hasIcon
                />
              </Col>
              <Col>
                <InputComponent
                  label={t("Last Name")}
                  fullWidth
                  name="last_name"
                  disabled={loading}
                  formik={formik}
                  InnerPlaceholder={t("Enter Last Name")}
                  renderIcon={
                    <>
                      <PersonOutlineOutlinedIcon />
                    </>
                  }
                  hasIcon
                />
              </Col>
            </Row>
          </Col>
          <Col className="col-12">
            <InputComponent
              label={t("Email")}
              fullWidth
              name="email"
              formik={formik}
              disabled={loading}
              InnerPlaceholder={t("Enter Email")}
              renderIcon={
                <>
                  <EmailOutlinedIcon />
                </>
              }
              hasIcon
            />
          </Col>
          <Col className="col-12">
            <InputComponent
              label={t("Phone Number")}
              fullWidth
              name="mobile"
              formik={formik}
              disabled={loading}
              InnerPlaceholder={t("Enter Phone Number")}
              renderIcon={
                <>
                  <PhoneOutlinedIcon />
                </>
              }
              type="text"
              hasIcon
            />
          </Col>

          <Col className="col-12">
            <InputComponent
              label={t("Password")}
              fullWidth
              InnerPlaceholder={t("Enter Password")}
              name="password"
              formik={formik}
              disabled={loading}
              renderIcon={
                <div onClick={() => setTogglePassword(!togglePassword)}>
                  {togglePassword ? (
                    <RemoveRedEyeIcon className="cursor-pointer" />
                  ) : (
                    <VisibilityOffIcon className="cursor-pointer" />
                  )}
                </div>
              }
              hasIcon
              type={togglePassword ? "text" : "password"}
            />
          </Col>
          <Col className="col-12">
            <InputComponent
              label={t("Confirm Password")}
              name="confirmPassword"
              formik={formik}
              disabled={loading}
              fullWidth
              InnerPlaceholder={t("Enter Confirm Password")}
              renderIcon={
                <div onClick={() => setTogglePassword(!togglePassword)}>
                  {togglePassword ? (
                    <RemoveRedEyeIcon className="cursor-pointer" />
                  ) : (
                    <VisibilityOffIcon className="cursor-pointer" />
                  )}
                </div>
              }
              hasIcon
              type={togglePassword ? "text" : "password"}
            />
          </Col>
          <Col className="col-12">
            <label>{t("Select Role")}</label>
            <FlexBox justifyContent="flex-start ">
              <FormControlLabel
                value="USER"
                control={<Radio />}
                label={t("Customer")}
                checked={formik.values.type === "USER"}
                onClick={handleCheckboxChange}
                disabled={loading}
                name="role"
              />
              <FormControlLabel
                value="ASSOCIATE"
                control={<Radio />}
                label={t("Seller")}
                name="role"
                onClick={handleCheckboxChange}
                disabled={loading}
                checked={formik.values.type === "ASSOCIATE"}
              />
            </FlexBox>
          </Col>
          <Col className="col-12 buttons ">
            <ButtonComponent
              variant="contained"
              size="large"
              text={t("Sign Up")}
              width="100%"
              type="submit"
              disabled={loading}
            />
          </Col>
          {!maxWidth && (
            <Col className="col-12">
              <div className="info-text">
                <span>{t("Already have an account?")}</span>
                <Link to={ROUTE_SIGN_IN}>{t("Sign In")}</Link>
              </div>
            </Col>
          )}
        </Row>
      </form>
    </SignInContainer>
  );
};

export default SignUp;
