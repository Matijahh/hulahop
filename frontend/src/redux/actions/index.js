import get from "lodash/get";
import * as types from "../constants/actionTypes";
import Axios from "axios";
import Cookies from "js-cookie";
import {
  ACCESS_TOKEN_NAME,
  COOKIE_ACCESS_TOKEN_NAME,
  REST_URL_SERVER,
} from "../../utils/constant";
import { ROUTE_SIGN_IN } from "../../routes/routes";

import { ErrorTaster } from "../../components/Toast";

export const saveToken = (data) => (dispatch) => {
  dispatch({ type: types.SAVE_TOKEN, data });
};

export const saveUserData = (data) => {
  return (dispatch) => {
    dispatch({
      type: types.SAVE_USER_DATA,
      data,
    });
  };
};

export const saveAssociateStoreData = (data) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_ASSOCIATE_STORE,
      data,
    });
  };
};

export const handleForbiddenError = (error) => {
  ErrorTaster(t("Network Error"));

  const statusData = get(error, "response.status");

  if (statusData === 401 || statusData === 403) {
    setTimeout(() => {
      localStorage.removeItem(ACCESS_TOKEN_NAME);
      localStorage.removeItem("role_id");
      localStorage.removeItem("rememberme");
      Cookies.remove(COOKIE_ACCESS_TOKEN_NAME);
      window.location.href = ROUTE_SIGN_IN;
    }, 500);
  }
};

export const doSignIn = (data, isRememberChecked, location) => {
  const config = {
    method: "POST",
    url: `${REST_URL_SERVER}/auth/login`,
    data,
    withCredentials: true,
  };
  return async () =>
    await Axios(config)
      .then((response) => {
        if (response.data && response.data.success === 1) {
          //setTokenAfterLogin(response, isRememberChecked);
          if (get(location, "state.prevPath")) {
            if (get(location, "state.prevPath") !== "/in/sign-out") {
              window.location = get(location, "state.prevPath");
              return;
            }
          }
          //handleRedirection(get(response, "data.data.role_id"));
        } else {
          ErrorTaster(get(response, "data.message"));
        }
      })
      .catch((error) => {
        handleForbiddenError(error);
      });
};

export const saveShopCategoryList = (data) => (dispatch) => {
  dispatch({ type: types.SAVE_SHOP_CATEGORY_LIST, data });
};
