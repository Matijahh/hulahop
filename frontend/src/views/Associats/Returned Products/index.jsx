import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { map } from "lodash";
import { renderHeader } from "./mock";
import { ROUTE_ASSOCIATE_MAIN_ORDER_PREVIEW } from "../../../routes/routes";

import Tables from "../../../components/SuperAdmin/Tables";
import InputComponent from "../../../components/InputComponent";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { Helmet } from "react-helmet";

const ReturnedProducts = () => {
  const navigation = useNavigate();
  const { t } = useTranslation();

  const renderData = map(Array(100), (item, index) => ({
    ...item,
    no: `${index + 1}`,
    id: 101 * index,
    product_desc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore atque ut et impedit provident hic beatae modi eveniet delectus repudiandae.",
    return_resone:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore atque ut et impedit provident hic beatae modi eveniet delectus repudiandae.",
    price: 1200,
    qty: 1,
    sku: "#red_t_shirt",
    date: "02/10/2023",
    status: "Panding",
  }));

  return (
    <CommonWhiteBackground>
      <Helmet>
        <title>{t("Return Orders - Associate")}</title>
      </Helmet>
      <FlexBox isWrap className="mb-4">
        <div className="main-title ">{t("Return Orders")}</div>
        <InputComponent type="search" label="Search Orders" />
      </FlexBox>
      <Tables
        onRowClick={() => navigation(ROUTE_ASSOCIATE_MAIN_ORDER_PREVIEW)}
        body={renderData}
        header={renderHeader.map((item) => ({
          ...item,
          headerName: t(item.headerName),
        }))}
      />
    </CommonWhiteBackground>
  );
};

export default ReturnedProducts;
