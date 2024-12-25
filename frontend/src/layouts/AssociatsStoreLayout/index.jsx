import { useEffect, useState } from "react";
import { commonGetQuery } from "../../utils/axiosInstance";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import * as Action from "../../redux/actions";

import { AssociatsStoreLayoutContainer } from "./styled";
import { LoaderContainer } from "../../components/Loader";

import Header from "./Header";
import Footer from "../PrivateLayout/Footer";

const AssociatsStoreLayout = ({
  children,
  saveAssociateStoreData,
  storeData,
}) => {
  const [loading, setLoading] = useState(false);

  const { id, sId } = useParams();

  const getStoreData = async () => {
    setLoading(true);
    const response = await commonGetQuery(
      `/store_layout_details/slug/${sId || id}`
    );
    setLoading(false);
    if (response) {
      const { data } = response.data;
      saveAssociateStoreData(data);
    }
  };

  useEffect(() => {
    if (!storeData) {
      getStoreData();
    }
  }, []);

  return (
    <AssociatsStoreLayoutContainer>
      {loading ? (
        <LoaderContainer />
      ) : (
        <>
          <Header />
          <div className="main-container page-wrapper">{children}</div>
          <Footer />
        </>
      )}
    </AssociatsStoreLayoutContainer>
  );
};

const mapStateToProps = (state) => ({
  storeData: state.user.storeData,
});

const mapDispatchToProps = {
  saveAssociateStoreData: (data) => Action.saveAssociateStoreData(data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssociatsStoreLayout);
