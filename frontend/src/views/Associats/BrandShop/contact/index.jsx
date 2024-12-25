import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { commonAddUpdateQuery } from "../../../../utils/axiosInstance";
import get from "lodash/get";
import contactform from "../../../../assets/images/contact-form.jpg";
import * as Yup from "yup";

import { Helmet } from "react-helmet";
import { SuccessTaster } from "../../../../components/Toast";

import InputComponent from "../../../../components/InputComponent";
import ButtonComponent from "../../../../components/ButtonComponent";

const ShopContact = ({ storeData }) => {
  const [loading, setLoading] = useState();

  const { t } = useTranslation();

  const validation = Yup.object().shape({
    name: Yup.string().required(t("Name is required!")),
    email: Yup.string()
      .email(t("Invalid email!"))
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
      setLoading(true);

      const response = await commonAddUpdateQuery("/inquiries/associate", {
        ...values,
        associate_id: storeData.user_id,
      });

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
        <title>
          {get(storeData, "name")
            ? `${t("Contact Us")} - ${get(storeData, "name")}`
            : t("Associate Shop - HulaHop")}
        </title>
      </Helmet>
      <div className="contact-form-section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head">{t("Contact Us")}</h3>
                <p className="banner-paragraph">
                  {t(
                    "Just send us your questions or concerns by sending a proposal and we will give you the help you need."
                  )}
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-img-box">
                <img src={contactform} alt="" />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="contact-form-wrapper">
                <form className="contact-form" onSubmit={formik.handleSubmit}>
                  <div className="container-fluid">
                    <div className="row g-4">
                      <div className="col-lg-6">
                        <InputComponent
                          InnerPlaceholder={t("Name")}
                          fullWidth
                          label={`${t("Name")}`}
                          name="name"
                          formik={formik}
                          disabled={loading}
                        />
                      </div>
                      <div className="col-lg-6">
                        <InputComponent
                          InnerPlaceholder={t("Email")}
                          fullWidth
                          label={`${t("Email")}`}
                          name="email"
                          formik={formik}
                          disabled={loading}
                        />
                      </div>
                      <div className="col-lg-6">
                        <InputComponent
                          InnerPlaceholder={t("Contact Number")}
                          fullWidth
                          label={t("Contact Number")}
                          name="mobile"
                          formik={formik}
                          disabled={loading}
                        />
                      </div>
                      <div className="col-lg-6">
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
                        <div className="contact-submit-btn d-flex justify-content-end">
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
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  storeData: state.user.storeData,
});

export default connect(mapStateToProps, null)(ShopContact);
