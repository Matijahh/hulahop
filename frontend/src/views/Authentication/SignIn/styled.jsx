import styled from "styled-components";

export const SignInContainer = styled.div`
  padding: 50px 30px;
  border-radius: 30px;
  background-color: #fff;
  width: ${({ maxWidth }) => maxWidth || "550px"};

  @media screen and (max-width: 550px) {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .logo-container {
    .cover {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 150px;
      }
    }
  }

  .row {
    margin-top: 20px;

    label {
      font-size: 12px;
      color: #b3b3b3;
      margin-bottom: 0px;
      margin-left: 15px;
    }
  }

  .title-container {
    margin-top: 40px;

    .title {
      font-family: "Poppins", serif;
      color: #f1676d;
      text-align: center;
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 30px;
    }

    .description {
      font-size: 16px;
      font-weight: 500;
      color: #7e7e7e;
    }
  }

  .remember-me {
    .text {
      color: #b3b3b3;
    }
  }

  .css-1sdkjlz-MuiButtonBase-root-MuiCheckbox-root {
    padding: 0px !important;
  }

  .buttons {
    margin: 20px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: end;

    .sign-in {
      width: 200px;
      padding: 10px 30px !important;
    }
  }

  .info-text {
    margin-top: 10px;

    span {
      color: #b3b3b3;
      margin-right: 10px;
    }

    a {
      color: rgb(241, 103, 109);
      font-weight: 600;
      font-size: 16px;
      text-decoration: none;
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
