import styled from "styled-components";

export const ImageUploadBoxContainer = styled.div`
  .image-upload-box {
    width: 100%;
    height: auto;
    min-height: 150px;
    border: 2px dotted #004e64;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .file-input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 111;
      cursor: pointer;
    }
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .text {
        margin-top: 5px;
        font-size: 12px;
        font-weight: bold;
        color: #004e64;
      }
      svg {
        color: #004e64;
      }
    }

    .image-cover {
      padding: 15px;
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 222;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        max-height: 200px;
      }
      .cancel-icon {
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 333;
        background-color: #004e64;
        width: 25px;
        height: 25px;
        svg {
          cursor: pointer;
          color: #fff;
        }
        &:hover {
          background-color: #fff;
          svg {
            color: #004e64;
          }
        }
      }
    }
  }
`;
