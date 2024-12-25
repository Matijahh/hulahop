import { get } from "lodash";

import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

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
    field: "category_image",
    headerName: "Category Image",
    width: 170,
    align: "left",
    renderCell: (params) => (
      <>
        <img src={get(params, "row.category_image")} />
      </>
    ),
    sortable: false,
  },
  {
    field: "category_name",
    headerName: "Category Name",
    width: 180,
    align: "left",
  },

  {
    field: "category_desc",
    headerName: "Category Description",
    width: 300,
    align: "left",
  },

  {
    field: "status",
    headerName: "Status",
    width: 180,
    align: "left",
  },

  {
    field: "action",
    headerName: "Action",
    width: 150,
    align: "left",
    renderCell: () => (
      <>
        <div className="d-flex align-items-center">
          <div className="me-2">
            <BorderColorOutlinedIcon />
          </div>
          <div>
            <DeleteOutlineOutlinedIcon />
          </div>
        </div>
      </>
    ),
  },
];
