import { useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { commonAddUpdateQuery } from "../../../utils/axiosInstance";
import * as Yup from "yup";

import ProfileComponent from ".";
import ButtonComponent from "../../../components/ButtonComponent";
import InputComponent from "../../../components/InputComponent";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Col, Row } from "react-bootstrap";
import { SuccessTaster } from "../../../components/Toast";
import { Helmet } from "react-helmet";

const ChangePassword = () => {
  const [toggleCurrentPassword, setToggleCurrentPassword] = useState(false);
  const [toggleNewPassword, setToggleNewPassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    old_password: Yup.string().required(t("Old password is required.")),
    password: Yup.string()
      .required(t("Password is required."))
      .min(8, t("Password must be at least 8 characters.")),
    retype_password: Yup.string()
      .required(t("Retype password is required."))
      .oneOf([Yup.ref("password"), null], t("Passwords must match.")),
  });

  const formik = useFormik({
    initialValues: {
      old_password: "",
      password: "",
      retype_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      let reqBody = {
        old_password: values.old_password,
        password: values.password,
        retype_password: values.retype_password,
      };

      const response = await commonAddUpdateQuery(
        "/users/update-password",
        {
          ...reqBody,
        },
        "PUT"
      );

      if (response) {
        const { message } = response.data;
        SuccessTaster(t(message));
        formik.resetForm();
      }

      setLoading(false);
    },
  });

  return (
    <ProfileComponent>
      <Helmet>
        <title>{t("Change Password - HulaHop")}</title>
      </Helmet>

      <div className="change-password-box">
        <div className="hero-section">
          <h3 className="banner-head">{t("Change Password")}</h3>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row className="g-3 justify-content-center">
            <Col lg={8} sm={12}>
              <InputComponent
                label={t("Current Password")}
                fullWidth
                InnerPlaceholder={t("Enter Password")}
                name="old_password"
                formik={formik}
                renderIcon={
                  <div
                    onClick={() =>
                      setToggleCurrentPassword(!toggleCurrentPassword)
                    }
                  >
                    {toggleCurrentPassword ? (
                      <RemoveRedEyeIcon className="cursor-pointer" />
                    ) : (
                      <VisibilityOffIcon className="cursor-pointer" />
                    )}
                  </div>
                }
                hasIcon
                type={toggleCurrentPassword ? "text" : "password"}
              />
            </Col>
            <Col lg={8} sm={12}>
              <InputComponent
                label={t("New Password")}
                fullWidth
                InnerPlaceholder={t("Enter New Password")}
                name="password"
                formik={formik}
                renderIcon={
                  <div onClick={() => setToggleNewPassword(!toggleNewPassword)}>
                    {toggleNewPassword ? (
                      <RemoveRedEyeIcon className="cursor-pointer" />
                    ) : (
                      <VisibilityOffIcon className="cursor-pointer" />
                    )}
                  </div>
                }
                hasIcon
                type={toggleNewPassword ? "text" : "password"}
              />
            </Col>
            <Col lg={8} sm={12}>
              <InputComponent
                label={t("Confirm Password")}
                fullWidth
                InnerPlaceholder={t("Enter Confirm Password")}
                name="retype_password"
                formik={formik}
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
          </Row>
          <Row className="g-3 mt-4 justify-content-center">
            <Col lg={8} sm={12}>
              <ButtonComponent
                variant="contained"
                width="100%"
                text={t("Save")}
                type="submit"
                disabled={loading}
              />
            </Col>
          </Row>
        </form>
      </div>
    </ProfileComponent>
  );
};

export default ChangePassword;
