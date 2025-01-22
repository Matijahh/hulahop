import styled from "styled-components";

import Colors from "../../design/Colors";

export const CommonWhiteBackground = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: ${({ padding }) => padding || "30px"};

  @media screen and (max-width: 768px) {
    padding: 20px;
    margin-top: 10px !important;
  }

  .title-wrapper {
    .filters-wrapper {
      .brand-btn {
        padding: 8px 30px !important;
      }
    }
    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: start;

      .filters-wrapper {
        flex-direction: column;
        width: 100%;
      }
    }
  }

  .assoc-title-wrapper {
    .filters-wrapper {
      .brand-btn {
        padding: 8px 30px !important;
      }
    }

    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: start;

      .filters-wrapper {
        flex-direction: column;
        width: 100%;
      }
    }
  }

  .main-title {
    font: bold 24px "Poppins", serif;
    color: ${Colors.blackColor};
  }

  .sub-title {
    font: bold 18px "Poppins", serif;
    color: ${Colors.blackColor};
    margin-bottom: 10px;
  }

  #file-input {
    opacity: 0;
  }

  .error-msg {
    font-size: 0.9rem;
    font-weight: 400;
    color: #d32f2f;
    margin-top: 10px;
  }
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || "space-between"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  gap: 0 10px;
  flex-wrap: ${({ isWrap }) => isWrap && "wrap"};

  border-top: ${({ hasBorderTop }) =>
    hasBorderTop && "1px solid rgba(0,0,0,0.2)"};

  @media screen and (max-width: 768px) {
    gap: 10px;
  }
`;
