import moment from "moment";

export const REST_URL_SERVER = import.meta.env.VITE_BASE_SERVER_URL;
export const ACCESS_TOKEN_NAME = "accessToken";
export const REFRESH_TOKEN_NAME = "refreshToken";
export const ROLE_NAME = "role";
export const ACCESS_TOKEN = localStorage.getItem(ACCESS_TOKEN_NAME);
export const USER_ROLE = localStorage.getItem(ROLE_NAME);
export const COOKIE_ACCESS_TOKEN_NAME = "remember_me_token";

export const emailPattern = new RegExp(
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
export const passwordPattern = new RegExp(
  /^(?!.*[\s])(?=.*[a-z])(?=.*[A-Z])((?=.*[0-9])|(?=.*[!@#$%^&*]))(?=.{8,})/
);
export const phonePattern = new RegExp(/^[0-9]{10}$/);
export const numericPattern = new RegExp(/^[0-9\b]+$/);
export const spacePattern = new RegExp(/\s/);

export const InvalidEmail = "Please enter a valid email without spaces";
export const InvalidPassword =
  "Password should contains (UpperCase, LowerCase, Number or SpecialChar and min 8 Chars without spaces)";
export const InvalidConfPassword = "Confirm password must same!";
export const InvalidPhone = "Enter 10 digit phone number without spaces";
export const InvalidPasswordNoSpaces = "Please enter a password without spaces";

export const PasswordValidationList = {
  passLength: false,
  upper: false,
  lower: false,
  digit: false,
  specialChar: false,
};

export const urlFormatter = (url) => {
  const setUrl = url ? (url.startsWith("http") ? url : `https://${url}`) : "#";
  return setUrl;
};

export const removeHttpFromUrl = (url) => {
  const setUrl = url ? url.replace(/^https?:\/\//, "") : "";
  return setUrl;
};

export const dateFormatter = (date) => {
  let formattedDate = "";
  if (date) formattedDate = moment(date).format("MM-DD-YYYY");
  return formattedDate;
};

export const formatToCurrency = (amount) => {
  let formattedValue;
  if (parseFloat(amount)) {
    formattedValue = parseFloat(amount).toFixed(2);
    formattedValue = parseFloat(formattedValue).toLocaleString("en-US");
  } else {
    formattedValue = 0;
  }
  return ` ${formattedValue}`;
};

export const formatterNumberForMillion = (n) => {
  if (n < 1e6) return formatToCurrency(parseFloat(n).toFixed(1));
  if (n >= 1e6 && n < 1e9)
    return `${formatToCurrency(parseFloat(n / 1e6).toFixed(1))}M`;
  if (n >= 1e9 && n < 1e12)
    return `${formatToCurrency(parseFloat(n / 1e9).toFixed(1))}B`;
  if (n >= 1e12) return `${formatToCurrency(parseFloat(n / 1e12).toFixed(1))}T`;
};

export const formatNumber = (val) =>
  val.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const removeComma = (value) => {
  return value ? value.replace(/,/g, "") : "";
};

export const getDyamicYear = () => {
  return moment().get("year");
};

export const convertTimeStampToDate = (
  timestamp,
  outputFormat = "MM-DD-YYYY"
) => {
  const date = moment.unix(timestamp);

  // Check if the conversion was successful
  if (!date.isValid()) {
    return "Invalid date";
  }

  // Format the parsed date according to the specified output format
  const formattedDate = date.format(outputFormat);

  return formattedDate;
};
