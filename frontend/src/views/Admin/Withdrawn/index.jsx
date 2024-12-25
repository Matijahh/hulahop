import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { renderHeader } from "./mock";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { get, size } from "lodash";
import { getSelectobjectValue } from "../../../utils/commonFunctions";
import map from "lodash/map";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { LoaderContainer } from "../../../components/Loader";
import { ErrorTaster, SuccessTaster } from "../../../components/Toast";
import { WithdrawnContainer } from "./styled";

import Tables from "../../../components/SuperAdmin/Tables";
import ModalComponent from "../../../components/ModalComponent";
import SelectComponent from "../../../components/SelectComponent";
import ButtonComponent from "../../../components/ButtonComponent";

const Withdrawn = () => {
  const [loading, setLoading] = useState(false);
  const [withdrawnList, setWithdrawnList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [withdrawnStatus, setWithdrawnStatus] = useState("");

  const { t } = useTranslation();

  const StatusList = [
    {
      id: "Pending",
      title: t("Pending"),
    },
    {
      id: "Completed",
      title: t("Completed"),
    },
    {
      id: "Cancelled",
      title: t("Cancelled"),
    },
  ];

  const getWithdrawnList = async () => {
    setLoading(true);

    const response = await commonGetQuery("/associate_withdrawn_request");

    if (response) {
      const { data } = response.data;
      setWithdrawnList(data);
      setLoading(false);
    }

    setLoading(false);
  };

  const setTableRenderData = (data) => {
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      id: item.id,

      associate_logo: get(item, "user.store_layout_details.0.logo_image", ""),
      associate_name:
        get(item, "user.first_name", "") +
        " " +
        get(item, "user.last_name", ""),
      store_name: get(item, "user.store_layout_details.0.name", ""),
      request_ammount: get(item, "amount", ""),
      email: get(item, "user.email", ""),
      contact_no: get(item, "user.mobile", ""),
      status: get(item, "status", "") ? get(item, "status", "") : "Pending",
      withdrawnDetail: item,
      openModel,
    }));

    return renderData;
  };

  const openModel = (item) => {
    setIsOpen(true);

    let finalStatus = get(item, "status")
      ? `${get(item, "status")},${get(item, "status")}`
      : `${t("Pending")},${t("Pending")}`;

    setWithdrawnStatus(finalStatus);
    setSelectedData(item);
  };

  const closeModel = () => {
    setIsOpen(false);
    setWithdrawnStatus("");
    setSelectedData({});
  };

  const handelChangeStatus = (e) => {
    setWithdrawnStatus(e.target.value);
  };

  const handleUpdateWithdrawnStatus = async (id) => {
    setLoading(true);

    const URL = id ? `/associate_withdrawn_request/${id}` : "";

    if (URL) {
      let finalStatus =
        withdrawnStatus && getSelectobjectValue(withdrawnStatus);

      const reqBody = {
        status: finalStatus ? finalStatus.id : "Pending",
      };

      try {
        const response = await commonAddUpdateQuery(URL, reqBody, "PATCH");

        if (response) {
          SuccessTaster(t("Withdrawn status updated sucessfully"));
          closeModel();
          getWithdrawnList();
        }

        setLoading(false);
      } catch (error) {
        ErrorTaster(t(error.response.message));
      }
    }
  };

  useEffect(() => {
    getWithdrawnList();
  }, []);

  return (
    <WithdrawnContainer>
      <CommonWhiteBackground>
        <FlexBox className="mb-4 title-wrapper">
          <div className="main-title">{t("Associates Withdrawn Request")}</div>
        </FlexBox>

        {loading && <LoaderContainer />}

        <Tables
          className="withdrawn-table"
          body={
            size(withdrawnList) > 0 ? setTableRenderData(withdrawnList) : []
          }
          header={renderHeader.map((item) => ({
            ...item,
            headerName: t(item.headerName),
          }))}
        />
      </CommonWhiteBackground>

      <ModalComponent
        open={isOpen}
        title={t("Update Status")}
        handleClose={closeModel}
        size="lg"
      >
        <div className="order-detail-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="order-status-box">
                  <div className="row ">
                    <div className="col-lg-6">
                      <SelectComponent
                        fullWidth
                        name="status"
                        optionList={StatusList}
                        onChange={(e) => {
                          handelChangeStatus(e);
                        }}
                        isShowValue
                        value={withdrawnStatus}
                        title={t("Select Status")}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-lg-6 align-self-end">
                      <ButtonComponent
                        text={t("Update")}
                        variant="contained"
                        className="mb-2"
                        onClick={() => {
                          handleUpdateWithdrawnStatus(selectedData.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalComponent>
    </WithdrawnContainer>
  );
};
export default Withdrawn;
