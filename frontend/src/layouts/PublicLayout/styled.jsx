import styled from "styled-components";

export const PublicContainer = styled.div`
  background: rgba(241, 103, 109, 0.1);
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
