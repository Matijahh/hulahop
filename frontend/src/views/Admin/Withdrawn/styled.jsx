import styled from "styled-components";

const TABLE_OFFSET = "184px";

export const WithdrawnContainer = styled.div`
  .withdrawn-table {
    height: calc(100vh - ${TABLE_OFFSET});

    .css-yrdy0g-MuiDataGrid-columnHeaderRow {
      .MuiDataGrid-withBorderColor:nth-child(2),
      .MuiDataGrid-withBorderColor:nth-child(8),
      .MuiDataGrid-withBorderColor:last-child {
        .MuiDataGrid-columnHeaderTitleContainer {
          justify-content: center;
        }
      }
    }
  }
`;
