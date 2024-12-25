import { get } from "lodash";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
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
    field: "product_description",
    headerName: "Product Description",
    width: 300,
    align: "left",
  },
  {
    field: "reason",
    headerName: "Reason",
    width: 300,
    align: "left",
  },
  {
    field: "price",
    headerName: "Price",
    width: 180,
    align: "left",
  },
  {
    field: "category",
    headerName: "Category",
    width: 180,
    align: "left",
  },

  {
    field: "order_date",
    headerName: "Order Date",
    width: 180,
    align: "left",
  },
  {
    field: "returned_date",
    headerName: "Returned Date",
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
    field: "qty",
    headerName: "Quantity",
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
        <div className="d-flex align-items-cente">
          <div className="me-2">
            <FileDownloadOutlinedIcon />
          </div>
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
