import styled from "styled-components";

const TABLE_OFFSET = "184px";

export const CreateProductContainer = styled.div`
  .btn-submit {
    width: 100%;
    margin-top: 31px;
  }

  .products-table {
    height: calc(100vh - ${TABLE_OFFSET});

    .css-yrdy0g-MuiDataGrid-columnHeaderRow {
      .MuiDataGrid-withBorderColor:nth-child(2),
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
