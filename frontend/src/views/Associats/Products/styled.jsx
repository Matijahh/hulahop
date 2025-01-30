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
  border-radius: 20px;
  z-index: 1;
  overflow: hidden;
  border: 3px solid #f2f0ef;
  padding: 10px;

  .image-cover {
    width: 100%;
    height: max-content;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 10px;
    position: relative;

    img {
      border-radius: 10px;
    }
  }

  .product-data {
    padding: 10px;

    .product-title {
      font: bold 18px "Poppins", serif;
      margin: 5px 0;
    }

    .product-caregory {
      font: 300 16px "Roboto", serif;
      color: #7e7e7e;
    }

    .product-price {
      font: 300 16px "Roboto", serif;
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
