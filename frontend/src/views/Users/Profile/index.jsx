import { useTranslation } from "react-i18next";
import {
  ROUTE_MAIN_CHANGE_PASSWORD,
  ROUTE_MAIN_DASHBOARD,
  ROUTE_MAIN_ORDERS,
  ROUTE_MAIN_PROFILE,
  ROUTE_MAIN_WISHLIST,
} from "../../../routes/routes";
import { handlePublicRedirection } from "../../../utils/commonFunctions";

import { NavLink } from "react-router-dom";

const ProfileComponent = ({ children }) => {
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.clear();
    handlePublicRedirection();
  };

  return (
    <div className="profile-page page-wrapper">
      <div className="profile-banner-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head">{t("Profile Settings")}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-component-section">
        <div className="container">
          <div className="row g-3">
            <div className="col-lg-3">
              <div className="profile-sidebar-box">
                <div className="profile-sidebar-wrapper">
                  <div className="profile-sidebar">
                    <nav className="nav-profile">
                      <ul>
                        <li>
                          <NavLink
                            to={ROUTE_MAIN_DASHBOARD}
                            className={(navData) =>
                              navData.isActive
                                ? "profile-sidebar-item active-nav "
                                : "profile-sidebar-item"
                            }
                          >
                            {t("Dashboard")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to={ROUTE_MAIN_ORDERS}
                            className={(navData) =>
                              navData.isActive
                                ? "profile-sidebar-item active-nav"
                                : "profile-sidebar-item"
                            }
                          >
                            {t("Orders")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to={ROUTE_MAIN_PROFILE}
                            className={(navData) =>
                              navData.isActive
                                ? "profile-sidebar-item active-nav"
                                : "profile-sidebar-item"
                            }
                          >
                            {t("Edit Profile")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to={ROUTE_MAIN_WISHLIST}
                            className={(navData) =>
                              navData.isActive
                                ? "profile-sidebar-item active-nav"
                                : "profile-sidebar-item"
                            }
                          >
                            {t("Wishlist")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to={ROUTE_MAIN_CHANGE_PASSWORD}
                            className={(navData) =>
                              navData.isActive
                                ? "profile-sidebar-item active-nav"
                                : "profile-sidebar-item"
                            }
                          >
                            {t("Change Password")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="#"
                            onClick={handleLogout}
                            className={"profile-sidebar-item"}
                          >
                            {t("Logout")}
                          </NavLink>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="profile-main-container">
                <div className="profile-main-wrapper">
                  <div className="profile-main-item">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
