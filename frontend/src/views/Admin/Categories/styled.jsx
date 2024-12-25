import styled from "styled-components";

export const Container = styled.div`
  .image-cover {
    width: 50px;
    height: 50px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .MuiTableCell-root {
    vertical-align: inherit;
  }

  .border-table {
    border: 1px solid rgba(224, 224, 224, 1);
    border-radius: 4px;

    .MuiTableHead-root {
      .MuiTableRow-head {
        .MuiTableCell-head:nth-child(4),
        .MuiTableCell-head:last-child {
          text-align: center;
        }
      }

      @media screen and (max-width: 768px) {
        .MuiTableRow-head {
          .MuiTableCell-head:nth-child(2) {
            display: none;
          }
        }
      }
    }

    @media screen and (max-width: 768px) {
      .MuiTableBody-root {
        .MuiTableRow-root {
          .MuiTableCell-root:nth-child(2) {
            display: none;
          }
        }
      }
    }

    .align-items-center {
      text-align: center;
    }
  }

  .sub-row-padding {
    padding: 0;
  }

  .delete-icon {
    @media screen and (max-width: 768px) {
      margin: 0 !important;
    }
  }
`;
