import { get } from "lodash";
import { getImageUrlById } from "../../../utils/commonFunctions";

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
    field: "blog_img",
    headerName: "Cover Image",
    width: 120,
    align: "center",
    renderCell: (params) => (
      <>
        <img src={getImageUrlById(get(params, "row.image_id"))} />
      </>
    ),
    sortable: false,
  },
  {
    field: "heading",
    headerName: "Blog Heading",
    width: 300,
    align: "left",
  },
  {
    field: "category_name",
    headerName: "Category",
    width: 180,
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
            onClick={() => row.EditColor(row.id)}
          >
            <EditOutlinedIcon />
          </div>
          <div
            role="button"
            onClick={() => row.handleOpenDeleteModal(row.id, row.heading)}
          >
            <DeleteOutlinedIcon />
          </div>
        </div>
      </>
    ),
  },
];
