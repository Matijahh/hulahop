import { useEffect } from "react";
import { LoaderContainer } from "../../components/Loader";
import {
  getUserToken,
  getUserType,
  handlePublicRedirection,
  handleRedirection,
} from "../../utils/commonFunctions";

const NotFound = () => {
  useEffect(() => {
    if (getUserType() || getUserToken()) {
      handleRedirection(getUserType());
    } else {
      handlePublicRedirection(getUserType());
    }
  }, []);
  return <LoaderContainer />;
};

export default NotFound;
