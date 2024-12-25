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
    field: "category_name",
    headerName: "Category Name",
    width: 300,
    align: "left",
  },

  {
    field: "sub_category_name",
    headerName: "Sub Category Name",
    width: 300,
    align: "left",
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
            onClick={() => row.EditAboutProduct(row.id)}
          >
            <EditOutlinedIcon />
          </div>
          <div
            role="button"
            onClick={() => row.handleOpenToggle(row.id, row.sub_category_name)}
          >
            <DeleteOutlinedIcon />
          </div>
        </div>
      </>
    ),
  },
];
