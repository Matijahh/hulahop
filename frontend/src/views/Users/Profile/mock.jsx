import { get } from "lodash";
import { getImageUrlById } from "../../../utils/commonFunctions";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import PreviewJsonImage from "../../../components/PreviewJsonImage";

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
    field: "product_image",
    headerName: "Product Image",
    width: 120,
    align: "center",
    renderCell: ({ row }) => (
      <>
        <div style={{ width: 200, height: "auto" }}>
          <PreviewJsonImage
            previewImageUrl={get(row, "previewImageUrl")}
            json={
              row?.productData?.image_json?.imageObj
                ? JSON.parse(row?.productData?.image_json?.imageObj)
                : null
            }
            productData={row?.productData}
          />
        </div>
      </>
    ),
    sortable: false,
  },

  {
    field: "id",
    headerName: "Order ID",
    width: 120,
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
    headerName: "Order Total",
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
          className="me-2"
          onClick={() => row.openModel(row.orderDetail)}
        >
          <VisibilityOutlinedIcon />
        </div>
      </>
    ),
  },
];

export const WishListHeader = [
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
    field: "product_image",
    headerName: "Product Image",
    width: 120,
    align: "center",
    renderCell: ({ row }) => (
      <>
        <img src={getImageUrlById(row.image)} />
      </>
    ),
    sortable: false,
  },

  {
    field: "price",
    headerName: "Price",
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
            onClick={() =>
              row.ViewProduct(
                row.associate_product_name,
                row.associate_product_id
              )
            }
          >
            <RemoveRedEyeOutlinedIcon />
          </div>
          <div role="button" onClick={() => row.handleDelete(row.id)}>
            <DeleteOutlinedIcon />
          </div>
        </div>
      </>
    ),
  },
];
