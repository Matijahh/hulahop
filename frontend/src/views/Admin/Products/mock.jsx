import { get } from "lodash";
import { getImageUrlById } from "../../../utils/commonFunctions";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
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
    width: 200,
    align: "center",
    renderCell: (params) => {
      return (
        <div style={{ width: 200, height: "auto" }}>
          <PreviewJsonImage
            previewImageUrl={getImageUrlById(get(params, "row.product_image"))}
            productData={{
              product: {
                x_position: params.row.x_position,
                y_position: params.row.y_position,
                frame_width: params.row.frame_width,
                frame_height: params.row.frame_height,
              },
            }}
          />
        </div>
      );
    },

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
            onClick={() => row.EditProduct(row.id)}
          >
            <EditOutlinedIcon />
          </div>
          <div role="button" onClick={() => row.handleOpenToggle(row)}>
            <DeleteOutlinedIcon />
          </div>
        </div>
      </>
    ),
  },
];
