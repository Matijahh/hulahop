import { get } from "lodash";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import StoreIcon from "@mui/icons-material/Store";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import { Switch } from "@mui/material";

export const renderHeader = (toggleModal, editStore, deleteItem, onCheck) => {
  return [
    {
      field: "no",
      headerName: "No.",
      width: 50,
      align: "left",
      sortable: false,
      renderCell: (params) => (
        <>
          <span className="mx-2">{get(params, "row.no")}</span>
        </>
      ),
    },

    {
      field: "user_image",
      headerName: "User Image",
      width: 120,
      align: "center",
      renderCell: (params) => (
        <>
          <img src={get(params, "row.user_image")} />
        </>
      ),
      sortable: false,
    },

    {
      field: "user_name",
      headerName: "User Name",
      width: 180,
      align: "left",
    },

    {
      field: "user_type",
      headerName: "User Type",
      width: 180,
      align: "left",
    },

    {
      field: "email",
      headerName: "Email",
      width: 180,
      align: "left",
    },

    {
      field: "contact_no",
      headerName: "Contact No",
      width: 180,
      align: "left",
    },

    {
      field: "status",
      headerName: "Status",
      width: 150,
      align: "center",
    },

    {
      field: "isHighlighted",
      headerName: "Highlighted",
      width: 100,
      align: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Switch
              checked={params.row.isHighlighted}
              onChange={(e, checked) => onCheck(checked, params.row.id)}
            />
          </>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <>
          <SwitchAccountIcon
            className="cursor-pointer"
            onClick={() => toggleModal(params)}
          />
          <StoreIcon
            className="mx-2 cursor-pointer"
            onClick={() => editStore(params)}
          />
          <DeleteOutlineOutlinedIcon
            className="cursor-pointer"
            onClick={() => deleteItem(params.row)}
          />
        </>
      ),
    },
  ];
};
