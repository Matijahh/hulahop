import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { get, map, size } from "lodash";
import { getImageUrlById, slugifyString } from "../../../utils/commonFunctions";
import { ROUTE_ASSOCIATE_BRAND_STORE } from "../../../routes/routes";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { Helmet } from "react-helmet";
import { LoaderContainer } from "../../../components/Loader";

const Associates = () => {
  const [loading, setLoading] = useState(false);
  const [associatesList, setAssociatesList] = useState([]);
  const { t } = useTranslation();

  const getAssociatesList = async () => {
    setLoading(true);

    const response = await commonGetQuery("/associates");

    if (response) {
      const { data } = response.data;
      const filteredData = data.filter(
        (item) => size(item.store_layout_details) > 0
      );
      setAssociatesList(filteredData);
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    getAssociatesList();
  }, []);

  return (
    <div className="page-wrapper associates-page">
      <Helmet>
        <title>{t("Associates List - HulaHop")}</title>
      </Helmet>

      {loading && <LoaderContainer />}

      <div className="associates-listing-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head">{t("Trusted Associates")}</h3>
              </div>
            </div>
          </div>
          <div className="associates-box-list-container associates-page-box-list-container">
            {size(associatesList) > 0 &&
              map(associatesList, (item, index) => {
                return (
                  <div className="associates-box" key={index}>
                    <img
                      src={getImageUrlById(
                        size(get(item, "store_layout_details", [])) > 0
                          ? get(item, "store_layout_details.0.logo_image", "")
                          : get(item, "image_id", "")
                          ? get(item, "image_id", "")
                          : undefined
                      )}
                      alt=""
                    />
                    <div className="associates-info">
                      <div
                        className="link-btn"
                        onClick={() =>
                          window.open(
                            ROUTE_ASSOCIATE_BRAND_STORE.replace(
                              ":id",
                              slugifyString(
                                get(item, "store_layout_details.0.name", null)
                              )
                            ),
                            "_blank"
                          )
                        }
                      >
                        <OpenInNewIcon />
                      </div>
                      <h3 className="title">
                        {get(item, "store_layout_details.0.name", null)}
                      </h3>
                      <p>
                        {get(item, "store_layout_details.0.description", null)}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Associates;
