import styled from "styled-components";

export const OrderPreviewPageContainer = styled.div`
  table {
    td {
      border: 1px solid rgba(0, 0, 0, 0.05);
      padding: 10px;
    }

    .title {
      font-size: 18px;
      font-weight: 700;
    }

    .body-cell {
      font-size: 16px;
      font-weight: 500;
    }

    .product-detail {
      text-align: left;
    }

    .product-image {
      max-width: 150px;
      max-height: 150px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;
