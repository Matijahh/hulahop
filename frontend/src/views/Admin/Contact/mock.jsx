import { get } from "lodash";

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
    field: "name",
    headerName: "Name",
    width: 180,
    align: "left",
  },

  {
    field: "email",
    headerName: "Email",
    width: 180,
    align: "left",
  },
  {
    field: "mobile",
    headerName: "Contact No",
    width: 180,
    align: "left",
  },
  {
    field: "subject",
    headerName: "Subject",
    width: 300,
    align: "left",
  },
  {
    field: "message",
    headerName: "Message",
    width: 300,
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
          <div role="button" onClick={() => row.handleDelete(row.id)}>
            <DeleteOutlinedIcon />
          </div>
        </div>
      </>
    ),
  },
];
