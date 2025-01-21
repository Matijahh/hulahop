import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import get from "lodash/get";
import SliderSection from "./SliderSection";
import Products from "./Products";
import CommonCategorySidebar from "../../../../components/CommonCategorySidebar";

import { HomeContainer } from "./styled";
import { Helmet } from "react-helmet";
import { getImageUrlById } from "../../../../utils/commonFunctions";
import logo from "../../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { ROUTE_MAIN } from "../../../../routes/routes";

const Home = ({ storeData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <Helmet>
        <title>
          {get(storeData, "name")
            ? get(storeData, "name")
            : t("Associate Shop - HulaHop")}
        </title>
      </Helmet>
      {storeData &&
        storeData.store_layout_sliders &&
        storeData.store_layout_sliders[0] &&
        storeData.store_layout_sliders[0].image_id && (
          <div className="shop-page-hero-container">
            <img
              src={getImageUrlById(storeData.store_layout_sliders[0].image_id)}
              alt=""
            />
            <div className="overlay"></div>
          </div>
        )}
      {storeData &&
        storeData.store_layout_sliders &&
        storeData.store_layout_sliders[0] &&
        storeData.store_layout_sliders[0].name && (
          <div className="content">
            <div className="shop-title">
              {storeData.store_layout_sliders[0].name}
            </div>
          </div>
        )}
      <div
        className="logo-box cursor-pointer"
        onClick={() => {
          navigate(ROUTE_MAIN);
        }}
      >
        <span>Powered by:</span>
        <img src={logo} alt="" />
      </div>
      <Products storeData={storeData} />
      <CommonCategorySidebar isAssociate={true} storeData={storeData} />
    </HomeContainer>
  );
};

const mapStateToProps = (state) => ({
  storeData: state.user.storeData,
});

export default connect(mapStateToProps, null)(Home);
