import styled from "@emotion/styled";

export const CreateProductContainer = styled.div`
  .row {
    gap: 24px 0;
  }
`;

export const ProductCardBox = styled.div`
  border-radius: 6px;
  z-index: 1;
  cursor: pointer;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.05) 0px 2px 2px 0px, rgba(0, 0, 0, 0.05) 0px 1px 5px 0px;

  .image-cover {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 6px 0 0px 6px;
    margin-bottom: 10px;
    position: relative;
    background: rgba(241, 103, 109, 0.1) !important;

    img {
      border-radius: 6px 0 0px 0;
      width: 100%;
      height: 100%;
    }
  }

  .product-data {
    padding: 10px;

    .product-title {
      font: 600 18px Nunito Sans;
      margin-bottom: 5px;
    }

    .product-caregory {
      font: 400 16px Nunito Sans;
      color: #7e7e7e;
    }
  }
`;
