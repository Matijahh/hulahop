import { useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import { commonAddUpdateQuery } from "../../../utils/axiosInstance";
import * as Yup from "yup";

import ButtonComponent from "../../../components/ButtonComponent";
import contactform from "../../../assets/images/contact-form.png";
import InputComponent from "../../../components/InputComponent";

import { Helmet } from "react-helmet";
import { SuccessTaster } from "../../../components/Toast";

const Contact = () => {
  const [loading, setLoading] = useState();
  const { t } = useTranslation();

  const validation = Yup.object().shape({
    name: Yup.string().required(t("Name is required!")),
    email: Yup.string()
      .email("Invalid email!")
      .required(t("Email is required!")),
    subject: Yup.string().required(t("Subject is required!")),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      subject: "",
      message: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      const URL = "/inquiries";

      const reqBody = {
        name: get(values, "name", ""),
        email: get(values, "email", ""),
        mobile: get(values, "mobile", ""),
        subject: get(values, "subject", ""),
        message: get(values, "message", ""),
      };

      setLoading(true);

      const response = await commonAddUpdateQuery(URL, reqBody);

      if (response.status == 200) {
        SuccessTaster(t("Your message has been sent successfully."));
      }

      setLoading(false);
      formik.resetForm();
    },
  });

  return (
    <div className="page-wrapper contact-page ">
      <Helmet>
        <title>{t("Contact Us - HulaHop")}</title>
      </Helmet>

      <div className="contact-form-section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-7">
              <div className="hero-section">
                <h3 className="banner-head">{t("Contact Us")}</h3>
                <p className="banner-paragraph">
                  {t(
                    "Just send us your questions or concerns by sending a proposal and we will give you the help you need."
                  )}
                </p>
              </div>
              <div className="contact-form-wrapper">
                <form className="contact-form" onSubmit={formik.handleSubmit}>
                  <div className="container-fluid">
                    <div className="row g-4">
                      <div className="col-lg-12">
                        <InputComponent
                          InnerPlaceholder={t("Name")}
                          fullWidth
                          label={`${t("Name")} *`}
                          name="name"
                          formik={formik}
                          disabled={loading}
                        />
                      </div>
                      <div className="col-lg-12">
                        <InputComponent
                          InnerPlaceholder={t("Email")}
                          fullWidth
                          label={`${t("Email")} *`}
                          name="email"
                          formik={formik}
                          disabled={loading}
                        />
                      </div>
                      <div className="col-lg-12">
                        <InputComponent
                          InnerPlaceholder={t("Contact Number")}
                          fullWidth
                          label={t("Contact Number")}
                          name="mobile"
                          formik={formik}
                          disabled={loading}
                        />
                      </div>
                      <div className="col-lg-12">
                        <InputComponent
                          InnerPlaceholder={t("Subject")}
                          fullWidth
                          label={`${t("Subject")} *`}
                          name="subject"
                          formik={formik}
                          disabled={loading}
                        />
                      </div>
                      <div className="col-lg-12">
                        <InputComponent
                          InnerPlaceholder={t("Message")}
                          fullWidth
                          label={t("Message")}
                          type="textarea"
                          height="100px"
                          className="mt-3"
                          name="message"
                          formik={formik}
                          disabled={loading}
                        />
                      </div>
                      <div className="col-lg-12">
                        <div className="contact-submit-btn d-flex">
                          <ButtonComponent
                            text={t("Submit")}
                            variant="contained"
                            width="170px"
                            type="submit"
                            disabled={loading}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="form-img-box">
                <img src={contactform} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
