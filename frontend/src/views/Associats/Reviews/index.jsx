import { useTranslation } from "react-i18next";
import { map } from "lodash";
import { renderHeader } from "./mock";

import Tables from "../../../components/SuperAdmin/Tables";
import InputComponent from "../../../components/InputComponent";
import { Helmet } from "react-helmet";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";

const Reviews = () => {
  const { t } = useTranslation();

  const renderData = map(Array(10), (item, index) => ({
    ...item,
    no: `${index + 1}`,
    id: 101 * index,
    review_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    review_date: "02/10/2023",
    created_by: "Chirag Rathod",
  }));

  return (
    <CommonWhiteBackground>
      <Helmet>
        <title>{t("Reviews - Associate")}</title>
      </Helmet>
      <FlexBox className="mb-4" isWrap>
        <div className="main-title ">{t("Reviews")}</div>
        <InputComponent type="search" label={t("Search Orders")} />
      </FlexBox>
      <Tables
        body={renderData}
        header={renderHeader.map((item) => ({
          ...item,
          headerName: t(item.headerName),
        }))}
        maxHeight="650px"
      />
    </CommonWhiteBackground>
  );
};
export default Reviews;
