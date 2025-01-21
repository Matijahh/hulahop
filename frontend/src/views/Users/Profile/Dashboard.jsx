import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { ACCESS_TOKEN } from "../../../utils/constant";
import { jwtDecode } from "jwt-decode";
import { get, map } from "lodash";
import {
  ROUTE_ADMIN_DASHBOARD,
  ROUTE_ASSOCIATE_MAIN_DASHBOARD,
  ROUTE_SIGN_UP,
} from "../../../routes/routes";
import { handlePublicRedirection } from "../../../utils/commonFunctions";

import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import ButtonComponent from "../../../components/ButtonComponent";
import SelectComponent from "../../../components/SelectComponent";
import { LoaderContainer } from "../../../components/Loader";
import languages from "../../../utils/languages";
import i18n from "../../../i18n";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [langOptions, setLangOptions] = useState([]);
  const [langValue, setLangValue] = useState(null);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    handlePublicRedirection();
  };

  const getUserData = async () => {
    const decoded = jwtDecode(ACCESS_TOKEN);

    setLoading(true);

    const response = await commonGetQuery(`/users/${decoded.id}`);

    setLoading(false);

    if (response) {
      const { data } = response.data;

      setUserData(data);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleDashboard = () => {
    if (userData?.type === "ADMIN") {
      navigate(ROUTE_ADMIN_DASHBOARD);
    }

    if (userData?.type === "ASSOCIATE") {
      navigate(ROUTE_ASSOCIATE_MAIN_DASHBOARD);
    }

    if (userData?.type === "USER") {
      navigate(ROUTE_SIGN_UP);
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

  return (
    <div className="dashboard-box">
      <div className="user-description">
        <h6>
          {t("Hello")} {get(userData, "first_name", "")}
        </h6>
        <p>
          {t(
            "In your user account control panel, you can view your recent orders , manage your shipping and billing address , and change your password and account information."
          )}
        </p>
      </div>

      {loading && <LoaderContainer />}
      <div>
        <div className="language-transfer-tab">
          {langValue && langOptions && (
            <SelectComponent
              width={200}
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
        <div className="btns-container">
          <ButtonComponent
            text={t("Logout")}
            variant="contained"
            className="logout-btn"
            onClick={handleLogout}
          />
          {(get(userData, "type", "") === "ASSOCIATE" ||
            get(userData, "type", "") === "ADMIN") && (
            <ButtonComponent
              text={t("Go to Dashboard")}
              variant="contained"
              className="vendor-btn"
              startIcon={<TableChartOutlinedIcon />}
              onClick={() => handleDashboard()}
            />
          )}
          {get(userData, "type", "") === "USER" && (
            <ButtonComponent
              text={t("Register as Vendor")}
              variant="contained"
              className="vendor-btn"
              onClick={() => handleDashboard()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
