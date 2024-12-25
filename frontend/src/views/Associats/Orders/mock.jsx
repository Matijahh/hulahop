import { get } from "lodash";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
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
        <PreviewJsonImage
          previewImageUrl={get(row, "previewImageUrl")}
          json={
            row?.productData?.image_json?.imageObj
              ? JSON.parse(row?.productData?.image_json?.imageObj)
              : null
          }
          productData={row?.productData}
        />
      </>
    ),
    sortable: false,
  },

  {
    field: "id",
    headerName: "Order ID",
    width: 180,
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
          onClick={() => {
            row.openModel(row.orderDetail);
          }}
        >
          <VisibilityOutlinedIcon />
        </div>
      </>
    ),
  },
];
