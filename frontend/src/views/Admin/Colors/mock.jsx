import { get } from "lodash";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

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
    field: "color",
    headerName: "Color",
    width: 100,
    align: "center",
    sortable: false,
    renderCell: (params) => (
      <>
        <span
          className="color-circle"
          style={{ background: `${get(params, "row.color_code")}` }}
        ></span>
      </>
    ),
  },

  {
    field: "color_name",
    headerName: "Color Name",
    width: 180,
    align: "left",
  },

  {
    field: "color_code",
    headerName: "Color Code",
    width: 300,
    align: "left",
  },

  {
    field: "status",
    headerName: "Status",
    width: 150,
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
            onClick={() => row.handleOpenDeleteModal(row.id, row.color_name)}
          >
            <DeleteOutlinedIcon />
          </div>
        </div>
      </>
    ),
  },
];
