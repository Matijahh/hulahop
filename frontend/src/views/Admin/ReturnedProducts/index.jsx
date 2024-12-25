import { useTranslation } from "react-i18next";
import { renderHeader } from "./mock";
import muska4 from "../../../assets/images/muska-4.jpg";
import map from "lodash/map";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";

import InputComponent from "../../../components/InputComponent";
import Tables from "../../../components/SuperAdmin/Tables";

const ReturnedProducts = () => {
  const { t } = useTranslation();

  const renderData = map(Array(10), (item, index) => ({
    ...item,
    no: `${index + 1}`,
    user_name: "Demo User",
    product_name: "Blue T-Shirt",
    product_image: muska4,
    product_description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    reason: "Dolor sit amet consectetur adipisicing elit.",
    id: 101 * index,
    price: 1200,
    category: "T-shirt",
    order_date: "02/10/2023",
    returned_date: "07/10/2023",
    qty: "2",
    status: "Returned",
  }));

  return (
    <CommonWhiteBackground>
      <FlexBox className="mb-4">
        <div className="main-title ">{t("Returned Products")}</div>

        <InputComponent type="search" label={t("Search Orders")} />
      </FlexBox>
      <Tables
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
