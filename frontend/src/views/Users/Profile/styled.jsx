import styled from "styled-components";

export const WishlistContainer = styled.div`
  .wishlist-table {
    height: 300px;

    .css-yrdy0g-MuiDataGrid-columnHeaderRow {
      .MuiDataGrid-withBorderColor:nth-child(2),
      .MuiDataGrid-withBorderColor:last-child {
        .MuiDataGrid-columnHeaderTitleContainer {
          justify-content: center;
        }
      }
    }
  }
`;

export const OrdersContainer = styled.div`
  .orders-table {
    height: 300px;

    .css-yrdy0g-MuiDataGrid-columnHeaderRow {
      .MuiDataGrid-withBorderColor:nth-child(2),
      .MuiDataGrid-withBorderColor:nth-child(6),
      .MuiDataGrid-withBorderColor:last-child {
        .MuiDataGrid-columnHeaderTitleContainer {
          justify-content: center;
        }
      }
    }
  }
`;
