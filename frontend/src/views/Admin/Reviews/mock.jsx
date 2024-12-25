import { get } from "lodash";

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
    field: "user_name",
    headerName: "User Name",
    width: 180,
    align: "left",
  },
  {
    field: "product_name",
    headerName: "Product Name",
    width: 180,
    align: "left",
  },
  {
    field: "product_image",
    headerName: "Product Image",
    width: 120,
    align: "left",
    renderCell: (params) => (
      <>
        <img src={get(params, "row.product_image")} />
      </>
    ),
    sortable: false,
  },
  {
    field: "user_review",
    headerName: "User Review",
    width: 300,
    align: "left",
  },

  {
    field: "date",
    headerName: "Order Date",
    width: 180,
    align: "left",
  },
  {
    field: "price",
    headerName: "Price",
    width: 180,
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
        <DeleteOutlineOutlinedIcon />
      </>
    ),
  },
];
