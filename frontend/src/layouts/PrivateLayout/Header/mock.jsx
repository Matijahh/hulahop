import { size } from "lodash";
import {
  ROUTE_MAIN_ABOUT_PRODUCT,
  ROUTE_MAIN_SHOP,
} from "../../../routes/routes";
import i18next from "i18next";

import { NavLink } from "react-router-dom";

export const menuItemsData = (data, name) => {
  let dropdownArray = [];

  if (size(data) > 0) {
    dropdownArray = data.map((category) => ({
      label: (
        <NavLink
          to={ROUTE_MAIN_SHOP + `?categoryId=${category.id || 0}`}
          className="dropdown-link"
        >
          {i18next.t(category.name)}
        </NavLink>
      ),
      items: category.sub_categories.map((subcategory) => ({
        label: (
          <NavLink
            to={
              ROUTE_MAIN_SHOP +
              `?categoryId=${category.id || 0}&sub_categoryId=${
                subcategory.id || 0
              }`
            }
            className="dropdown-link"
          >
            {i18next.t(subcategory.name)}
          </NavLink>
        ),
      })),
    }));
  }

  return {
    label: (
      <NavLink
        to={ROUTE_MAIN_SHOP}
        className={(navData) => (navData.isActive ? "active-nav" : "none")}
      >
        {name}
      </NavLink>
    ),
    items: dropdownArray,
  };
};

export const menuAboutProductData = (data, name) => {
  let dropdownArray = [];
  if (size(data) > 0) {
    dropdownArray = data.map((category) => ({
      label: <div className="dropdown-link">{i18next.t(category.name)}</div>,
      items: category.sub_categories.map((subcategory) => ({
        label: (
          <NavLink
            to={
              ROUTE_MAIN_ABOUT_PRODUCT +
              `?categoryId=${category.id || 0}&sub_categoryId=${
                subcategory.id || 0
              }`
            }
            className="dropdown-link"
          >
            {i18next.t(subcategory.name)}
          </NavLink>
        ),
      })),
    }));
  }

  return {
    label: (
      <NavLink
        to="javascript:void(0);"
        className={(navData) => (navData.isActive ? "active-nav" : "none")}
      >
        {name}
      </NavLink>
    ),
    items: dropdownArray,
  };
};
