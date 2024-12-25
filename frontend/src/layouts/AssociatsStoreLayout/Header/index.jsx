import { useTranslation } from "react-i18next";
import { get } from "lodash";
import { connect } from "react-redux";
import { Link, useLocation, useParams, NavLink } from "react-router-dom";
import { getImageUrlById, slugifyString } from "../../../utils/commonFunctions";
import {
  ROUTE_ASSOCIATE_BRAND_STORE,
  ROUTE_ASSOCIATE_BRAND_STORE_BLOGS,
  ROUTE_ASSOCIATE_BRAND_STORE_CONTACT,
  ROUTE_ASSOCIATE_BRAND_STORE_SHOP,
  ROUTE_MAIN,
  ROUTE_MAIN_CART,
  ROUTE_MAIN_PROFILE,
  ROUTE_SIGN_IN,
} from "../../../routes/routes";
import { ACCESS_TOKEN } from "../../../utils/constant";
import { useEffect, useState } from "react";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import logo from "../../../assets/images/logo.png";

import Slider from "react-slick";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonIcon from "@mui/icons-material/Person";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { HeaderContainer, HeaderMainContainer } from "./styled";
import { FlexBox } from "../../../components/Sections";

const Header = ({ storeData }) => {
  const [userData, setUserData] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const location = useLocation();
  const { id } = useParams();
  const { t } = useTranslation();

  const PageName = get(location, "pathname") && get(location, "pathname");

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getSocialUrl = (name) => {
    if (storeData && get(storeData, "social_links")) {
      const obj = JSON.parse(get(storeData, "social_links"));
      return obj[name];
    }
  };

  const getUserData = async () => {
    const decoded = jwtDecode(ACCESS_TOKEN);

    const response = await commonGetQuery(`/users/${decoded.id}`);

    if (response) {
      const { data } = response.data;
      setUserData(data);
    }
  };

  const toggleMenu = (state = !menuIsOpen) => {
    setMenuIsOpen(state);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <HeaderMainContainer>
      <div className={"flex-box-header container"}>
        <div className="open-menu-box">
          <Link to={ROUTE_MAIN} className="hulaHop-icon-cover">
            <img src={logo} alt="logo" />
          </Link>
          <div
            className="open-menu"
            onClick={() => {
              toggleMenu(true);
            }}
          >
            <MenuOutlinedIcon />
          </div>
        </div>
        <div className="contact-box order-2 order-lg-1 d-none d-md-block">
          <Link to={ROUTE_MAIN} className="hulaHop-icon-cover">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="header-slider-section order-1 order-lg-2">
          <Slider {...settings}>
            <h3 className="header-slider-text">
              {t("Free Postage Over 6000 RSD")}
            </h3>
            <h3 className="header-slider-text">
              {t("Possible Return of Goods")}
            </h3>
            <h3 className="header-slider-text">
              {t("Safe and Fast Delivery")}
            </h3>
          </Slider>
        </div>
        <div className="top-area-end order-3">
          <div className="flex-box-header">
            <div className="social-tab d-none d-sm-flex">
              {getSocialUrl("fb_url") && (
                <div className="social-icon">
                  <Link to={getSocialUrl("fb_url")} target="_blank">
                    <FacebookIcon />
                  </Link>
                </div>
              )}
              {getSocialUrl("ig_url") && (
                <div className="social-icon">
                  <Link to={getSocialUrl("ig_url")} target="_blank">
                    <InstagramIcon />
                  </Link>
                </div>
              )}
              {getSocialUrl("yt_url") && (
                <div className="social-icon">
                  <Link to={getSocialUrl("yt_url")} target="_blank">
                    <YouTubeIcon />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex d-none middle-area-end order-4">
          <div>
            <p>
              {userData ? (
                <span>{`${userData.first_name} ${userData.last_name}`}</span>
              ) : (
                t("Become Seller")
              )}
            </p>
          </div>
          <div className="profile-box">
            <NavLink to={ACCESS_TOKEN ? ROUTE_MAIN_PROFILE : ROUTE_SIGN_IN}>
              <PersonIcon />
            </NavLink>
          </div>
          <div className="cart-box">
            <NavLink to={ROUTE_MAIN_CART}>
              <LocalMallIcon />
            </NavLink>
          </div>
        </div>
      </div>

      <HeaderContainer>
        <FlexBox className="header-container container">
          <FlexBox className="left">
            <div className="logo-container">
              {storeData && (
                <Link
                  to={ROUTE_ASSOCIATE_BRAND_STORE.replace(
                    ":id",
                    slugifyString(get(storeData, "name", null))
                  )}
                >
                  <img src={getImageUrlById(storeData.logo_image)} />
                </Link>
              )}
            </div>
          </FlexBox>
          <FlexBox className={`mx-3 links-container ${menuIsOpen && "open"}`}>
            <div className="close-menu-box">
              <div
                className="close-menu"
                onClick={() => {
                  toggleMenu(false);
                }}
              >
                <CloseIcon />
              </div>
            </div>
            {storeData && (
              <Link
                to={ROUTE_ASSOCIATE_BRAND_STORE.replace(
                  ":id",
                  slugifyString(get(storeData, "name", null))
                )}
                className={
                  !PageName.includes("/shop") &&
                  !PageName.includes("/cart") &&
                  !PageName.includes("/blogs") &&
                  !PageName.includes("/product") &&
                  !PageName.includes("/contact") &&
                  "active"
                }
              >
                {t("Home")}
              </Link>
            )}
            {storeData && (
              <Link
                className={PageName.includes("/shop") && "active"}
                to={ROUTE_ASSOCIATE_BRAND_STORE_SHOP.replace(
                  ":id",
                  slugifyString(get(storeData, "name", null))
                )}
              >
                {t("Shop")}
              </Link>
            )}
            {storeData && (
              <Link
                className={PageName.includes("/blogs") && "active"}
                to={ROUTE_ASSOCIATE_BRAND_STORE_BLOGS.replace(
                  ":id",
                  slugifyString(get(storeData, "name", null))
                )}
              >
                {t("Blogs")}
              </Link>
            )}
            {storeData && (
              <Link
                className={PageName.includes("/contact") && "active"}
                to={ROUTE_ASSOCIATE_BRAND_STORE_CONTACT.replace(
                  ":id",
                  slugifyString(get(storeData, "name", null))
                )}
              >
                {t("Contact")}
              </Link>
            )}
          </FlexBox>
          <FlexBox className="right">
            <Link
              to={ACCESS_TOKEN ? ROUTE_MAIN_PROFILE : ROUTE_SIGN_IN}
              className="cart-link"
            >
              <PersonIcon />
            </Link>
            <Link to={ROUTE_MAIN_CART} className="cart-link">
              <ShoppingCartOutlinedIcon />
            </Link>
          </FlexBox>
        </FlexBox>
      </HeaderContainer>
    </HeaderMainContainer>
  );
};

const mapStateToProps = (state) => ({
  storeData: state.user.storeData,
});

export default connect(mapStateToProps, null)(Header);
