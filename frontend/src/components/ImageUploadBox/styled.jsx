import styled from "styled-components";

export const ImageUploadBoxContainer = styled.div`
  .image-upload-box {
    width: 100%;
    height: auto;
    min-height: 150px;
    border: 2px dotted #f1676d;
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
        color: rgb(241, 103, 109);
      }
      svg {
        color: rgb(241, 103, 109);
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
        background-color: #f1676d;
        width: 25px;
        height: 25px;
        svg {
          cursor: pointer;
          color: #fff;
        }
        &:hover {
          background-color: #fff;
          svg {
            color: #f1676d;
          }
        }
      }
    }
  }
`;
