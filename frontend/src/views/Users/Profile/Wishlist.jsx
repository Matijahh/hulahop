import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { slugify } from "../../../utils/commonFunctions";
import { get, map, size } from "lodash";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { ROUTE_MAIN_SHOP_PRODUCT } from "../../../routes/routes";

import { WishListHeader } from "./mock";
import { FlexBox } from "../../../components/Sections";
import { Helmet } from "react-helmet";
import { LoaderContainer } from "../../../components/Loader";
import { WishlistContainer } from "./styled";

import ProfileComponent from ".";
import Tables from "../../../components/SuperAdmin/Tables";

const Wishlist = () => {
  const [loading, setLoading] = useState(false);
  const [wishListData, setWishListData] = useState([]);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const getWishListData = async () => {
    setLoading(true);

    const response = await commonGetQuery("/wishlist");

    if (response) {
      const { data } = response.data;

      setWishListData(data);
      setLoading(false);
    }

    setLoading(false);
  };

  const setTableRenderData = (data) => {
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      id: get(item, "id", ""),
      associate_product_name: get(item, "associate_product", "").name,
      associate_product_id: get(item, "associate_product_id", ""),
      price: `${get(item, "associate_product.price", "")} RSD`,
      image: get(item, "associate_product.image_id", ""),
      ViewProduct,
      handleDelete,
    }));

    return renderData;
  };

  const ViewProduct = (name, id) => {
    let url = ROUTE_MAIN_SHOP_PRODUCT.replace(":id", slugify(name, id));
    navigate(url);
  };

  const handleDelete = async (id) => {
    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/wishlist/${id}`,
      null,
      "DELETE"
    );

    if (response) {
      getWishListData();
    }

    setLoading(false);
  };

  useEffect(() => {
    getWishListData();
  }, []);

  return (
    <ProfileComponent>
      <Helmet>
        <title>{t("Wishlist - HulaHop")}</title>
      </Helmet>

      {loading && <LoaderContainer />}

      <div className="order-box">
        <FlexBox className="mb-4">
          <div className="hero-section">
            <h3 className="banner-head">{t("Wishlist")}</h3>
          </div>
        </FlexBox>

        <WishlistContainer>
          <Tables
            className="wishlist-table"
            body={
              size(wishListData) > 0 ? setTableRenderData(wishListData) : []
            }
            header={WishListHeader.map((item) => ({
              ...item,
              headerName: t(item.headerName),
            }))}
          />
        </WishlistContainer>
      </div>
    </ProfileComponent>
  );
};

export default Wishlist;
