import { useTranslation } from "react-i18next";
import { get } from "lodash";
import { connect } from "react-redux";
import {
  Link,
  useLocation,
  useParams,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { getImageUrlById, slugifyString } from "../../../utils/commonFunctions";
import {
  ROUTE_ASSOCIATE_BRAND_STORE,
  ROUTE_ASSOCIATE_BRAND_STORE_BLOGS,
  ROUTE_ASSOCIATE_BRAND_STORE_CONTACT,
  ROUTE_ASSOCIATE_BRAND_STORE_SHOP,
  ROUTE_MAIN,
  ROUTE_MAIN_CART,
  ROUTE_MAIN_PROFILE,
  ROUTE_SIGN_UP,
} from "../../../routes/routes";
import { ACCESS_TOKEN } from "../../../utils/constant";
import { useEffect, useState } from "react";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import logo from "../../../assets/images/logo.png";

import Slider from "react-slick";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalMallIcon from "@mui/icons-material/ShoppingCartOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import HeaderMainContainer from "./styled";

import { FlexBox } from "../../../components/Sections";

const Header = ({ storeData }) => {
  const [userData, setUserData] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
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

  const getStoreBlogs = async () => {
    setLoading(true);

    const response = await commonGetQuery(
      `/associate_blogs/store/${storeData?.id ?? 0}`
    );

    if (response) {
      const { data } = response.data;
      setBlogList(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getStoreBlogs();
  }, [storeData]);

  return (
    <>
      <HeaderMainContainer>
        <div className="header-container">
          <div className="container-fluid">
            <div className="flex-box-header">
              {/** Responsive Header */}
              <div className="open-menu-box">
                {/* <div
                  className="logo-box cursor-pointer"
                  onClick={() => {
                    navigate(ROUTE_MAIN);
                  }}
                >
                  <img src={logo} alt="" />
                </div> */}

                {get(storeData, "name", null) &&
                  getImageUrlById(storeData?.logo_image) && (
                    <div
                      className="logo-box cursor-pointer"
                      onClick={() => {
                        navigate(
                          ROUTE_ASSOCIATE_BRAND_STORE.replace(
                            ":id",
                            slugifyString(get(storeData, "name", null))
                          )
                        );
                      }}
                    >
                      <img src={getImageUrlById(storeData.logo_image)} alt="" />
                    </div>
                  )}

                <div
                  className="open-menu"
                  onClick={() => {
                    toggleMenu(true);
                  }}
                >
                  <MenuOutlinedIcon />
                </div>
              </div>
              {/** End of Responsive Header */}

              {/** Desktop Header */}
              <div className="contact-box">
                {/* <div
                  className="logo-box cursor-pointer"
                  onClick={() => {
                    navigate(ROUTE_MAIN);
                  }}
                >
                  <img src={logo} alt="" />
                </div> */}

                {get(storeData, "name", null) &&
                  getImageUrlById(storeData?.logo_image) && (
                    <div
                      className="logo-box cursor-pointer"
                      onClick={() => {
                        navigate(
                          ROUTE_ASSOCIATE_BRAND_STORE.replace(
                            ":id",
                            slugifyString(get(storeData, "name", null))
                          )
                        );
                      }}
                    >
                      <img src={getImageUrlById(storeData.logo_image)} alt="" />
                    </div>
                  )}
                <div className="social-icons">
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

              <div className="right-navigation-container">
                <div className="navigation-container">
                  <div className="container-fluid container-lg">
                    <header className="header-main-user">
                      <div className="header-menu-user">
                        <nav className={`nav-user ${menuIsOpen && "open"}`}>
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
                          <ul>
                            {storeData && (
                              <li>
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
                                    "active-nav"
                                  }
                                >
                                  {t("Home")}
                                </Link>
                              </li>
                            )}
                            {storeData && (
                              <li>
                                <Link
                                  className={
                                    PageName.includes("/shop") && "active-nav"
                                  }
                                  to={ROUTE_ASSOCIATE_BRAND_STORE_SHOP.replace(
                                    ":id",
                                    slugifyString(get(storeData, "name", null))
                                  )}
                                >
                                  {t("Shop")}
                                </Link>
                              </li>
                            )}
                            {storeData &&
                              !loading &&
                              blogList &&
                              blogList.length > 0 && (
                                <li>
                                  <Link
                                    className={
                                      PageName.includes("/blogs") &&
                                      "active-nav"
                                    }
                                    to={ROUTE_ASSOCIATE_BRAND_STORE_BLOGS.replace(
                                      ":id",
                                      slugifyString(
                                        get(storeData, "name", null)
                                      )
                                    )}
                                  >
                                    {t("Blogs")}
                                  </Link>
                                </li>
                              )}
                            {storeData && (
                              <li>
                                <Link
                                  className={
                                    PageName.includes("/contact") &&
                                    "active-nav"
                                  }
                                  to={ROUTE_ASSOCIATE_BRAND_STORE_CONTACT.replace(
                                    ":id",
                                    slugifyString(get(storeData, "name", null))
                                  )}
                                >
                                  {t("Contact")}
                                </Link>
                              </li>
                            )}
                          </ul>
                          <div className="profile-box-container">
                            <div className="cart-box">
                              <NavLink to={ROUTE_MAIN_CART}>
                                <LocalMallIcon />
                              </NavLink>
                            </div>
                            <div className="profile-box">
                              <NavLink
                                to={
                                  ACCESS_TOKEN
                                    ? ROUTE_MAIN_PROFILE
                                    : ROUTE_SIGN_UP
                                }
                              >
                                <div className="d-flex justify-content-center align-items-center">
                                  <PersonIcon />
                                  <p>
                                    {userData ? (
                                      <span>{`${userData.first_name} ${userData.last_name}`}</span>
                                    ) : (
                                      t("Become Seller")
                                    )}
                                  </p>
                                </div>
                              </NavLink>
                            </div>
                          </div>
                          <div
                            className="logo-box cursor-pointer"
                            onClick={() => {
                              navigate(ROUTE_MAIN);
                            }}
                          >
                            <img src={logo} alt="" />
                          </div>
                        </nav>
                      </div>
                    </header>
                  </div>
                </div>

                <div className="profile-box-container">
                  <div className="cart-box">
                    <NavLink to={ROUTE_MAIN_CART}>
                      <LocalMallIcon />
                    </NavLink>
                  </div>
                  <div className="profile-box">
                    <NavLink
                      to={ACCESS_TOKEN ? ROUTE_MAIN_PROFILE : ROUTE_SIGN_UP}
                    >
                      <div className="d-flex justify-content-center align-items-center">
                        <PersonIcon />
                        <p>
                          {userData ? (
                            <span>{`${userData.first_name} ${userData.last_name}`}</span>
                          ) : (
                            t("Become Seller")
                          )}
                        </p>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeaderMainContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  storeData: state.user.storeData,
});

export default connect(mapStateToProps, null)(Header);
