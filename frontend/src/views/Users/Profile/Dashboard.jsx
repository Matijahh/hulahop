import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { ACCESS_TOKEN } from "../../../utils/constant";
import { jwtDecode } from "jwt-decode";
import { get } from "lodash";
import {
  ROUTE_ADMIN_DASHBOARD,
  ROUTE_ASSOCIATE_MAIN_DASHBOARD,
  ROUTE_SIGN_UP,
} from "../../../routes/routes";
import { handlePublicRedirection } from "../../../utils/commonFunctions";

import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import ButtonComponent from "../../../components/ButtonComponent";
import { LoaderContainer } from "../../../components/Loader";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

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
  );
};

export default Dashboard;
