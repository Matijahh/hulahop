import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { commonGetQuery } from "../../utils/axiosInstance";
import { getImageUrlById, slugifyString } from "../../utils/commonFunctions";
import _size from "lodash/size";
import _get from "lodash/get";
import get from "lodash/get";
import _map from "lodash/map";
import {
  ROUTE_ASSOCIATE_BRAND_STORE_SHOP,
  ROUTE_MAIN_SHOP,
} from "../../routes/routes";

import ButtonComponent from "../ButtonComponent";
import SliderComponent from "../SliderComponent/SliderComponent";

import { Loader } from "../Loader";

const CommonCategorySidebar = ({ renderHeader, isAssociate, storeData }) => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const navigation = useNavigate();
  const { t } = useTranslation();

  const toggleCategory = (id, subId) => {
    let url;

    if (isAssociate) {
      url =
        ROUTE_ASSOCIATE_BRAND_STORE_SHOP.replace(
          ":id",
          slugifyString(_get(params, "id"))
        ) + `?categoryId=${id || 0}&sub_categoryId=${subId || 0}`;
    } else {
      url =
        ROUTE_MAIN_SHOP + `?categoryId=${id || 0}&sub_categoryId=${subId || 0}`;
    }

    navigation(url);
  };

  const getProductsList = async () => {
    setLoading(true);

    const response =
      isAssociate && storeData?.user_id
        ? await commonGetQuery(`/categories/?user_id=${storeData?.user_id}`)
        : await commonGetQuery("/categories");

    setLoading(false);

    if (response) {
      const { data } = response.data;
      setCategoriesList(data);
    }
  };

  useEffect(() => {
    getProductsList();
  }, []);

  return (
    <div className="categories-section">
      <div className="container">
        <div className="row">
          {renderHeader ? (
            <>{renderHeader()}</>
          ) : (
            <div className="col-12">
              <div className="section-title-desc">
                <h2>{t("Product Categories")}</h2>
              </div>
            </div>
          )}
          <div className="col-12">
            {loading && (
              <div className="d-flex justify-content-center align-items-center">
                <Loader></Loader>
              </div>
            )}
            {!loading && _size(categoriesList) > 0 ? (
              <>
                <div className="categories-slider">
                  <SliderComponent
                    dots={false}
                    arrows={true}
                    slidesToShow={
                      _size(categoriesList) > 4 ? 4 : _size(categoriesList)
                    }
                  >
                    {_map(categoriesList, (item, key) => (
                      <div className="categories-slide" key={key}>
                        <div
                          className="categories-box"
                          style={{
                            backgroundImage: `url(${getImageUrlById(
                              _get(item, "image_id", null)
                            )})`,
                          }}
                        >
                          <div className="category-overlay">
                            <p className="category-name">
                              {t(_get(item, "name", null))}
                            </p>
                            <ButtonComponent
                              text={t("View All")}
                              variant=" "
                              className="category-view-btn"
                              onClick={() => toggleCategory(item.id)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </SliderComponent>
                </div>
              </>
            ) : (
              <center className="py-5">
                <b>{t("No Product Found!")}</b>
              </center>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonCategorySidebar;
