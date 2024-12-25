import styled from "styled-components";

const TABLE_OFFSET = "184px";

export const AssociatesContainer = styled.div`
  .user-table {
    height: calc(100vh - ${TABLE_OFFSET});

    .css-yrdy0g-MuiDataGrid-columnHeaderRow {
      .MuiDataGrid-withBorderColor:nth-child(2),
      .MuiDataGrid-withBorderColor:nth-child(7),
      .MuiDataGrid-withBorderColor:nth-child(8),
      .MuiDataGrid-withBorderColor:last-child {
        .MuiDataGrid-columnHeaderTitleContainer {
          justify-content: center;
        }
      }
    }

    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
  }
`;
