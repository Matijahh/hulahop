import { get } from "lodash";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { getImageUrlById } from "../../../utils/commonFunctions";

export const renderHeader = [
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
    field: "associate_logo",
    headerName: "Store Logo",
    width: 120,
    align: "center",
    renderCell: (params) => (
      <>
        <img src={getImageUrlById(get(params, "row.associate_logo"))} />
      </>
    ),
    sortable: false,
  },
  {
    field: "associate_name",
    headerName: "Associate Name",
    width: 180,
    align: "left",
  },
  {
    field: "store_name",
    headerName: "Store Name",
    width: 180,
    align: "left",
  },
  {
    field: "request_ammount",
    headerName: "Request Ammount",
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
    width: 180,
    align: "center",
  },

  {
    field: "action",
    headerName: "Action",
    width: 100,
    align: "center",
    sortable: false,
    renderCell: ({ row }) => (
      <>
        <div
          role="button"
          className="align-items-center"
          onClick={() => {
            row.openModel(row.withdrawnDetail);
          }}
        >
          <EditOutlinedIcon />
        </div>
      </>
    ),
  },
];
