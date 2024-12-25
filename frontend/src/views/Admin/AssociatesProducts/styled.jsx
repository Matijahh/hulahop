import styled from "@emotion/styled";

const TABLE_OFFSET = "184px";

export const AssociatesProductsContainer = styled.div`
  .products-table {
    height: calc(100vh - ${TABLE_OFFSET});

    .css-yrdy0g-MuiDataGrid-columnHeaderRow {
      .MuiDataGrid-withBorderColor:nth-child(2),
      .MuiDataGrid-withBorderColor:nth-child(9),
      .MuiDataGrid-withBorderColor:nth-child(10),
      .MuiDataGrid-withBorderColor:last-child {
        .MuiDataGrid-columnHeaderTitleContainer {
          justify-content: center;
        }
      }
    }

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
  }
`;
