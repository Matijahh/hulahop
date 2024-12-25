import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { ROUTE_ADMIN_COLORS } from "../../../routes/routes";
import { get } from "lodash";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import styled from "styled-components";
import * as Yup from "yup";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";

import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import SelectComponent from "../../../components/SelectComponent";
import GobackButton from "../../../components/GoBackButton";

export const ColorsFormWrapper = styled.div``;

const ColorsForm = () => {
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
    code: Yup.string().required(t("Code is required!")),
    name: Yup.string().required(t("Name is required!")),
  });

  const formik = useFormik({
    initialValues: {
      code: "#000000",
      name: "",
      status: `true,${t("Active")}`,
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      let id = get(params, "id");

      const URL = id ? `/colors/${id}` : "/colors";

      const reqBody = {
        name: values.name,
        code: values?.code,
        status: values.status.split(",")[0] === "true" ? true : false,
      };

      setLoading(true);

      await commonAddUpdateQuery(URL, reqBody, id ? "PATCH" : "POST");

      setLoading(false);
      navigation(ROUTE_ADMIN_COLORS);
    },
  });

  const getColorData = async () => {
    setLoading(true);

    let id = get(params, "id");
    const response = await commonGetQuery(`/colors/${id}`);

    if (response) {
      const { data } = response.data;
      const { code, name, status } = data;
      formik.setFieldValue("code", code);
      formik.setFieldValue("name", name);
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
      getColorData();
    }
  }, []);

  return (
    <ColorsFormWrapper>
      <CommonWhiteBackground>
        <FlexBox className="title-wrapper">
          <div className="main-title">
            {get(params, "id") ? t("Edit Color") : t("Add Color")}
          </div>
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
                <div className="col-lg-2">
                  <InputComponent
                    name="code"
                    fullWidth
                    label={t("Select Color")}
                    type="color"
                    formik={formik}
                    disabled={loading}
                  />
                </div>
                <div className="col-lg-5">
                  <InputComponent
                    name="name"
                    InnerPlaceholder={t("Color Name")}
                    fullWidth
                    label={t("Color Name")}
                    formik={formik}
                    disabled={loading}
                  />
                </div>
                <div className="col-lg-5">
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
    </ColorsFormWrapper>
  );
};

export default ColorsForm;
