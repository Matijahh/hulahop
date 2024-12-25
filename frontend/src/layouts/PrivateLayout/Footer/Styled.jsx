import styled from "styled-components";

export const FooterWrapperStyled = styled.div`
  background: #eef1f6;

  footer {
    padding: 30px;
    background: #fff;
    box-shadow: 0px 0px 6px -3px #afaccb;
    border-radius: 10px;
  }

  .footer-section-header {
    margin-bottom: 10px;
    height: 40px;
    padding: 0 10px;

    .site-logo {
      img {
        width: 150px;
        max-width: 100%;
        height: auto;
      }
    }

    .footer-header-text {
      color: #f1676d;
      padding-bottom: 8px;
      border-bottom: 1px solid #f1676d;
      font-size: 18px;
      font-weight: 600;
      line-height: 22px;
    }
  }

  .site-description {
    padding: 10px;

    p {
      color: #616173;
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
    }
  }

  .contact-us-section {
    padding: 10px;

    .contact-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;

      .icon-box {
        width: 35px;

        svg {
          width: 25px;
          height: 25px;
          color: #f1676d;
        }
      }

      .contact-detail {
        width: calc(100% - 35px);
        font-size: 14px;
        font-weight: 500;
        line-height: 25px;
        align-self: center;

        &.location-detail {
          line-height: 22px;
          align-self: start;
        }
      }
    }
  }

  .useful-links {
    padding: 10px;

    .links-item {
      margin-bottom: 8px;

      a {
        color: #616173;
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        text-decoration: none;
        cursor: pointer;

        &:hover {
          color: #f1676d;
        }
      }
    }
  }

  .low-description-box {
    padding: 10px;
    text-align: end;

    p,
    a {
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
      color: #616173;
      text-align: start;

      &.know-more-text {
        margin-top: 10px;
        color: #f1676d;
        font-weight: 600;
        text-align: end;
        display: inline-block;
        text-decoration: none;
        cursor: pointer;

        &:hover {
          color: #000;
        }
      }
    }
  }

  .footer-copright-section {
    .footer-copright-wrapper {
      margin: 0 40px;
      .footer-copright-box {
        padding: 20px 20px;
        text-align: center;
        border-radius: 5px 5px 0 0;
        background: #f1676d;

        p {
          font-size: 16px;
          font-weight: 600;
          line-height: 22px;
          color: #fff;
        }
      }
    }
  }
`;
