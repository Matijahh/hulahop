import styled from "styled-components";

export const ImageLibraryContainer = styled.div`
  .modal-title {
    font-size: 24px;
    color: #000;
  }

  .modal-sub-title {
    font-size: 18px;
    color: #000;
  }

  .header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding-bottom: 10px;

    @media screen and (max-width: 768px) {
      display: flex;
      flex-direction: column;
    }
  }

  .image-cover {
    padding: 10px;
    width: 100%;
    height: max-content;
    background: rgba(0, 0, 0, 0.01);
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 6px;
    }
  }

  .images-list {
    min-height: 300px;
    max-height: 500px;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .image-box {
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 6px;

    .image-cover {
      height: 300px;
    }

    .input-check {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: #fff;
    }

    .box-footer {
      padding: 10px;
      border-top: 1px solid rgba(0, 0, 0, 0.05);

      .brand-btn {
        padding: 5px 30px !important;
      }

      .image-title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 18px;
        font-weight: 600;
      }

      .content {
        font-size: 16px;
        font-weight: 400;
        color: #7e7e7e;
      }
    }
  }
`;
