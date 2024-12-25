import styled from "styled-components";

export const ResetPasswordContainer = styled.div`
  padding: 24px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-color: #fff;
  width: ${({ maxWidth }) => maxWidth || "550px"};

  @media screen and (max-width: 550px) {
    width: 100%;
    height: 100%;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .logo-container {
    .cover {
      img {
        width: 250px;
      }
    }
  }

  .row {
    margin-top: 20px;
    label {
      margin-bottom: 10px;
    }
  }

  .title-container {
    margin-top: 40px;

    .title {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 7px;
    }

    .description {
      font-size: 16px;
      font-weight: 500;
      color: #7e7e7e;
    }
  }

  .css-1sdkjlz-MuiButtonBase-root-MuiCheckbox-root {
    padding: 0px !important;
  }

  .buttons {
    margin: 20px 0;
  }

  .info-text {
    span {
      color: #7e7e7e;
      margin-right: 10px;
    }

    a {
      color: rgb(241, 103, 109);
      font-weight: 600;
      font-size: 16px;
      text-decoration: underline;
    }
  }

  .forgot-password-text {
    color: rgb(241, 103, 109);
    font-weight: 600;
    font-size: 16px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
