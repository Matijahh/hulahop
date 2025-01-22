import styled from "@emotion/styled";

export const CreateProductContainer = styled.div`
  .row {
    gap: 24px 0;
  }
`;

export const ProductCardBox = styled.div`
  border-radius: 20px;
  z-index: 1;
  cursor: pointer;
  overflow: hidden;
  border: 3px solid #f2f0ef;
  padding: 10px;

  .image-cover {
    width: 100%;
    height: 250px;
    object-fit: cover;
    margin-bottom: 10px;
    position: relative;
    background: rgba(241, 103, 109, 0.1) !important;
    border-radius: 10px;

    img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
    }
  }

  .product-data {
    padding: 10px;

    .product-title {
      font: bold 18px "Poppins", serif;
      margin-bottom: 5px;
    }

    .product-caregory {
      font: 300 16px "Roboto", serif;
      color: #7e7e7e;
    }
  }
`;
