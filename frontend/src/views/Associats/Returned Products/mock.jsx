import { get } from "lodash";

export const renderHeader = [
  {
    field: "no",
    headerName: "No.",
    width: 100,
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
    align: "left",
    renderCell: () => (
      <>
        <img src="https://picsum.photos/seed/picsum/40/40" />
      </>
    ),
    sortable: false,
  },
  {
    field: "product_desc",
    headerName: "Description",
    width: 300,
    align: "left",
    sortable: false,
  },
  {
    field: "return_resone",
    headerName: "Reason",
    width: 300,
    align: "left",
    sortable: false,
  },
  {
    field: "id",
    headerName: "Order ID",
    width: 180,
    align: "left",
  },
  {
    field: "sku",
    headerName: "Order SKU",
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
    headerName: "Total",
    width: 180,
    align: "left",
  },
  {
    field: "status",
    headerName: "Status",
    width: 180,
    align: "left",
  },
];
