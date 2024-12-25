import styled from "styled-components";

export const DashboardContainer = styled.div`
  .top-todo-list {
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }

    .todo-list-item {
      padding: 15px 20px;
      border-left: 1px solid rgba(0, 0, 0, 0.05);
      flex: 1;

      @media screen and (max-width: 768px) {
        width: 100%;
      }

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
        color: rgb(241, 103, 109);
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
        color: #f1676d;
      }
    }

    .custom-tooltip {
      padding: 20px;
      background: rgba(255, 255, 255, 0.85);
      border-radius: 5px;
      border: 1px solid #f1676d;

      .bolded {
        font-weight: bold;
        color: #f1676d;
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
          font: 400 15px "Nunito Sans";
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
      font: 400 15px "Nunito Sans";
      color: #7e7e7e;
      margin-top: 10px;

      span {
        font: bold 15px "Nunito Sans";
        color: rgb(241, 103, 109) !important;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;
