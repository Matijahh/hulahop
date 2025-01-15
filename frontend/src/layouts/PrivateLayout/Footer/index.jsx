import { useTranslation } from "react-i18next";
import {
  ROUTE_MAIN,
  ROUTE_MAIN_ASSOCIETS,
  ROUTE_MAIN_ABOUT_PLATFORM,
  ROUTE_MAIN_CONTACT,
  ROUTE_MAIN_TERMS_OF_USE,
  ROUTE_PRIVACY_POLICY,
  ROUTE_RETURN_POLICY,
} from "../../../routes/routes";
import logo from "../../../assets/images/logo-black-white.png";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import { FooterWrapperStyled } from "./Styled";
import { Link } from "react-router-dom";
import ButtonComponent from "../../../components/ButtonComponent";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <FooterWrapperStyled>
        <div className="container-fluid container-lg">
          <footer>
            <img src={logo} alt="" className="background-logo" />
            <div className="row g-4 z-index-greater">
              <div className="col-12 col-md-6 col-lg-3">
                <div className="footer-section-header">
                  <p className="footer-header-text">{t("Contact Us")}</p>
                </div>
                <div className="contact-us-section">
                  <div className="contact-item">
                    <span className="icon-box">
                      <LocationOnOutlinedIcon />
                    </span>
                    <span className="contact-detail location-detail">
                      VGA Design Center,7. jula 3, 11307, Boleč, Belgrade
                      <br />
                      PIB: 112759904
                      <br />
                      MB: 66336417
                    </span>
                  </div>
                  <div className="contact-item">
                    <span className="icon-box">
                      <CallOutlinedIcon />
                    </span>
                    <span className="contact-detail">+381 63 54 03 73</span>
                  </div>
                  <div className="contact-item">
                    <span className="icon-box">
                      <EmailOutlinedIcon />
                    </span>
                    <span className="contact-detail">info@hulahop.shop</span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="footer-section-header">
                  <p className="footer-header-text">{t("Useful Links")}</p>
                </div>
                <div className="useful-links">
                  <div className="links-item">
                    <Link to={ROUTE_MAIN}>{t("Home")}</Link>
                  </div>
                  <div className="links-item">
                    <Link to={ROUTE_MAIN_ABOUT_PLATFORM}>
                      {t("About The Platform")}
                    </Link>
                  </div>
                  <div className="links-item">
                    <Link to={ROUTE_MAIN_ASSOCIETS}>{t("Associates")}</Link>
                  </div>
                  <div className="links-item">
                    <Link to={ROUTE_MAIN_CONTACT}>{t("Contact Us")}</Link>
                  </div>
                  <div className="links-item">
                    <Link to={ROUTE_RETURN_POLICY}>{t("Return Policy")}</Link>
                  </div>
                  <div className="links-item">
                    <Link to={ROUTE_MAIN_TERMS_OF_USE}>
                      {t("Terms of Use")}
                    </Link>
                  </div>
                  <div className="links-item">
                    <Link to={ROUTE_PRIVACY_POLICY}>{t("Privacy Policy")}</Link>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="footer-section-header">
                  <p className="footer-header-text">
                    {t("Law on Consumer Protection")}
                  </p>
                </div>
                <div className="low-description-box">
                  <p>
                    {t(
                      "Familiarize yourself with the Law on Consumer Protection of the Republic of Serbia."
                    )}
                  </p>
                  <ButtonComponent
                    className="know-more-btn"
                    text={t("Know More")}
                    variant="outlined"
                    onClick={() => {
                      window.open(
                        "https://hulahop.shop/wp-content/uploads/2022/10/Zakon%20o%20za%C5%A1titi%20potro%C5%A1a%C4%8Da%20Republike%20Srbije.pdf",
                        "_blank"
                      );
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="site-description">
                  <p>
                    {t(
                      "Hulahop is not just any Print on Demand (POD) marketplace, it is a remarkable platform that caters to the needs of both vendors and individuals by offering a versatile and personalized POD service."
                    )}
                  </p>
                  <span className="copyright">
                    © Hulahop - {t("All Right Reserved")} 2024.
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </FooterWrapperStyled>
    </>
  );
};

export default Footer;
