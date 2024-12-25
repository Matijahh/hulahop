import { get } from "lodash";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

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
    field: "en",
    headerName: "English",
    width: 450,
    align: "left",
  },

  {
    field: "sb",
    headerName: "Serbian",
    width: 450,
    align: "left",
  },

  {
    field: "action",
    headerName: "Action",
    width: 100,
    align: "center",
    renderCell: ({ row }) => (
      <>
        <div className="d-flex align-items-center cursor-pointer">
          <div
            role="button"
            className="me-2"
            onClick={() => row.handleEdit(row)}
          >
            <EditOutlinedIcon />
          </div>
        </div>
      </>
    ),
  },
];
