import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { get, isEmpty, size } from "lodash";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { menuAboutProductData, menuItemsData } from "./mock";
import {
  ROUTE_MAIN,
  ROUTE_MAIN_ABOUT_PLATFORM,
  ROUTE_MAIN_ASSOCIETS,
  ROUTE_MAIN_BLOG,
  ROUTE_MAIN_CONTACT,
} from "../../../routes/routes";
import cx from "classnames";
import * as Action from "../../../redux/actions";

import { NestedDropdown } from "mui-nested-menu";
import { NavLink, useParams } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";

const BottomHeader = ({
  shopCategoryDataList,
  saveShopCategoryList,
  menuIsOpen,
  toggleMenu,
  popoverRef,
}) => {
  const { t } = useTranslation();
  const params = useParams();

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

  useEffect(() => {
    if (size(shopCategoryDataList) <= 0 || isEmpty(shopCategoryDataList)) {
      getAllCategory();
    }
  }, []);

  return (
    <div className="header-bottom-area">
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

export default connect(mapStateToProps, mapDispatchToProps)(BottomHeader);
