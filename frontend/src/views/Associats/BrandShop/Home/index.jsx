import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import _get from "lodash/get";
import get from "lodash/get";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SliderSection from "./SliderSection";
import Products from "./Products";
import CommonCategorySidebar from "../../../../components/CommonCategorySidebar";

import { HomeContainer } from "./styled";
import { Helmet } from "react-helmet";

const Home = ({ storeData }) => {
  const { t } = useTranslation();

  const getSocialUrl = (name) => {
    if (storeData && _get(storeData, "social_links")) {
      const obj = JSON.parse(_get(storeData, "social_links"));
      return obj[name];
    }
  };

  const handleOnSelectSocialIcon = (url) => {
    window.open(url, "_blank");
  };

  return (
    <HomeContainer>
      <Helmet>
        <title>
          {get(storeData, "name")
            ? get(storeData, "name")
            : t("Associate Shop - HulaHop")}
        </title>
      </Helmet>
      <SliderSection data={storeData} />
      <div className="social-links">
        {getSocialUrl("ig_url") && (
          <div
            onClick={() => handleOnSelectSocialIcon(getSocialUrl("ig_url"))}
            target="_blank"
            className="social-links-item"
          >
            <InstagramIcon />
          </div>
        )}
        {getSocialUrl("fb_url") && (
          <div
            className="social-links-item"
            onClick={() => handleOnSelectSocialIcon(getSocialUrl("fb_url"))}
          >
            <FacebookIcon />
          </div>
        )}
        {getSocialUrl("yt_url") && (
          <div
            className="social-links-item"
            onClick={() => handleOnSelectSocialIcon(getSocialUrl("yt_url"))}
          >
            <YouTubeIcon />
          </div>
        )}
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
