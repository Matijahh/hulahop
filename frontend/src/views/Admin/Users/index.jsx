import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { renderHeader } from "./mock";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { camelCase, getImageUrlById } from "../../../utils/commonFunctions";
import { Container } from "./styled";

import Tables from "../../../components/SuperAdmin/Tables";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { Loader } from "../../../components/Loader";
import { SuccessTaster } from "../../../components/Toast";

import UpdateUserStatus from "./updateUserStatus";
import ModalComponent from "../../../components/ModalComponent";
import ButtonComponent from "../../../components/ButtonComponent";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedUser, setSelectedUser] = useState();
  const [deleteModal, setDeleteModal] = useState(false);

  const { t } = useTranslation();

  const handleToggle = (item) => {
    setDeleteModal(!deleteModal);
    setSelectedUser(item || null);
  };

  const getUsersData = async () => {
    setLoading(true);

    const response = await commonGetQuery("/users");

    setLoading(false);

    if (response && response.data) {
      const { data } = response.data;

      const sanitizedRecords =
        data.length > 0
          ? data.map((item, index) => {
              return {
                no: `${index + 1}`,
                user_image: getImageUrlById(item.image_id),
                user_name: `${item.first_name} ${item.last_name}`,
                id: item.id,
                user_type: item.type && t(`${camelCase(item.type)}`),
                email: item.email,
                contact_no: item.mobile,
                status: item.status ? t("Active") : t("Inactive"),
              };
            })
          : [];
      setUserData(sanitizedRecords);
    }
  };

  const handleDelete = async (user) => {
    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/users/${user.id}`,
      null,
      "DELETE"
    );

    if (response) {
      getUsersData();
    }

    setLoading(false);

    handleToggle();
  };

  const toggleModal = (item) => {
    setIsOpen(!isOpen);
    setSelectedItem(item || null);
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const handleSendPasswordForgetLink = async (email) => {
    await commonAddUpdateQuery("/auth/forgot-password", {
      email,
    });

    SuccessTaster(t("Password reset email has been successfully sent."));
  };

  return (
    <Container>
      <CommonWhiteBackground>
        <FlexBox className="mb-4 title-wrapper">
          <div className="main-title">{t("Users")}</div>
        </FlexBox>

        {loading ? (
          <Loader height="200px" />
        ) : (
          <Tables
            className="user-table"
            body={userData}
            header={renderHeader(
              toggleModal,
              handleToggle,
              handleSendPasswordForgetLink,
              t("Send")
            ).map((item) => ({ ...item, headerName: t(item.headerName) }))}
          />
        )}

        {isOpen && (
          <UpdateUserStatus
            toggle={toggleModal}
            isOpen={isOpen}
            refresh={getUsersData}
            data={selectedItem}
          />
        )}

        <ModalComponent
          title={t("Delete User")}
          size={"m"}
          open={deleteModal}
          handleClose={handleToggle}
        >
          <p>
            {`${t("Are you sure you want to delete")} `}
            <span className="bold">{selectedUser?.user_name}</span>
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
                onClick={() => {
                  handleDelete(selectedUser);
                }}
              />
            </FlexBox>
          </>
        </ModalComponent>
      </CommonWhiteBackground>
    </Container>
  );
};

export default Users;
