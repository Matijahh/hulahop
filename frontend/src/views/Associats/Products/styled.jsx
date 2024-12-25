import styled from "styled-components";

export const ProductsListContainer = styled.div`
  margin-top: 30px;
  padding: 0 2px 10px 2px;
  max-height: calc(100vh - 190px);
  overflow-y: auto;
  overflow-x: visible;

  &::-webkit-scrollbar {
    display: none;
  }

  .row {
    gap: 24px 0;
  }
`;

export const ProductCardBox = styled.div`
  border-radius: 6px;
  z-index: 1;
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
  }

  .product-data {
    padding: 10px;

    .product-title {
      font: 600 18px Nunito Sans;
      margin: 5px 0;
    }

    .product-caregory {
      font: 400 16px Nunito Sans;
      color: #7e7e7e;
    }

    .product-price {
      font: 500 16px Nunito Sans;
      margin-top: 5px;
    }
  }

  .overlay {
    position: absolute;
    top: 10px;
    right: -100%;
    transition: 0.2s ease-in-out;
    transform-origin: right;

    .overlay-icon {
      background-color: #fff;
      height: 40px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      margin-bottom: 10px;
      cursor: pointer;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.05) 0px 2px 2px 0px, rgba(0, 0, 0, 0.05) 0px 1px 5px 0px;
    }

    @media screen and (max-width: 768px) {
      right: 10px;
    }
  }

  &:hover {
    .overlay {
      right: 10px;
    }
  }
`;
