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
    field: "review_desc",
    headerName: "Review",
    width: 500,
    align: "left",
    sortable: false,
  },

  {
    field: "review_date",
    headerName: "Created Date",
    width: 300,
    align: "left",
  },
  {
    field: "created_by",
    headerName: "Created By",
    width: 300,
    align: "left",
  },
];
