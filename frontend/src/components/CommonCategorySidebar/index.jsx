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

  const viewAllCategories = () => {
    let url;

    if (isAssociate) {
      url = ROUTE_ASSOCIATE_BRAND_STORE_SHOP.replace(
        ":id",
        slugifyString(_get(params, "id"))
      );
    } else {
      url = ROUTE_MAIN_SHOP;
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
      {_size(categoriesList) > 0 && (
        <div className="container">
          <div className="categories-list-container">
            {loading && (
              <div className="d-flex justify-content-center align-items-center">
                <Loader></Loader>
              </div>
            )}
            {!loading &&
              _size(categoriesList) > 0 &&
              _map(
                categoriesList,
                (item, key) =>
                  key < 5 && (
                    <div
                      className="categories-box"
                      key={key}
                      style={{
                        backgroundImage: `url(${getImageUrlById(
                          _get(item, "image_id", null)
                        )})`,
                      }}
                    >
                      <ButtonComponent
                        text={t(_get(item, "name", null))}
                        variant="contained"
                        className="category-view-btn"
                        onClick={() => toggleCategory(item.id)}
                      />
                    </div>
                  )
              )}
            <div className="view-all-categories">
              <h3>{`${t("Choose between")} ${_size(categoriesList)}+ ${t(
                "product categories of premium quality"
              )}`}</h3>
              <ButtonComponent
                text={"View All"}
                variant="contained"
                className="view-all-btn"
                onClick={() => viewAllCategories()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommonCategorySidebar;
