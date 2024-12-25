import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ROUTE_ASSOCIATE_BRAND_STORE_SHOP,
  ROUTE_MAIN,
  ROUTE_MAIN_CART,
  ROUTE_MAIN_PROFILE,
  ROUTE_MAIN_SHOP_PRODUCT,
  ROUTE_SIGN_UP,
} from "../../../routes/routes";
import { ACCESS_TOKEN } from "../../../utils/constant";
import { debounce, get, map } from "lodash";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { slugify, slugifyString } from "../../../utils/commonFunctions";
import cx from "classnames";
import i18n from "../../../i18n";
import languages from "../../../utils/languages";
import HeaderWrapperStyled from "./Styled";
import logo from "../../../assets/images/logo.png";

import Slider from "react-slick";
import SearchIcon from "@mui/icons-material/Search";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import PersonIcon from "@mui/icons-material/Person";
import LocalMallIcon from "@mui/icons-material/ShoppingCart";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import BottomHeader from "./BottomHeader";
import SelectComponent from "../../../components/SelectComponent";

import { InputAdornment, Menu, MenuItem, TextField } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [langOptions, setLangOptions] = useState([]);
  const [langValue, setLangValue] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [productsList, setProductList] = useState([]);
  const [associatesList, setAssociatesList] = useState([]);
  const [searchDataList, setSearchDataList] = useState([]);
  const [filteredSearchData, setFilteredSearchData] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const searchModal = Boolean(anchorEl);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const popoverRef = useRef(null);
  const targetSearchField = useRef(null);

  const toggleMenu = (state = !menuIsOpen) => {
    setMenuIsOpen(state);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    debouncedHandleSearch(event.target.value);
  };

  const handleClick = () => {
    setAnchorEl(targetSearchField.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemPick = (item) => {
    setAnchorEl(null);
    let url = item.productId
      ? ROUTE_MAIN_SHOP_PRODUCT.replace(":sId", item.productId).replace(
          ":id",
          slugify(item.name, item.productId)
        )
      : ROUTE_ASSOCIATE_BRAND_STORE_SHOP.replace(
          ":id",
          slugifyString(item.storeName)
        );

    if (url) {
      navigate(url);
      window.location.reload();
    }
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getUserData = async () => {
    const decoded = jwtDecode(ACCESS_TOKEN);
    const response = await commonGetQuery(`/users/${decoded.id}`);

    if (response) {
      const { data } = response.data;
      setUserData(data);
    }
  };

  const getProductList = async () => {
    const response = await commonGetQuery("/associate_products");

    if (response) {
      const { data } = response.data;
      setProductList(data);
    }
  };

  const getAssociatesList = async () => {
    const response = await commonGetQuery("/associates");

    if (response) {
      const { data } = response.data;
      setAssociatesList(data);
    }
  };

  const initSearchData = () => {
    let initData = [];

    productsList?.forEach((p) =>
      initData.push({ productId: p.id, name: p.name })
    );
    associatesList?.forEach((a) =>
      initData.push({
        userId: a.id,
        name: `${a.first_name} ${a.last_name}`,
        storeName:
          a.store_layout_details &&
          a.store_layout_details[0] &&
          a.store_layout_details[0].name,
      })
    );

    return initData;
  };

  const handleLangChange = (e) => {
    const selectedId = e.target && e.target.value.split(",")[0];
    setLangValue(e.target.value);
    i18n.changeLanguage();
    localStorage.setItem("I18N_LANGUAGE", selectedId);
    window.location.reload();
  };

  const filterSearch = (query) => {
    return searchDataList.filter(
      (item) =>
        item.name?.toLowerCase().includes(query.toLowerCase()) || // Search by Name
        item.storeName?.toLowerCase().includes(query.toLowerCase()) // Search by Store Name
    );
  };

  const debouncedHandleSearch = useCallback(
    debounce((query) => {
      if (query) {
        setSearchMode(true);
      } else {
        setSearchMode(false);
      }

      const filteredItems = filterSearch(query);
      setFilteredSearchData(filteredItems);
    }, 1000),
    [searchTerm]
  );

  useEffect(() => {
    const currentLanguage = localStorage.getItem("I18N_LANGUAGE");
    getUserData();
    getProductList();
    getAssociatesList();

    let langs = [];

    map(Object.keys(languages), (key) =>
      langs.push({
        id: key,
        title: get(languages, `${key}.label`),
      })
    );

    setLangOptions(langs);
    const selLang = langs.find((l) => l.id === currentLanguage);
    setLangValue(`${selLang?.id},${selLang?.title}`);
  }, []);

  useEffect(() => {
    const dataSearch = initSearchData();
    if (dataSearch) setSearchDataList(dataSearch);
  }, [associatesList, productsList]);

  return (
    <>
      <HeaderWrapperStyled>
        <div className={cx("menu-wrapper", menuIsOpen && "open")}></div>
        <div className="header-top-area">
          <div className="container-fluid container-lg">
            <div className="flex-box-header">
              <div className="open-menu-box">
                <div
                  className="logo-box cursor-pointer"
                  onClick={() => {
                    navigate(ROUTE_MAIN);
                  }}
                >
                  <img src={logo} alt="" />
                </div>
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
                <a href="tel:+381 63 54 03 73">
                  <LocalPhoneIcon />
                  +381 63 54 03 73
                </a>
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
                  <div className="language-transfer-tab">
                    {langValue && langOptions && (
                      <SelectComponent
                        width={120}
                        size="small"
                        name="title"
                        optionList={langOptions}
                        label={t("Select Language")}
                        value={langValue}
                        onChange={handleLangChange}
                        isShowValue={true}
                      />
                    )}
                  </div>
                  {/* For now comment it */}
                  {/* <div className="social-tab d-none d-sm-flex">
                    <div className="social-icon">
                      <Link href="#">
                        <FacebookIcon />
                      </Link>
                    </div>
                    <div className="social-icon">
                      <Link href="#">
                        <InstagramIcon />
                      </Link>
                    </div>
                    <div className="social-icon">
                      <Link href="#">
                        <YouTubeIcon />
                      </Link>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="d-flex d-lg-none middle-area-end order-4">
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
                  <NavLink
                    to={ACCESS_TOKEN ? ROUTE_MAIN_PROFILE : ROUTE_SIGN_UP}
                  >
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
          </div>
        </div>
        <div className="header-middle-area">
          <div className="container-fluid container-lg">
            <div className="flex-box-header">
              <div
                className="logo-box cursor-pointer"
                onClick={() => {
                  navigate(ROUTE_MAIN);
                }}
              >
                <img src={logo} alt="" />
              </div>
              <div className="search-box">
                <TextField
                  ref={targetSearchField}
                  id="search"
                  type="search"
                  label={t("Search")}
                  size="small"
                  value={searchTerm}
                  onChange={handleChange}
                  sx={{ width: "100%", maxWidth: "420px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon
                          className="search-btn"
                          id="basic-button"
                          aria-controls={searchModal ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={searchModal ? "true" : undefined}
                          onClick={handleClick}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <Menu
                  anchorEl={anchorEl}
                  id="basic-menu"
                  className="search-menu-container"
                  open={searchModal}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {searchMode
                    ? filteredSearchData &&
                      filteredSearchData.length > 0 &&
                      filteredSearchData.map((l, index) => {
                        return (
                          <MenuItem
                            key={index}
                            onClick={() => handleItemPick(l)}
                          >
                            {l.productId ? (
                              <ShoppingBagOutlinedIcon className="me-2" />
                            ) : (
                              <StoreOutlinedIcon className="me-2" />
                            )}
                            {l.storeName || l.name}
                          </MenuItem>
                        );
                      })
                    : searchDataList &&
                      searchDataList.length > 0 &&
                      searchDataList.map((l, index) => {
                        return (
                          <MenuItem
                            key={index}
                            onClick={() => handleItemPick(l)}
                          >
                            {l.productId ? (
                              <ShoppingBagOutlinedIcon className="me-2" />
                            ) : (
                              <StoreOutlinedIcon className="me-2" />
                            )}
                            {l.storeName || l.name}
                          </MenuItem>
                        );
                      })}
                </Menu>
              </div>

              <div className="middle-area-end d-none d-lg-flex">
                <div className="profile-box">
                  <NavLink
                    to={ACCESS_TOKEN ? ROUTE_MAIN_PROFILE : ROUTE_SIGN_UP}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <p>
                        {userData ? (
                          <span>{`${userData.first_name} ${userData.last_name}`}</span>
                        ) : (
                          t("Become Seller")
                        )}
                      </p>
                      <PersonIcon />
                    </div>
                  </NavLink>
                </div>
                <div className="cart-box">
                  <NavLink to={ROUTE_MAIN_CART}>
                    <LocalMallIcon />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomHeader
          menuIsOpen={menuIsOpen}
          toggleMenu={toggleMenu}
          popoverRef={popoverRef}
        />
      </HeaderWrapperStyled>
    </>
  );
};

export default Header;
