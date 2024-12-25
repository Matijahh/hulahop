import styled from "@emotion/styled";
import Colors from "../../../../design/Colors";

export const EditProductContainer = styled.div`
  .left-col {
    padding: 15px 30px;
  }

  .main-image {
    width: 100%;
    height: 100%;
    object-fit: contain;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export const ProductSettingSidebarContainer = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.05);
  min-height: calc(100vh - 60px);
  position: relative;

  .title {
    font: 500 24px "Nunito Sans";
    color: ${Colors.blackColor};
    padding: 15px;
  }

  .tab-list {
    padding: 15px;
    gap: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .info-form {
    padding: 15px;
    height: calc(100vh - 200px);
    overflow: scroll;
    padding-bottom: 80px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  label {
    margin-bottom: 9px;
  }

  .fix-footer {
    display: flex;
    justify-content: space-between;
    align-content: center;
    gap: 15px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    padding: 15px;
    background-color: #fff;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }

  .price-wrapper {
    @media screen and (max-width: 768px) {
      justify-content: space-between;
      display: flex;
      flex-direction: column;
    }
  }

  .color-row {
    gap: 15px 0px;

    .color-col {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const ColorBox = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid transparent;

  &.active {
    border: 3px solid rgba(0, 0, 0, 0.3);
    padding: 0px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    background-color: ${({ color }) => color};
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  }

  .error-msg {
    font-size: 0.9rem;
    font-weight: 400;
    color: #d32f2f;
    margin-top: 20px;
  }
`;

export const ImageContainer = styled.div`
  position: relative;

  .file-input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 45px;
    z-index: 999;
    cursor: pointer;
  }

  .image-action-buttons {
    position: absolute;
    top: 20px;

    @media screen and (max-width: 768px) {
      z-index: 2;
    }
  }

  .button-list {
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 6px;

    .list-item {
      padding: 10px;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
      cursor: pointer;

      &:nth-child(1) {
        border-top: none !important;
      }

      &:hover {
        cursor: pointer;
        background-color: rgb(241, 103, 109);
        border-radius: 6px;

        svg {
          fill: #fff;
        }
      }
    }
  }

  .btn-container {
    position: absolute;
    bottom: 45px;
    padding-top: 8px;
    width: 53%;
  }

  .container-canvas {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;

    @media screen and (max-width: 768px) {
      width: 100%;

      div {
        width: 100%;

        .konvajs-content {
          width: 100% !important;

          canvas {
            width: 100% !important;
          }
        }
      }
    }
  }
`;

export const ColorBarList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  gap: 0 20px;

  .color-item {
    width: 22px;
    height: 22px;
    cursor: pointer;
    background-color: greenyellow;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
    padding: 3px;
    border: 2px solid transparent;
  }

  .active {
    border: 2px solid #000 !important;
  }
`;
