import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import {
  ROUTE_ADMIN_ANNOUNCEMENTS_ADD,
  ROUTE_ADMIN_ANNOUNCEMENTS_EDIT,
} from "../../../routes/routes";
import styled from "styled-components";

import Tables from "../../../components/SuperAdmin/Tables";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ButtonComponent from "../../../components/ButtonComponent";
import ModalComponent from "../../../components/ModalComponent";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { LoaderContainer } from "../../../components/Loader";

const TABLE_OFFSET = "184px";

const Container = styled.div`
  .announcements-table {
    height: calc(100vh - ${TABLE_OFFSET});

    .css-yrdy0g-MuiDataGrid-columnHeaderRow {
      .MuiDataGrid-withBorderColor:last-child {
        .MuiDataGrid-columnHeaderTitleContainer {
          justify-content: center;
        }
      }
    }
  }
`;

const Announcements = () => {
  const tableHeaderTitle = [
    { field: "id", headerName: "ID" },
    { field: "title", headerName: "Title", width: 200 },
    { field: "desc", headerName: "Details", width: 700 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      align: "center",
      renderCell: ({ row }) => (
        <>
          <div className="d-flex align-items-cente">
            <div
              role="button"
              className="me-2"
              onClick={() => row.EditColor(row.id)}
            >
              <EditOutlinedIcon />
            </div>
            <div
              role="button"
              onClick={() => row.handleOpenDeleteModal(row.id, row.title)}
            >
              <DeleteOutlinedIcon />
            </div>
          </div>
        </>
      ),
    },
  ];

  const [loading, setLoading] = useState(false);
  const [tableList, setTableList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);

  const navigation = useNavigate();
  const { t } = useTranslation();

  const getAnnouncementData = async () => {
    setLoading(true);

    const response = await commonGetQuery("/announcements");

    setLoading(false);

    if (response) {
      const { data } = response.data;
      const modifiedData = data.map((item) => {
        return {
          id: item.id,
          title: item.title,
          desc: item.description,
          handleOpenDeleteModal,
          EditColor,
        };
      });

      setTableList(modifiedData);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/announcements/${announcementToDelete.id}`,
      null,
      "DELETE"
    );

    if (response) {
      getAnnouncementData();
    }

    setLoading(false);

    handleToggle();
  };

  const handleOpenDeleteModal = (id, title) => {
    setAnnouncementToDelete({ id, title });
    handleToggle();
  };

  const EditColor = (id) => {
    let route = ROUTE_ADMIN_ANNOUNCEMENTS_EDIT.replace(":id", id);
    navigation(route);
  };

  useEffect(() => {
    getAnnouncementData();
  }, []);

  return (
    <Container>
      <CommonWhiteBackground>
        <FlexBox className="mb-4 title-wrapper">
          <div className="main-title ">{t("Announcements")}</div>
          <FlexBox className="filters-wrapper">
            <ButtonComponent
              variant="contained"
              startIcon={<AddIcon />}
              text={t("Add Announcements")}
              onClick={() => navigation(ROUTE_ADMIN_ANNOUNCEMENTS_ADD)}
            />
          </FlexBox>
        </FlexBox>

        {loading && <LoaderContainer />}

        <ModalComponent
          title={t("Delete Announcement")}
          size={"m"}
          open={isOpen}
          handleClose={handleToggle}
        >
          <p>
            {`${t("Are you sure you want to delete")} `}
            <span className="bold">{announcementToDelete?.title}</span>
            {`?`}
          </p>
          <>
            <FlexBox hasBorderTop={true} className="pt-3 mt-3">
              <ButtonComponent
                className=""
                variant="outlined"
                fullWidth
                text={t("Cancel")}
                onClick={handleToggle}
              />
              <ButtonComponent
                variant="contained"
                fullWidth
                text={t("Delete")}
                type="button"
                onClick={handleDelete}
              />
            </FlexBox>
          </>
        </ModalComponent>

        <Tables
          className="announcements-table"
          header={tableHeaderTitle.map((item) => ({
            ...item,
            headerName: t(item.headerName),
          }))}
          body={tableList}
        />
      </CommonWhiteBackground>
    </Container>
  );
};
export default Announcements;
