import styled from "styled-components";

export const AuthenticateContainer = styled.div`
  background: url("src/assets/images/authenticate-bg.png");
  background-size: cover;
  min-height: 100vh;
  overflow: scroll;
  padding: 40px 0;

  @media screen and (max-width: 550px) {
    padding: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  display: flex;
  justify-content: center;
  align-items: center;
`;
