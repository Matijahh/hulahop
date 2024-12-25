import styled from "styled-components";

const TABLE_OFFSET = "184px";

export const RequestWithdrawalContainer = styled.div`
  .withdrawn-table {
    height: calc(100vh - ${TABLE_OFFSET});
  }

  .withdrawal-value {
    font-size: 22px;
    font-weight: 700;
  }
`;
