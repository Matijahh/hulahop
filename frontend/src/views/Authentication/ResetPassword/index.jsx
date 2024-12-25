import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { ResetPasswordContainer } from "./styled";
import { ROUTE_MAIN, ROUTE_SIGN_IN } from "../../../routes/routes";
import { axiosInstance } from "../../../utils/axiosInstance";
import * as Yup from "yup";
import logo from "../../../assets/images/logo.png";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";

import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";

export const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useParams();

  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validation = Yup.object().shape({
    password: Yup.string()
      .required(t("Password is required."))
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Please enter a valid password."
      ),
    confirmPassword: Yup.string()
      .required(t("Confirm password is required."))
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Please enter a valid confirm password."
      ),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axiosInstance.post("/auth/update-password", { ...values, token });
        navigate(ROUTE_SIGN_IN);
      } catch (error) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <ResetPasswordContainer>
      <Helmet>
        <title>{`${t("Reset Password")} - HulaHop`}</title>
      </Helmet>

      <div className="logo-container">
        <div
          className="cover cursor-po2inter"
          onClick={() => {
            navigate(ROUTE_MAIN);
          }}
        >
          <img src={logo} />
        </div>
      </div>

      <div className="title-container">
        <div className="title">{t("Reset Password")}</div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <Row>
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
              fullWidth
              InnerPlaceholder={t("Enter Confirm Password")}
              name="confirmPassword"
              formik={formik}
              disabled={loading}
              renderIcon={
                <div
                  onClick={() =>
                    setToggleConfirmPassword(!toggleConfirmPassword)
                  }
                >
                  {toggleConfirmPassword ? (
                    <RemoveRedEyeIcon className="cursor-pointer" />
                  ) : (
                    <VisibilityOffIcon className="cursor-pointer" />
                  )}
                </div>
              }
              hasIcon
              type={toggleConfirmPassword ? "text" : "password"}
            />
          </Col>

          <Col className="col-12 buttons ">
            <ButtonComponent
              type="submit"
              variant="contained"
              size="large"
              text={t("Update Password")}
              width="100%"
              disabled={loading}
            />
          </Col>
        </Row>
      </form>
    </ResetPasswordContainer>
  );
};

export default ResetPassword;
