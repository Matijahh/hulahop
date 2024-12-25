import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { get, map, size } from "lodash";
import { getImageUrlById, slugifyString } from "../../../utils/commonFunctions";
import { ROUTE_ASSOCIATE_BRAND_STORE } from "../../../routes/routes";

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

      <div className="associates-list-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head m-0">{t("Our Associates")}</h3>
              </div>
            </div>
          </div>

          <div className="row g-5">
            {size(associatesList) > 0 &&
              map(associatesList, (item, index) => {
                return (
                  <>
                    <div className="col-12 col-md-6 col-lg-4" key={index}>
                      <div
                        className="assosiate-box"
                        role="button"
                        onClick={() => {
                          const name = get(
                            item,
                            "store_layout_details.0.name",
                            null
                          );
                          const id = get(
                            item,
                            "store_layout_details.0.user_id",
                            null
                          );

                          window.location.replace(
                            ROUTE_ASSOCIATE_BRAND_STORE.replace(
                              ":id",
                              slugifyString(name)
                            )
                          );
                        }}
                      >
                        <div className="assosiate-img-box">
                          <img
                            src={getImageUrlById(
                              size(get(item, "store_layout_details", [])) > 0
                                ? get(
                                    item,
                                    "store_layout_details.0.logo_image",
                                    ""
                                  )
                                : get(item, "image_id", "")
                                ? get(item, "image_id", "")
                                : "ae7a4e77-e53c-488f-95c4-4af8390822db"
                            )}
                            alt=""
                          />
                        </div>
                        <div className="assosiate-description">
                          <h5>
                            {size(get(item, "store_layout_details", [])) > 0
                              ? get(item, "store_layout_details.0.name", "")
                              : get(item, "first_name", "") +
                                " " +
                                get(item, "last_name", "")}
                          </h5>
                          <p>
                            {size(get(item, "store_layout_details", [])) > 0
                              ? get(
                                  item,
                                  "store_layout_details.0.description",
                                  ""
                                )
                              : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Associates;
