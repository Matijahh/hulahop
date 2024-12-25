import styled from "styled-components";

import { DataGrid } from "@mui/x-data-grid";

const TableWrapper = styled.div`
  .MuiDataGrid-columnSeparator {
    display: none !important;
  }

  .MuiDataGrid-columnHeaderTitle {
    white-space: normal !important;
    line-height: normal !important;
    text-align: center;
  }

  .MuiDataGrid-columnHeaderTitleContainer {
    &:hover,
    &:focus {
      outline: none !important;
    }
  }

  .MuiDataGrid-columnHeader,
  .MuiDataGrid-columnHeaderDraggableContainer {
    &:focus {
      outline: none !important;
    }
    outline: none !important;
  }

  .MuiDataGrid-cell {
    max-height: 100% !important;
    overflow: visible !important;
    white-space: normal !important;
    line-height: normal !important;
    height: unset !important;
    padding: 10px 0;

    &:focus {
      outline: none !important;
    }
  }

  .MuiTablePagination-selectLabel,
  .MuiTablePagination-displayedRows {
    margin: 0 !important;
  }

  .MuiDataGrid-cellContent {
    white-space: normal !important;
    line-height: normal !important;
    text-overflow: pre-wrap !important;
  }

  .MuiDataGrid-cellContent {
    white-space: normal !important;
    line-height: normal !important;
    overflow: visible;
  }

  .MuiDataGrid-row {
    height: auto !important;
  }

  .MuiDataGrid-cell {
    padding: 12px !important;
    align-items: flex-start !important;

    &:focus-within {
      outline: none !important;
    }
  }

  .css-1m51uxs-MuiDataGrid-root
    .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)
    > .MuiDataGrid-cell {
    padding: 12px !important;
  }

  .MuiDataGrid-virtualScroller {
    overflow-y: auto !important;
  }

  .MuiDataGrid-cell {
    img {
      max-width: 100%;
      height: auto;
    }
  }
`;
const Tables = (props) => {
  const rows = [
    {
      id: 1,
      lastName:
        "field is the only required property since it's the column identifier. It's also used to match with GridRowModel values.field is the only required property since it's the column identifier. It's also used to match with GridRowModel values.field is the only required property since it's the column identifier. It's also used to match with GridRowModel values.field is the only required property since it's the column identifier. It's also used to match with GridRowModel values.field is the only required property since it's the column identifier. It's also used to match with GridRowModel values.field is the only required property since it's the column identifier. It's also used to match with GridRowModel values.field is the only required property since it's the column identifier. It's also used to match with GridRowModel values.",
      firstName: "Jon",
      age: 35,
    },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 10, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 11, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "firstName", headerName: "First Name", width: 300 },
    { field: "lastName", headerName: "Last Name", width: 300 },
    {
      field: "age",
      headerName: "Age",
      width: 200,
      align: "left",
    },
    {
      field: "fullName",
      headerName: "Full name",
      sortable: false,
      width: 328.49,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const { header, body, onRowClick } = props;

  return (
    <div style={{ width: "100%" }}>
      <TableWrapper style={{ width: "100%" }}>
        <DataGrid
          className={props.className}
          rows={body || rows}
          columns={header || columns}
          columnHeaderHeight={50}
          disableColumnMenu
          getRowHeight={() => "auto"}
          disableColumnSelector
          disableRowSelectionOnClick
          onRowClick={onRowClick}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
        />
      </TableWrapper>
    </div>
  );
};

export default Tables;
