import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ROUTE_MAIN,
  ROUTE_MAIN_CART,
  ROUTE_MAIN_PROFILE,
  ROUTE_SIGN_UP,
} from "../../../routes/routes";
import { ACCESS_TOKEN } from "../../../utils/constant";
import { map, upperCase } from "lodash";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import i18n from "../../../i18n";
import languages from "../../../utils/languages";
import logo from "../../../assets/images/logo.png";

import { NavLink, useNavigate } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/PhoneOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalMallIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Navigation from "./Navigation";

import HeaderWrapperStyled from "./Styled";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SelectComponent from "../../../components/SelectComponent";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [langOptions, setLangOptions] = useState([]);
  const [langValue, setLangValue] = useState(null);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const popoverRef = useRef(null);

  const toggleMenu = (state = !menuIsOpen) => {
    setMenuIsOpen(state);
  };

  const getUserData = async () => {
    const decoded = jwtDecode(ACCESS_TOKEN);
    const response = await commonGetQuery(`/users/${decoded.id}`);

    if (response) {
      const { data } = response.data;
      setUserData(data);
    }
  };

  const handleLangChange = (e) => {
    const selectedId = e.target && e.target.value.split(",")[0];
    setLangValue(e.target.value);
    i18n.changeLanguage();
    localStorage.setItem("I18N_LANGUAGE", selectedId);
    window.location.reload();
  };

  useEffect(() => {
    const currentLanguage = localStorage.getItem("I18N_LANGUAGE");
    getUserData();

    let langs = [];

    console.log("languages", languages);

    map(Object.keys(languages), (key) =>
      langs.push({
        id: key,
        title: `${upperCase(key)}`,
      })
    );

    setLangOptions(langs);
    const selLang = langs.find((l) => l.id === currentLanguage);
    setLangValue(`${selLang?.id},${selLang?.title}`);
  }, []);

  return (
    <>
      <HeaderWrapperStyled>
        <div className="header-container">
          <div className="container-fluid">
            <div className="flex-box-header">
              {/** Responsive Header */}
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
              {/** End of Responsive Header */}

              {/** Desktop Header */}
              <div className="contact-box">
                <div
                  className="logo-box cursor-pointer"
                  onClick={() => {
                    navigate(ROUTE_MAIN);
                  }}
                >
                  <img src={logo} alt="" />
                </div>
                <div className="contact-phone-wrapper">
                  <a href="tel:+38163494645">
                    <LocalPhoneIcon />
                    +381 63 49 46 45
                  </a>
                </div>
              </div>

              <div className="right-navigation-container">
                <Navigation
                  userData={userData}
                  menuIsOpen={menuIsOpen}
                  toggleMenu={toggleMenu}
                  popoverRef={popoverRef}
                />

                <div className="profile-box-container">
                  <div className="cart-box">
                    <NavLink to={ROUTE_MAIN_CART}>
                      <LocalMallIcon />
                    </NavLink>
                  </div>
                  {!userData && (
                    <div className="language-transfer-tab">
                      {langValue && langOptions && (
                        <SelectComponent
                          width={70}
                          size="small"
                          name="title"
                          optionList={langOptions}
                          value={langValue}
                          onChange={handleLangChange}
                          isShowValue={true}
                        />
                      )}
                    </div>
                  )}
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
      </HeaderWrapperStyled>
    </>
  );
};

export default Header;
