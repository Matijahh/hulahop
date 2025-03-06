import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { get, isEmpty, map, size, upperCase } from "lodash";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { menuAboutProductData, menuItemsData } from "./mock";
import {
  ROUTE_MAIN,
  ROUTE_MAIN_ABOUT_PLATFORM,
  ROUTE_MAIN_ASSOCIETS,
  ROUTE_MAIN_BLOG,
  ROUTE_MAIN_CART,
  ROUTE_MAIN_CONTACT,
  ROUTE_MAIN_PROFILE,
  ROUTE_SIGN_UP,
} from "../../../routes/routes";
import { ACCESS_TOKEN } from "../../../utils/constant";
import cx from "classnames";
import * as Action from "../../../redux/actions";
import logo from "../../../assets/images/logo.png";
import languages from "../../../utils/languages";
import i18n from "../../../i18n";

import { NestedDropdown } from "mui-nested-menu";
import SelectComponent from "../../../components/SelectComponent";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import LocalMallIcon from "@mui/icons-material/ShoppingCartOutlined";

const Navigation = ({
  userData,
  shopCategoryDataList,
  saveShopCategoryList,
  menuIsOpen,
  toggleMenu,
  popoverRef,
}) => {
  const [langOptions, setLangOptions] = useState([]);
  const [langValue, setLangValue] = useState(null);

  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();

  const getAllCategory = async () => {
    const userId = get(params, "id");

    const response = userId
      ? await commonGetQuery(`/categories/?user_id=${userId}`)
      : await commonGetQuery("/categories");

    if (response) {
      const { data } = response.data;
      saveShopCategoryList(data);
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
    if (size(shopCategoryDataList) <= 0 || isEmpty(shopCategoryDataList)) {
      getAllCategory();
    }

    const currentLanguage = localStorage.getItem("I18N_LANGUAGE");

    let langs = [];

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
    <div className="navigation-container">
      <div className="container-fluid container-lg">
        <header className="header-main-user">
          <div className="header-menu-user">
            <nav
              className={cx("nav-user", menuIsOpen && "open")}
              ref={popoverRef}
            >
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
                <li>
                  <NavLink
                    to={ROUTE_MAIN}
                    className={(navData) =>
                      navData.isActive ? "active-nav" : "none"
                    }
                  >
                    {t("Home")}
                  </NavLink>
                </li>
                <li>
                  <NestedDropdown
                    menuItemsData={menuItemsData(
                      shopCategoryDataList,
                      t("Shop")
                    )}
                  />
                </li>
                <li>
                  <NavLink
                    to={ROUTE_MAIN_ABOUT_PLATFORM}
                    className={(navData) =>
                      navData.isActive ? "active-nav" : "none"
                    }
                  >
                    {t("About The Platform")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={ROUTE_MAIN_ASSOCIETS}
                    className={(navData) =>
                      navData.isActive ? "active-nav" : "none"
                    }
                  >
                    {t("Associates")}
                  </NavLink>
                </li>
                <li>
                  <NestedDropdown
                    menuItemsData={menuAboutProductData(
                      shopCategoryDataList,
                      t("About Products")
                    )}
                  />
                </li>
                <li>
                  <NavLink
                    to={ROUTE_MAIN_BLOG}
                    className={(navData) =>
                      navData.isActive ? "active-nav" : "none"
                    }
                  >
                    {t("Blog")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={ROUTE_MAIN_CONTACT}
                    className={(navData) =>
                      navData.isActive ? "active-nav" : "none"
                    }
                  >
                    {t("Contact")}
                  </NavLink>
                </li>
              </ul>
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
  );
};

const mapStateToProps = (state) => ({
  shopCategoryDataList: state.user.shopCategoryDataList,
});

const mapDispatchToProps = {
  saveShopCategoryList: (data) => Action.saveShopCategoryList(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
