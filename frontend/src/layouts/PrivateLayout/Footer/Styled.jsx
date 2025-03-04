import styled from "styled-components";

export const FooterWrapperStyled = styled.div`
  background: #f2f0ef;
  padding: 50px 0;

  footer {
    padding: 30px;
    background: #004e64;
    border-radius: 30px;
    z-index: 1;
    position: relative;
  }

  .background-logo {
    position: absolute;
    top: 30px;
    right: 100px;
    opacity: 0.2;
    width: 300px;
    z-index: -1;

    @media screen and (max-width: 768px) {
      right: 0;
      bottom: 0;
      top: auto;
    }
  }

  .z-index-greater {
    z-index: 2;
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
      color: white;
      padding-bottom: 8px;
      border-bottom: 1px solid white;
      border-width: 3px;
      font-size: 18px;
      font-family: "Poppins", serif;
      font-style: normal;
      font-weight: bold;
      line-height: 22px;
    }
  }

  .site-description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    p {
      color: white;
      font-family: "Poppins", serif;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 25px;
    }

    .copyright {
      font-weight: 300;
      color: white;
      font-size: 14px;
    }
  }

  .contact-us-section {
    .contact-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 40px;
      position: relative;

      .icon-box {
        svg {
          width: 45px;
          height: 45px;
          position: absolute;
          top: -5px;
          left: -5px;
          color: rgba(255, 255, 255, 0.3);
        }
      }

      .contact-detail {
        width: calc(100% - 35px);
        font-size: 14px;
        font-weight: 300;
        line-height: 25px;
        align-self: center;
        padding: 0 10px;
        color: white;

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
        color: white;
        font-size: 14px;
        font-weight: 300;
        line-height: 20px;
        text-decoration: none;
        cursor: pointer;
      }
    }
  }

  .low-description-box {
    padding: 10px;

    .know-more-btn {
      margin-top: 20px;
      border-color: white !important;
      padding: 5px 30px !important;
      color: white !important;
    }

    p,
    a {
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      color: white;
      text-align: start;

      &.know-more-text {
        margin-top: 10px;
        color: white;
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
        background: #004e64;

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
