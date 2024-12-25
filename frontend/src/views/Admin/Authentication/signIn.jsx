import { useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { commonAddUpdateQuery } from "../../../utils/axiosInstance";
import * as Yup from "yup";
import logo from "../../../assets/images/logo.png";
import {
  handleRedirection,
  setTokenAfterLogin,
} from "../../../utils/commonFunctions";

import { Col, Row } from "react-bootstrap";
import { Checkbox } from "@mui/material";
import { Container, SignInContainer } from "./styled";
import { FlexBox } from "../../../components/Sections";
import { SuccessTaster } from "../../../components/Toast";
import { LoaderContainer } from "../../../components/Loader";

import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const validation = Yup.object().shape({
    email: Yup.string()
      .email(t("Invalid email!"))
      .required(t("Email is required!")),
    password: Yup.string()
      .required(t("Password is required."))
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        t("Please enter a valid password.")
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: async (value) => {
      setLoading(true);

      const response = await commonAddUpdateQuery("/auth/login", { ...value });

      setLoading(false);

      if (response) {
        const { data, message } = response.data;

        if (data) {
          setTokenAfterLogin(response);
          handleRedirection(data.type);
          if (message) {
            SuccessTaster(t(message));
          }
        }
      }
    },
  });
  return (
    <Container justifyContent="center" alineItems="center">
      {loading && <LoaderContainer />}
      <SignInContainer>
        <div className="logo-container">
          <div className="cover">
            <img src={logo} />
          </div>
        </div>
        <div className="title-container">
          <div className="title">{t("Admin Sign In")}</div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row>
            <Col className="col-12">
              <InputComponent
                label={t("Email")}
                fullWidth
                InnerPlaceholder={t("Enter Email")}
                name="email"
                formik={formik}
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
                label={t("Password")}
                fullWidth
                name="password"
                formik={formik}
                InnerPlaceholder={t("Enter Password")}
                renderIcon={
                  <>
                    <LockOutlinedIcon />
                  </>
                }
                hasIcon
                type="password"
              />
            </Col>
            <Col className="col-12 ">
              <FlexBox>
                <FlexBox justifyContent="flex-start remember-me">
                  <Checkbox />
                  <span>{t("Remember me?")}</span>
                </FlexBox>
              </FlexBox>
            </Col>
            <Col className="col-12 buttons ">
              <ButtonComponent
                type="submit"
                variant="contained"
                size="large"
                text={t("Sign In")}
                width="100%"
              />
            </Col>
          </Row>
        </form>
      </SignInContainer>
    </Container>
  );
};

export default SignIn;
