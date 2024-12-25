import { PureComponent } from "react";
import { PublicContainer } from "./styled";

class PublicLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return <PublicContainer>{children}</PublicContainer>;
  }
}

export default PublicLayout;
