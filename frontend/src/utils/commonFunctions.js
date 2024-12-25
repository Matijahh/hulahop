import {
  ROUTE_ADMIN_DASHBOARD,
  ROUTE_ADMIN_SIGN_IN,
  ROUTE_ASSOCIATE_MAIN_DASHBOARD,
  ROUTE_MAIN,
  ROUTE_SIGN_IN,
} from "../routes/routes";
import get from "lodash/get";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  ACCESS_TOKEN_NAME,
  COOKIE_ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
  REST_URL_SERVER,
} from "./constant";

import NoImage from "../assets/images/no-image-placeholder.png";

export const generateUniqueId = () => {
  const timestamp = new Date().getTime();
  const uniqueId = `id_${timestamp}_${Math.floor(Math.random() * 1000)}`;
  return uniqueId;
};

export const getUserType = () => {
  const Role = localStorage.getItem("type");
  return Role || null;
};

export const getUserToken = () => {
  const Token = localStorage.getItem("accessToken");
  return Token || null;
};

export const setTokenAfterLogin = (response, isRememberChecked) => {
  localStorage.setItem(
    ACCESS_TOKEN_NAME,
    get(response, "data.data.access_token")
  );

  localStorage.setItem(
    REFRESH_TOKEN_NAME,
    get(response, "data.data.refresh_token")
  );

  localStorage.setItem("type", get(response, "data.data.type"));

  if (isRememberChecked) {
    localStorage.setItem("rememberme", true);
  } else {
    Cookies.set(
      COOKIE_ACCESS_TOKEN_NAME,
      get(response, "data.data.access_token")
    );
  }
};

export const setTokenAfterRegistration = (response) => {
  localStorage.setItem(
    ACCESS_TOKEN_NAME,
    get(response, "data.data.access_token")
  );

  localStorage.setItem(
    REFRESH_TOKEN_NAME,
    get(response, "data.data.refresh_token")
  );

  localStorage.setItem("type", get(response, "data.data.user.type"));

  Cookies.set(
    COOKIE_ACCESS_TOKEN_NAME,
    get(response, "data.data.access_token")
  );
};

export const getAcessToken = () => {
  let token = localStorage.getItem(ACCESS_TOKEN_NAME);
  return token;
};

export const setAcessToken = (token) => {
  localStorage.setItem(ACCESS_TOKEN_NAME, token);
};

export const getRegfreshToken = () => {
  let token = localStorage.getItem(REFRESH_TOKEN_NAME);
  return token;
};

export const setRegfreshToken = (token) => {
  localStorage.setItem(REFRESH_TOKEN_NAME, token);
};

export const handleRedirection = (role) => {
  switch (role) {
    case "ADMIN":
      window.location.replace(`${ROUTE_ADMIN_DASHBOARD}`);
      break;
    case "ASSOCIATE":
      window.location.replace(`${ROUTE_ASSOCIATE_MAIN_DASHBOARD}`);
      break;
    default:
      window.location.replace(`${ROUTE_MAIN}`);
      break;
  }
};

export const handlePublicRedirection = (role, clearStorage) => {
  if (clearStorage) {
    localStorage.clear();
  }
  switch (role) {
    case "ADMIN":
      window.location.replace(`${ROUTE_ADMIN_SIGN_IN}`);
      break;
    default:
      window.location.replace(`${ROUTE_SIGN_IN}`);
      break;
  }
};

export const commonSignOut = () => {
  localStorage.clear();
  Cookies.remove();
  window.location.replace(`${ROUTE_SIGN_IN}`);
};

export const getSelectobjectValue = (value) => {
  let isSeparable = value.includes(",");
  let id = "";
  let title = "";
  if (isSeparable) {
    id = value.split(",")[0];
    title = value.split(",")[1];
  } else {
    id = value;
    title = value;
  }
  let selectObj = { id, title };
  return selectObj;
};

export const getImageUrlById = (id) => {
  let url = `${REST_URL_SERVER}/images/${id}`;
  return id ? url : NoImage;
};

export const getUserInfo = () => {
  // Check if the user is logged in
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);

  if (!token) {
    // User is not logged in
    return { isLoggedIn: false };
  }

  // User is logged in, decode the JWT token
  try {
    const decodedToken = jwtDecode(token);

    // Check if the token is expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
      // Token is expired
      return { isLoggedIn: false, isExpired: true };
    }

    // Token is valid, return user information
    return { isLoggedIn: true, user: decodedToken };
  } catch (error) {
    // Error decoding token
    console.error("Error decoding token:", error);
    return { isLoggedIn: false, error: "Error decoding token" };
  }
};

export const dataURLtoFile = (dataURL, filename = "image.png") => {
  // Split the data URL to get the mime type and the base64 encoded data
  const [, mimeType, base64Data] = dataURL.match(/^data:(.*?);base64,(.*)$/);

  // Decode the base64 data
  const decodedData = atob(base64Data);

  // Convert the decoded data to a Uint8Array
  const arrayBuffer = new ArrayBuffer(decodedData.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < decodedData.length; i++) {
    uint8Array[i] = decodedData.charCodeAt(i);
  }

  // Create a blob from the Uint8Array
  const blob = new Blob([uint8Array], { type: mimeType });

  // Create a File object from the blob
  return new File([blob], filename, { type: mimeType });
};

export const getMimeTypeFromUrl = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    if (response.ok) {
      const contentType = response.headers.get("Content-Type");
      const fileExtension = contentType.split("/").pop();
      return fileExtension;
    } else {
      console.error(
        "Failed to fetch URL:",
        response.status,
        response.statusText
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching URL:", error.message);
    return null;
  }
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

export function isEmpty(obj) {
  if (obj === "") return true;
  if (obj === 0) return true;
  if (obj === "0") return true;
  if (obj == null) return true;
  if (obj === false) return true;
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;
  if (typeof obj == "undefined") return true;
  if (!Object.keys(obj).length) return true;
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }
}

export function isEmptyObj(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
}

export function slugify(name, id) {
  const formatName = name?.replace(/\s/g, "")?.trim()?.toLowerCase();
  return `${formatName}-${id}`;
}

export function slugifyString(string) {
  return string
    .toString() // Convert to string
    .normalize("NFD") // Normalize accents
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing spaces
    .replace(/[^a-z0-9 -]/g, "") // Remove invalid characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-"); // Replace multiple dashes with a single dash
}

export function camelCase(str) {
  // Using replace method with regEx
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
    })
    .replace(/\s+/g, "");
}
