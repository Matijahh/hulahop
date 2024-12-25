import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { renderHeader } from "./mock";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { size } from "lodash";
import map from "lodash/map";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { LoaderContainer } from "../../../components/Loader";
import { ContactContainer } from "./styled";

import Tables from "../../../components/SuperAdmin/Tables";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [inquiriesList, setInquiriesList] = useState([]);

  const { t } = useTranslation();

  const getInquiriesList = async () => {
    setLoading(true);

    const response = await commonGetQuery("/inquiries");

    if (response) {
      const { data } = response.data;
      setInquiriesList(data);
      setLoading(false);
    }

    setLoading(false);
  };

  const setTableRenderData = (data) => {
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      id: item.id,
      name: item.name,
      email: item.email,
      mobile: item.mobile,
      subject: item.subject,
      message: item.message,
      handleDelete,
    }));

    return renderData;
  };

  const handleDelete = async (id) => {
    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/inquiries/${id}`,
      null,
      "DELETE"
    );

    if (response) {
      getInquiriesList();
    }

    setLoading(false);
  };

  useEffect(() => {
    getInquiriesList();
  }, []);

  return (
    <ContactContainer>
      <CommonWhiteBackground>
        <FlexBox className="mb-4 title-wrapper">
          <div className="main-title ">{t("Users Queries")}</div>
        </FlexBox>

        {loading && <LoaderContainer />}

        <Tables
          className="contact-table"
          body={
            size(inquiriesList) > 0 ? setTableRenderData(inquiriesList) : []
          }
          header={renderHeader.map((item) => ({
            ...item,
            headerName: t(item.headerName),
          }))}
        />
      </CommonWhiteBackground>
    </ContactContainer>
  );
};
export default Contact;
