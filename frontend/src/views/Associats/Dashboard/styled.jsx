import styled from "styled-components";

export const DashboardContainer = styled.div`
  .top-product-col {
    @media screen and (max-width: 992px) {
      margin-top: 1.5rem;
    }
  }

  .top-todo-list {
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    @media screen and (max-width: 767px) {
      width: 100%;
      display: block;

      .todo-list-item {
        width: 100%;
        border-left: none;
        border-top: 1px solid rgba(0, 0, 0, 0.05);

        &:nth-child(1) {
          border-top: none;
        }
      }
    }

    .todo-list-item {
      padding: 15px 20px;
      border-left: 1px solid rgba(0, 0, 0, 0.05);
      flex: 1;

      &:hover {
        background: rgba(0, 0, 0, 0.03);
        cursor: pointer;
      }

      &:nth-child(1) {
        border-left: none;
      }

      .title {
        font-size: 16px;
        color: #000;
      }

      .value {
        font-size: 24px;
        font-family: "Poppins", serif;
        font-weight: bold;
        color: #004e64;
      }
    }
  }

  .chart-cover {
    width: 100%;
    height: 350px;
    padding-top: 20px;

    .line-chart-legend {
      li {
        text-align: center;
        list-style: none;
        font-weight: bold;
        color: #004e64;
      }
    }

    .custom-tooltip {
      padding: 20px;
      background: rgba(255, 255, 255, 0.85);
      border-radius: 5px;
      border: 1px solid #004e64;

      .bolded {
        font-weight: bold;
        color: #004e64;
      }
    }
  }

  .info-list {
    margin-top: 20px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
    max-height: 372px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    .info-item {
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      padding: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      &:hover {
        background: rgba(0, 0, 0, 0.03);
        cursor: pointer;
      }

      &:nth-child(1) {
        border: none;
      }

      .image-cover {
        img {
          border-radius: 0.5rem;
        }
      }

      .right {
        margin-left: 10px;

        .title {
          font: 16px;
          color: #000;
        }

        .description {
          font: 400 15px "Roboto";
          color: #7e7e7e;
        }
      }
    }
  }

  .anouncement-card {
    .image-cover {
      width: 100%;
      height: 200px;
      margin-top: 20px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0.5rem;
      }
    }

    .desc {
      font: 400 15px "Roboto";
      color: #7e7e7e;
      margin-top: 10px;

      span {
        font: bold 15px "Roboto";
        color: #004e64 !important;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;
