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
      `/associate_products?status=true&user_id=${storeData?.user_id}`
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
    <ProductsContainer>
      {_size(productsList) > 0 && (
        <div className="product-list-section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="hero-section">
                  <h3 className="banner-head m-0">
                    {t("Our Best Selling Products")}
                  </h3>
                </div>
              </div>
              <div className="col-12">
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <Loader />
                  </div>
                ) : (
                  <div className="product-listing">
                    <div className="products-list-container">
                      {_size(productsList) > 0 &&
                        productsList.map((item, key) => (
                          <div className="product-container" key={key}>
                            <Product
                              isAssociateProduct={true}
                              productData={item}
                              isInWishList={checkIsInWishList(item.id)}
                              getWishListData={getWishListData}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </ProductsContainer>
  );
};

export default Products;
