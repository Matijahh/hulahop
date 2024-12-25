import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { commonGetQuery } from "../../../../utils/axiosInstance";
import _size from "lodash/size";

import { ProductsContainer } from "./styled";
import { Loader } from "../../../../components/Loader";

import Product from "../../../../components/Product/Product";
import { ACCESS_TOKEN } from "../../../../utils/constant";

const Products = ({ storeData }) => {
  const [productsList, setProductsList] = useState([]);
  const [wishListData, setWishListData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const { t } = useTranslation();

  const getProductsList = async () => {
    setLoading(true);

    const response = await commonGetQuery(
      `/associate_products?user_id=${storeData?.user_id}`
    );

    setLoading(false);

    if (response) {
      const { data } = response.data;
      setProductsList(data.filter((p) => p.associate_highlighted));
    }
  };

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

  const checkIsInWishList = (id) => {
    if (wishListData.length > 0) {
      return wishListData.find((item) => item.associate_product_id == id);
    }
  };

  useEffect(() => {
    getProductsList();

    if (ACCESS_TOKEN) {
      getWishListData();
    }
  }, []);

  return (
    <ProductsContainer className=" product-list-section">
      <div className="section-title-desc">
        <h2>{t("Our Best Selling Products")}</h2>
      </div>
      <div className="container">
        <div className="products-list-container">
          {loading && (
            <div className="d-flex justify-content-center align-items-center">
              <Loader></Loader>
            </div>
          )}

          <div className="row gy-5">
            {_size(productsList) > 0 ? (
              productsList.map((item, i) => (
                <div className="col-sm-6 col-xl-4 col-xxl-3" key={i}>
                  <Product
                    mainLoading={loading}
                    productData={item}
                    isAssociateProduct={true}
                    isInWishList={checkIsInWishList(item.id)}
                    getWishListData={getWishListData}
                  />
                </div>
              ))
            ) : (
              <h5 className="d-flex align-items-center justify-content-center w-100 h-100">
                {t("No Product Found!")}
              </h5>
            )}
          </div>
        </div>
      </div>
    </ProductsContainer>
  );
};

export default Products;
