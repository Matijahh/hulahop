import {
  commonSignOut,
  getRegfreshToken,
  setAcessToken,
} from "./commonFunctions";
import axios from "axios";
import { get } from "lodash";
import { REST_URL_SERVER, ACCESS_TOKEN } from "./constant";
import i18next from "i18next";

import { ErrorTaster } from "../components/Toast";

export const getNewAccessToken = async () => {
  let refreshToken = getRegfreshToken();

  if (refreshToken) {
    const req_body = {
      refresh_token: refreshToken,
    };

    let apiPromise = new Promise((resolve, reject) => {
      axios
        .post(`${REST_URL_SERVER}/auth/refresh`, req_body, {
          headers: {
            accept: "application/json",
          },
        })
        .then(async (response) => {
          if (response) {
            return resolve(response.data);
          } else {
            return resolve(response.data);
          }
        })
        .catch((error) => {
          ErrorTaster(t(error));
          commonSignOut();
        });
    });
    return await apiPromise;
  } else {
    commonSignOut();
  }
};

const setNewAccessToken = async () => {
  let response = await getNewAccessToken();

  if (response) {
    const { data } = response;
    setAcessToken(get(data, "access_token"));
    window.location.reload();
  } else {
    commonSignOut();
  }
};

export const axiosInstance = axios.create({
  baseURL: `${REST_URL_SERVER}`,
});

if (ACCESS_TOKEN) {
  axiosInstance.defaults.headers["Authorization"] = `Bearer  ${ACCESS_TOKEN}`;
}

axiosInstance.defaults.headers["accept"] = "application/json";

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const responseData = error.response
      ? error.response.data
      : {
          code: 0,
          message: error.message,
        };

    if (responseData.statusCode !== 404) {
      if (
        responseData?.message?.message ||
        error?.response?.message ||
        error?.message?.message
      ) {
        ErrorTaster(
          i18next.t(
            responseData?.message.message ||
              error?.response.message ||
              error?.message.message
          )
        );
      } else {
        ErrorTaster(
          i18next.t(responseData?.message || error?.response || error?.message)
        );
      }
    }

    const statusData = error.response ? error.response.status : 500;
    if (statusData === 401) {
      setNewAccessToken();
    }

    return Promise.reject({
      status: statusData || 500,
      data: responseData,
    });
  }
);

export const commonGetQuery = async (url) => {
  try {
    const response = await axiosInstance({
      method: "GET",
      url: url,
    });

    if (response) return response;
  } catch (error) {
    const { message } = error.data;

    return console.warn(message.error);
  }
};

export const getQuerySearch = async (url, searchParams) => {
  try {
    const response = await axiosInstance({
      method: "GET",
      url: url,
      params: {
        ...searchParams,
      },
    });

    if (response) return response;
  } catch (error) {
    const { message } = error.data;

    return console.warn(message);
  }
};

export const commonAddUpdateQuery = async (url, data, type) => {
  try {
    const response = await axiosInstance({
      method: type || "POST",
      url: url,
      data: {
        ...data,
      },
    });

    if (response) {
      return response || null;
    } else {
      return null;
    }
  } catch (error) {}
};
