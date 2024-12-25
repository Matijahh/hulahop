import { PureComponent } from "react";
import styled from "styled-components";

import Colors from "../design/Colors";
import Fonts from "../design/Fonts";
import { LoaderContainer } from "../components/Loader";

export const Container = styled.div`
  .card {
    border-color: #d8121254;
    border-radius: 0.5rem;
  }

  .card-header {
    background-color: #ffe4e4;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  p {
    color: ${Colors.errorColor};
    font-size: ${Fonts.fs_18};
    font-weight: ${Fonts.fw_bold};
    display: flex;
    align-items: center;
    margin-bottom: 0px;
  }

  .button-div {
    width: fit-content !important;
    padding: 10px !important;
    font-size: ${Fonts.fs_16};
    background: ${Colors.errorColor} !important;
    border-color: ${Colors.errorColor} !important;
    margin-left: 20px !important;
  }

  .error-details {
    color: ${Colors.errorColor};
    font-size: ${Fonts.fs_14};
    font-weight: ${Fonts.fw_500};
    white-space: pre-wrap;

    summary {
      font-size: ${Fonts.fs_15};
      font-weight: ${Fonts.fw_600};
    }
  }
`;

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, hasError: false };
  }

  static getDerivedStateFromError(error) {
    // const ROLE_ID = localStorage.getItem('role_id');
    // window.location.href = ROLE_ID
    //   ? ROLE_ID === '1'
    //     ? ROUTE_ASSOCIATE_MAIN
    //     : ROUTE_SIGN_IN
    //   : ROUTE_SIGN_IN;
    window.location.reload(true);
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    window.location.reload(true);
  };

  render() {
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
      return (
        <Container className="container">
          <LoaderContainer />
          {/* <div className="card my-5">
            <div className="card-header">
              <p>
                Something went wrong...
                <ButtonComponent
                  text="Try again"
                  variant="outlined"
                  onClick={this.handleReload}
                />
              </p>
            </div>
            <div className="card-body">
              <details className="error-details">
                <summary> {error && error.toString()}</summary>
                {errorInfo && errorInfo.componentStack.toString()}
              </details>
            </div>
          </div> */}
        </Container>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
