import styled from "styled-components";

import CircularProgress from "@mui/material/CircularProgress";

const containerStyle = `
  display: flex;
  justify-content: center;
  align-items: center;
  zIndex: 1;
`;

const MainContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: auto;
  height: 100%;
  width: 100%;
  ${containerStyle};

  &.spinner-bg {
    background-color: rgba(255, 255, 255, 0.4) !important;
  }

  .MuiCircularProgress-root {
    z-index: 111;
  }
`;

const Container = styled.div`
  height: ${({ height }) => height || "100%"};
  width: 100%;
  ${containerStyle};
`;

export const LoaderContainer = () => {
  return (
    <MainContainer className="spinner-bg">
      <CircularProgress />
    </MainContainer>
  );
};

export const Loader = ({ height, className }) => {
  return (
    <Container height={height} className={className}>
      <CircularProgress />
    </Container>
  );
};
