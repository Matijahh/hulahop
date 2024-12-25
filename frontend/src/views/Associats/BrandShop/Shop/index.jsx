import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { get } from "lodash";

import BrandShop from "../../../Users/Shop/index";

import { Helmet } from "react-helmet";

const Shop = ({ storeData }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>
          {get(storeData, "name")
            ? `${get(storeData, "name")} - ${t("Shop")}`
            : t("Associate Shop - HulaHop")}
        </title>
      </Helmet>
      <BrandShop isAssociateProduct={true} data={storeData} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  storeData: state.user.storeData,
});

export default connect(mapStateToProps, null)(Shop);
