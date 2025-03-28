import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { get, size } from "lodash";
import {
  getImageUrlById,
  slugify,
  slugifyString,
} from "../../utils/commonFunctions";
import { commonAddUpdateQuery } from "../../utils/axiosInstance";
import {
  ROUTE_ASSOCIATE_BRAND_STORE,
  ROUTE_ASSOCIATE_BRAND_STORE_SHOP,
  ROUTE_ASSOCIATE_BRAND_STORE_SHOP_SINGLE_VIEW,
  ROUTE_MAIN_SHOP,
  ROUTE_MAIN_SHOP_PRODUCT,
} from "../../routes/routes";
import { ACCESS_TOKEN } from "../../utils/constant";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ButtonComponent from "../ButtonComponent";
import PreviewJsonImage from "../PreviewJsonImage";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { ErrorTaster, SuccessTaster } from "../Toast";
import { Loader } from "../Loader";

const Product = ({
  productData,
  isAssociateProduct,
  isInWishList,
  getWishListData,
  mainLoading,
}) => {
  const [loading, setLoading] = useState(false);
  const [productUrl, setProductUrl] = useState("");
  const [categoryUrl, setCategoryUrl] = useState("");
  const [subCategoryUrl, setSubCategoryUrl] = useState("");
  const [prieviewProduct, setPrieviewProduct] = useState({});
  const [activeImage, setActiveImage] = useState(null);
  const [back, setBack] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const addWishList = async (id) => {
    if (!ACCESS_TOKEN) {
      ErrorTaster(t("Please login first."));
      return;
    }

    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/wishlist`,
      { associate_product_id: id },
      "POST"
    );

    if (response) {
      getWishListData();
      SuccessTaster(t("Product added to wishList sucessfully."));
    }

    setLoading(false);
  };

  const removeWishList = async (id) => {
    if (!ACCESS_TOKEN) {
      ErrorTaster(t("Please login first."));
      return;
    }

    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/wishlist/${id}`,
      {},
      "DELETE"
    );

    if (response) {
      getWishListData();
      SuccessTaster(t("Product removed from wishList sucessfully."));
    }

    setLoading(false);
  };

  const mouseOverProduct = () => {
    if (
      get(productData.product, "image_id_back") &&
      get(productData, "image_json_back")
    ) {
      setActiveImage(get(productData.product, "image_id_back"));
      setBack(true);
    }
  };

  const mouseOutProduct = () => {
    setActiveImage(get(prieviewProduct, "image_id"));
    setBack(false);
  };

  const productName = get(productData, "name");
  const productId = get(productData, "id");

  useEffect(() => {
    let ProductUrl = !isAssociateProduct
      ? ROUTE_MAIN_SHOP_PRODUCT.replace(":id", slugify(productName, productId))
      : ROUTE_ASSOCIATE_BRAND_STORE_SHOP_SINGLE_VIEW.replace(
          ":sId",
          slugifyString(get(params, "id", null))
        ).replace(":id", slugify(productName, productId));

    let ShopUrl = !isAssociateProduct
      ? ROUTE_MAIN_SHOP
      : ROUTE_ASSOCIATE_BRAND_STORE_SHOP.replace(
          ":sId",
          slugifyString(get(params, "id", null))
        );

    let CetegoryUrl = `${ShopUrl}?categoryId=${get(
      productData,
      "product.category_id",
      0
    )}`;

    let SubCategoryUrl = `${ShopUrl}?categoryId=${get(
      productData,
      "product.category_id",
      0
    )}&sub_categoryId=${get(productData, "product.subcategory_id", 0)}`;

    if (size(get(productData, "product.product_variants")) > 0) {
      const findCoverImage = [
        ...get(productData, "product.product_variants"),
      ].filter(
        (item) => item.color_id === get(productData, "cover_image_color_id")
      );
      if (findCoverImage[0]) {
        setPrieviewProduct(findCoverImage[0]);
        if (get(findCoverImage[0], "image_id")) {
          setActiveImage(get(findCoverImage[0], "image_id"));
        }
      }
    }

    setProductUrl(ProductUrl);
    setCategoryUrl(CetegoryUrl);
    setSubCategoryUrl(SubCategoryUrl);
  }, [productData]);

  return (
    <div className="product-wrapper">
      <div className="product-box">
        <div
          className="product-img"
          onClick={() => navigate(productUrl)}
          onMouseOver={mouseOverProduct}
          onMouseOut={mouseOutProduct}
        >
          {!mainLoading && (
            <PreviewJsonImage
              previewImageUrl={activeImage && getImageUrlById(activeImage)}
              json={
                !back && productData?.image_json?.imageObj
                  ? JSON.parse(productData?.image_json?.imageObj)
                  : back && productData?.image_json_back?.imageObj
                  ? JSON.parse(productData?.image_json_back?.imageObj)
                  : null
              }
              back={back}
              maxHeight={undefined}
              productData={productData}
            />
          )}
        </div>
        <div className="prodoct-content">
          <div className="content-header">
            <h6 onClick={() => navigate(productUrl)}>
              {get(productData, "name", "")}
            </h6>

            <div
              className="whishlist-btn"
              onClick={() => {
                loading || isInWishList
                  ? removeWishList(isInWishList?.id)
                  : addWishList(get(productData, "id", ""));
              }}
            >
              {loading ? (
                <div className="loader">
                  <Loader />
                </div>
              ) : isInWishList ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </div>
          </div>
          <p className="product-category  ">
            <span onClick={() => window.location.replace(categoryUrl)}>
              {t(get(productData, "product.category.name", ""))}
            </span>
            ,{" "}
            <span onClick={() => window.location.replace(subCategoryUrl)}>
              {t(get(productData, "product.sub_category.name", ""))}
            </span>
          </p>
          {!isAssociateProduct && (
            <>
              <div
                onClick={() => {
                  window.location = ROUTE_ASSOCIATE_BRAND_STORE.replace(
                    ":id",
                    slugifyString(
                      get(productData, "user.store_layout_details[0].name")
                    )
                  );
                }}
                className="associate-store"
              >
                <div className="logo">
                  <img
                    src={getImageUrlById(
                      get(
                        productData,
                        "user.store_layout_details[0].logo_image"
                      )
                    )}
                    alt=""
                  />
                </div>

                <div className="name">
                  {get(productData, "user.store_layout_details[0].name")}
                </div>
              </div>
            </>
          )}
          <div className="product-description">
            <p className="product-price" onClick={() => navigate(productUrl)}>
              {get(productData, "price", "")} RSD
            </p>
            <ButtonComponent
              text={t("Go to Product")}
              variant="outlined"
              className="buy-btn"
              onClick={() =>
                navigate(
                  !isAssociateProduct
                    ? ROUTE_MAIN_SHOP_PRODUCT.replace(
                        ":id",
                        slugify(productName, productId)
                      )
                    : ROUTE_ASSOCIATE_BRAND_STORE_SHOP_SINGLE_VIEW.replace(
                        ":sId",
                        slugifyString(get(params, "id", null))
                      ).replace(":id", slugify(productName, productId))
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
