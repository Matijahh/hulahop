import { get } from "lodash";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import PreviewJsonImage from "../../../components/PreviewJsonImage";
import Switch from "@mui/material/Switch";

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
    width: 200,
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
    field: "product_name",
    headerName: "Product Name",
    width: 200,
    align: "left",
  },
  {
    field: "product_description",
    headerName: "Product Description",
    width: 300,
    align: "left",
  },
  {
    field: "category",
    headerName: "Category",
    width: 180,
    align: "left",
  },
  {
    field: "base_price",
    headerName: "Base Price",
    width: 180,
    align: "left",
  },
  {
    field: "associate_price",
    headerName: "Associate Price",
    width: 180,
    align: "left",
  },
  {
    field: "price_margine",
    headerName: "Price Margine",
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
    field: "best selling product",
    headerName: "Best Selling",
    width: 150,
    align: "center",
    sortable: false,
    renderCell: ({ row }) => (
      <>
        <div className="d-flex align-items-cente">
          <Switch
            checked={row.isBestSelling}
            onChange={() =>
              row.handleBestSellingImage(row.isBestSelling, row.id)
            }
          />
        </div>
      </>
    ),
  },

  {
    field: "action",
    headerName: "Action",
    width: 100,
    align: "center",
    sortable: false,
    renderCell: ({ row }) => (
      <>
        <div className="d-flex align-items-center">
          <div
            role="button"
            className="me-2"
            onClick={() => row.EditAssociateProducts(row.id, row?.product_id)}
          >
            <RemoveRedEyeOutlinedIcon />
          </div>
          <div role="button" onClick={() => row.handleOpenToggle(row)}>
            <DeleteOutlinedIcon />
          </div>
        </div>
      </>
    ),
  },
];
