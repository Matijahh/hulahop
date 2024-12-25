import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { commonAddUpdateQuery } from "../../../utils/axiosInstance";

import ModalComponent from "../../../components/ModalComponent";
import SelectComponent from "../../../components/SelectComponent";
import ButtonComponent from "../../../components/ButtonComponent";

import { SuccessTaster } from "../../../components/Toast";
import { FlexBox } from "../../../components/Sections";

const UpdateUserStatus = ({ isOpen, toggle, refresh, data }) => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const optionList = [
    {
      id: true,
      title: t("Active"),
    },
    {
      id: false,
      title: t("Inactive"),
    },
  ];

  useEffect(() => {
    if (data) {
      formik.setValues({
        ...formik.values,
        id: data.row.id,
        status: `${
          data.row.status === t("Active")
            ? `true,${t("Active")}`
            : `false,${t("Inactive")}`
        }`,
      });
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      id: null,
      status: `true,${t("Active")}`,
    },
    onSubmit: async (values) => {
      setLoading(true);

      const requiredBody = {
        status: values.status.split(",")[0] == "true" ? true : false,
      };

      const response = await commonAddUpdateQuery(
        `/users/${values.id}`,
        requiredBody,
        "PATCH"
      );

      setLoading(false);

      if (response) {
        const { message } = response.data;
        SuccessTaster(t(message));
        refresh();
        toggle();
      }
    },
  });

  return (
    <ModalComponent
      title={t("Update User Status")}
      size={"m"}
      open={isOpen}
      handleClose={toggle}
    >
      <form onSubmit={formik.handleSubmit}>
        <SelectComponent
          fullWidth
          optionList={optionList}
          name="status"
          formik={formik}
          title={t("Select Status")}
          disabled={loading}
        />
        <FlexBox hasBorderTop={true} className="pt-3 mt-3">
          <ButtonComponent
            className=""
            variant="outlined"
            fullWidth
            text={t("Cancel")}
            onClick={toggle}
          />
          <ButtonComponent
            variant="contained"
            fullWidth
            text={t("Change Status")}
            type="submit"
            loading={loading}
          />
        </FlexBox>
      </form>
    </ModalComponent>
  );
};

export default UpdateUserStatus;
