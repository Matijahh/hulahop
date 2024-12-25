import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";
import { connect } from "react-redux";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { ACCESS_TOKEN } from "../../../utils/constant";
import * as Action from "../../../redux/actions";

import LineChartView from "../../../components/Charts/LineChartView";

import { CommonWhiteBackground } from "../../../components/Sections";
import { DashboardContainer } from "./styled";
import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { LoaderContainer } from "../../../components/Loader";

const Dashboard = ({ saveUserData }) => {
  const [loading, setLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [earningsLoading, setEarningsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [monthlyEarnings, setMonthlyEarnings] = useState([]);

  const { t } = useTranslation();

  const getUserData = async () => {
    if (ACCESS_TOKEN) {
      const decoded = jwtDecode(ACCESS_TOKEN);
      const response = await commonGetQuery(`/users/${decoded.id}`);

      if (response) {
        const { data } = response.data;
        saveUserData(data);
      }
    }
  };

  const getDashboardData = async () => {
    setLoading(true);

    const response = await commonGetQuery("/dashboard/performance");

    if (response) {
      setDashboardData(response.data);
      setLoading(false);
    }
  };

  const getMonthlyOrders = async () => {
    setOrdersLoading(true);

    const response = await commonGetQuery("/dashboard/monthly-stats/orders");

    if (response) {
      setMonthlyOrders(response.data);
      setOrdersLoading(false);
    }
  };

  const getMonthlyEarnings = async () => {
    setEarningsLoading(true);

    const response = await commonGetQuery("/dashboard/monthly-stats/earnings");

    if (response) {
      setMonthlyEarnings(response.data);
      setEarningsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
    getDashboardData();
    getMonthlyOrders();
    getMonthlyEarnings();
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("Dashboard - Associate")}</title>
      </Helmet>
      <DashboardContainer>
        <CommonWhiteBackground>
          <div className="main-title">{t("Performance")}</div>
          <div className="top-todo-list">
            <div className="todo-list-item">
              <div className="title">{t("Total Sales")}</div>
              <div className="value">
                {dashboardData?.brutoEarnings || 0} RSD
              </div>
            </div>
            <div className="todo-list-item">
              <div className="title">{t("Wallet")}</div>
              <div className="value">{dashboardData?.wallet || 0} RSD</div>
            </div>
            <div className="todo-list-item">
              <div className="title">{t("Orders")}</div>
              <div className="value">{dashboardData?.totalOrders || 0}</div>
            </div>
            <div className="todo-list-item">
              <div className="title">{t("Total Products Sold")}</div>
              <div className="value">{dashboardData?.totalSoldItems || 0}</div>
            </div>
          </div>
        </CommonWhiteBackground>

        {loading && <LoaderContainer />}

        <Row>
          <Col md={12}>
            <CommonWhiteBackground className="mt-4">
              <div className="main-title ">{t("Sales This Month")}</div>
              {!ordersLoading && (
                <div className="chart-cover">
                  <LineChartView
                    chartData={monthlyEarnings}
                    label={t("Sales")}
                    labelSuffix={"RSD"}
                  />
                </div>
              )}
            </CommonWhiteBackground>
          </Col>
          <Col md={12}>
            <CommonWhiteBackground className="mt-4">
              <div className="main-title ">{t("Orders This Month")}</div>
              {!earningsLoading && (
                <div className="chart-cover">
                  <LineChartView
                    chartData={monthlyOrders}
                    label={t("Orders")}
                  />
                </div>
              )}
            </CommonWhiteBackground>
          </Col>
        </Row>
      </DashboardContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = {
  saveUserData: (data) => Action.saveUserData(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
