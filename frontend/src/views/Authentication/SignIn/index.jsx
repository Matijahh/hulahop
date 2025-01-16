import { useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_MAIN, ROUTE_SIGN_UP } from "../../../routes/routes";
import { commonAddUpdateQuery } from "../../../utils/axiosInstance";
import * as Yup from "yup";
import {
  handleRedirection,
  setTokenAfterLogin,
} from "../../../utils/commonFunctions";
import logo from "../../../assets/images/logo.png";

import { Col, Row } from "react-bootstrap";
import { Checkbox } from "@mui/material";
import { SignInContainer } from "./styled";
import { FlexBox } from "../../../components/Sections";
import { SuccessTaster } from "../../../components/Toast";
import { Helmet } from "react-helmet";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";

const SignIn = ({ maxWidth, RedirectUrl }) => {
  const [loading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const validation = Yup.object().shape({
    id: Yup.string().required(t("This field is required!")),
    password: Yup.string()
      .required(t("Password is required."))
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Please enter a valid password."
      ),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      password: "",
      isCheckedRememberMe: false,
      type: "USER",
    },
    validationSchema: validation,
    onSubmit: async (value) => {
      setLoading(true);
      let reqBody;
      if (value.type === "USER") {
        reqBody = {
          email: value.id,
          password: value.password,
        };
      } else {
        if (value.id.includes("@")) {
          reqBody = {
            email: value.id.toString(),
            password: value.password,
          };
        } else {
          reqBody = {
            mobile: value.id.toString(),
            password: value.password,
          };
        }
      }
      const response = await commonAddUpdateQuery("/auth/login", {
        ...reqBody,
      });
      if (response) {
        const { message, data } = response.data;
        setTokenAfterLogin(response, value.isCheckedRememberMe);
        if (RedirectUrl) {
          window.location.href = RedirectUrl;
        } else {
          handleRedirection(data.type);
        }
        SuccessTaster(t(message));
      } else {
        setLoading(false);
      }
    },
  });

  const handleCheckRemember = () => {
    formik.setFieldValue(
      "isCheckedRememberMe",
      !formik.values.isCheckedRememberMe
    );
  };

  return (
    <SignInContainer maxWidth={maxWidth}>
      <Helmet>
        <title>{t("Sign In - HulaHop")}</title>
      </Helmet>

      <div className="logo-container">
        <div
          className="cover cursor-pointer"
          onClick={() => {
            navigate(ROUTE_MAIN);
          }}
        >
          <img src={logo} />
        </div>
      </div>

      <div className="title-container">
        <div className="title">{t("Sign In")}</div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <Row>
          <Col className="col-12 mb-3">
            {formik.values.type === "USER" ? (
              <InputComponent
                label={`${t("Email")}*`}
                fullWidth
                InnerPlaceholder={t("Enter Email")}
                name="id"
                formik={formik}
                disabled={loading}
              />
            ) : (
              <InputComponent
                label={t("Mobile Or Email")}
                fullWidth
                InnerPlaceholder={t("Enter Mobile Number or Email")}
                name="id"
                type="text"
                formik={formik}
                disabled={loading}
                renderIcon={
                  <>
                    <PermIdentityIcon />
                  </>
                }
                hasIcon
              />
            )}
          </Col>

          <Col className="col-12 mb-3">
            <InputComponent
              label={`${t("Password")}*`}
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

          <Col className="col-12 mt-3">
            <FlexBox>
              <FlexBox justifyContent="flex-start" className="remember-me">
                <span className="text">{`${t("Remember me?")}:`}</span>
                <Checkbox
                  checked={formik.values.isCheckedRememberMe}
                  onClick={handleCheckRemember}
                />
              </FlexBox>
              <Link to="/forget-password" className="forgot-password-text">
                {t("Forgot Password")}
              </Link>
            </FlexBox>
          </Col>

          <Col className="buttons ">
            <ButtonComponent
              type="submit"
              variant="contained"
              size="large"
              text={t("Sign In")}
              className="sign-in"
              disabled={loading}
            />
            {!maxWidth && (
              <div className="info-text">
                <span>{t("Don't have an account?")}</span>
                <Link to={ROUTE_SIGN_UP}>{t("Sign Up")}</Link>
              </div>
            )}
          </Col>
        </Row>
      </form>
    </SignInContainer>
  );
};

export default SignIn;
