import styled from "styled-components";

export const SuperAdminLayoutContainer = styled.div`
  height: 100%;
  width: 100%;

  .main-container {
    margin-left: 250px;
    padding: 30px;
    background-color: rgba(241, 103, 109, 0.05);
    min-height: 100vh;

    @media screen and (max-width: 1080px) {
      margin-left: 0px;
      padding: 70px 10px 10px 10px;
    }
  }

  a {
    text-decoration: none !important;
    color: inherit !important;
  }
`;
