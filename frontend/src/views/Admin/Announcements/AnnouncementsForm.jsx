import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import * as Yup from "yup";
import { get } from "lodash";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { ROUTE_ADMIN_ANNOUNCEMENTS } from "../../../routes/routes";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";

import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import SelectComponent from "../../../components/SelectComponent";
import GobackButton from "../../../components/GoBackButton";

export const AnnouncementsFormWrapper = styled.div``;

const AnnouncementsForm = () => {
  const [loading, setLoading] = useState();

  const navigation = useNavigate();
  const params = useParams();
  const { t } = useTranslation();

  const StatusList = [
    {
      id: true,
      title: t("Active"),
    },
    {
      id: false,
      title: t("Inactive"),
    },
  ];

  const validation = Yup.object().shape({
    title: Yup.string().required(t("Title is required!")),
    description: Yup.string().required(t("Description is required!")),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: `true,${t("Active")}`,
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      let id = get(params, "id");

      const URL = id ? `/announcements/${id}` : "/announcements";
      const reqBody = {
        title: values.title,
        description: values.description,
        status: values.status.split(",")[0] === "true" ? true : false,
      };

      setLoading(true);

      await commonAddUpdateQuery(URL, reqBody, id ? "PATCH" : "POST");

      setLoading(false);
      navigation(ROUTE_ADMIN_ANNOUNCEMENTS);
    },
  });

  const getAnnouncementsData = async () => {
    setLoading(true);

    let id = get(params, "id");
    const response = await commonGetQuery(`/announcements/${id}`);

    if (response) {
      const { data } = response.data;
      const { title, description, status } = data;
      formik.setFieldValue("title", title);
      formik.setFieldValue("description", description);
      formik.setFieldValue(
        "status",
        status ? `true,${t("Active")}` : `false,${t("Inactive")}`
      );
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    let id = get(params, "id");
    if (id) {
      getAnnouncementsData();
    }
  }, []);

  return (
    <AnnouncementsFormWrapper>
      <CommonWhiteBackground>
        <FlexBox className="title-wrapper">
          <div className="main-title ">{t("Announcements")}</div>
        </FlexBox>
        <hr />
        <div className="commomn-form-wrapper">
          <form
            action=""
            className="commomn-form"
            onSubmit={formik.handleSubmit}
          >
            <div className="container-fluid">
              <div className="row g-4">
                <div className="col-lg-12">
                  <InputComponent
                    InnerPlaceholder={t("Enter Title")}
                    name="title"
                    fullWidth
                    label={t("Title")}
                    formik={formik}
                    disabled={loading}
                  />
                </div>
                <div className="col-lg-12">
                  <InputComponent
                    InnerPlaceholder={t("Write Description")}
                    fullWidth
                    name="description"
                    label={t("Description")}
                    type="textarea"
                    formik={formik}
                    disabled={loading}
                  />
                </div>
                <div className="col-lg-12">
                  <SelectComponent
                    fullWidth
                    name="status"
                    optionList={StatusList}
                    formik={formik}
                    title={t("Select Status")}
                    disabled={loading}
                  />
                </div>
                <div className="col-12">
                  <FlexBox justifyContent="end" className="mt-3">
                    <GobackButton />
                    <ButtonComponent
                      variant="contained"
                      text={t("Save")}
                      type="submit"
                    />
                  </FlexBox>
                </div>
              </div>
            </div>
          </form>
        </div>
      </CommonWhiteBackground>
    </AnnouncementsFormWrapper>
  );
};
export default AnnouncementsForm;
