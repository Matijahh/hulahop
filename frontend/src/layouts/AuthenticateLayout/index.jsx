import { PureComponent } from "react";
import { AuthenticateContainer } from "./styled";

class AuthenticateLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return <AuthenticateContainer>{children}</AuthenticateContainer>;
  }
}

export default AuthenticateLayout;
