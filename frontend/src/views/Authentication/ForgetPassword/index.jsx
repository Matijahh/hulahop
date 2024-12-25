import { useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTE_MAIN } from "../../../routes/routes";
import { ForgetPasswordContainer } from "./styled";
import { commonAddUpdateQuery } from "../../../utils/axiosInstance";
import * as Yup from "yup";
import logo from "../../../assets/images/logo.png";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";

import { Helmet } from "react-helmet";
import { Col, Row } from "react-bootstrap";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState("");

  const { t } = useTranslation();
  const navigate = useNavigate();

  const validation = Yup.object().shape({
    email: Yup.string().email().required(t("Email is required")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validation,
    onSubmit: async (value) => {
      setLoading(true);
      await commonAddUpdateQuery("/auth/forgot-password", {
        ...value,
      });

      setLoading(false);
      setEmailSubmitted(value.email);
    },
  });

  return (
    <ForgetPasswordContainer>
      <Helmet>
        <title>{`${t("Forgot Password")} - HulaHop`}</title>
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

      {emailSubmitted ? (
        <div className="title-container">
          <p className="description">
            {`${t("If a HulaHop account exists for")} ${(
              <strong>{emailSubmitted}</strong>
            )}, ${t(
              "you will receive a password reset email shortly. Please click the link in the email to reset your password."
            )}`}
          </p>
        </div>
      ) : (
        <>
          <div className="title-container">
            <div className="title">{t("Forgot Password")}</div>
            <div className="description">
              {t(
                "No problem, just enter your email address below and we'll send you an email to reset your password."
              )}
            </div>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col>
                <InputComponent
                  label={t("Email")}
                  fullWidth
                  InnerPlaceholder={t("Enter Email")}
                  name="email"
                  type="text"
                  disabled={loading}
                  formik={formik}
                  renderIcon={
                    <>
                      <EmailOutlinedIcon />
                    </>
                  }
                  hasIcon
                />
              </Col>

              <Col className="col-12 buttons">
                <ButtonComponent
                  type="submit"
                  variant="contained"
                  size="large"
                  text={t("Send Recovery Email")}
                  width="100%"
                  disabled={loading}
                />
              </Col>
            </Row>
          </form>
        </>
      )}
    </ForgetPasswordContainer>
  );
};

export default ForgetPassword;
