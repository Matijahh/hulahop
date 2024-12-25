import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { get, map, size } from "lodash";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { getImageUrlById, slugifyString } from "../../../utils/commonFunctions";
import { ACCESS_TOKEN } from "../../../utils/constant";
import {
  ROUTE_ASSOCIATE_BRAND_STORE,
  ROUTE_ASSOCIATE_BRAND_STORE_SHOP,
  ROUTE_MAIN_SHOP,
} from "../../../routes/routes";
import * as Yup from "yup";
import cx from "classnames";
import parse from "html-react-parser";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BiLogoFacebook } from "react-icons/bi";
import ButtonComponent from "../../../components/ButtonComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import GobackButton from "../../../components/GoBackButton";
import PreviewJsonImage from "../../../components/PreviewJsonImage";
import CommonCategorySidebar from "../../../components/CommonCategorySidebar";
import AuthModal from "../../../components/AuthenticationModal";

import { GiReceiveMoney } from "react-icons/gi";
import { Col, Row } from "react-bootstrap";
import { ColorBox } from "../../Associats/Products/EditProduct/styled";
import { Loader } from "../../../components/Loader";
import { ErrorTaster, SuccessTaster } from "../../../components/Toast";
import { Helmet } from "react-helmet";
import { FacebookShareButton } from "react-share";
import { connect } from "react-redux";

const SingleProduct = ({ isAssociateProduct, storeData }) => {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [prieviewProduct, setPrieviewProduct] = useState({});
  const [aboutProductsData, setAboutProductsData] = useState();
  const [authenticationModal, setAuthenticationModal] = useState(false);
  const [associateProductColors, setAssociateProductColors] = useState([]);
  const [wishListData, setWishListData] = useState([]);

  const params = useParams();
  const { t } = useTranslation();

  const lang = localStorage.getItem("I18N_LANGUAGE") || "en";

  const validation = Yup.object().shape({
    quantity: Yup.string().required(t("Quantity is required!")),
  });

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

  const getAboutProductsData = async (sub_categoryId) => {
    let url = "about-product-data";

    if (sub_categoryId && sub_categoryId != 0) {
      url = `${url}?subcategory_id=${sub_categoryId}`;
    }

    const response = await commonGetQuery(url);

    if (response) {
      const { data } = response.data;
      setAboutProductsData(data);
    }
  };

  const setLocalCart = async (productId, variantId, subVariantId, quantity) => {
    let localCart = JSON.parse(localStorage.getItem("cart_products"));
    if (!localCart) localCart = [];
    if (productId && variantId && subVariantId) {
      Promise.all([
        commonAddUpdateQuery(`/associate_products/${productId}`, {}, "GET"),
        commonAddUpdateQuery(`/product_variants/${variantId}`, {}, "GET"),
        commonAddUpdateQuery(
          `/product_sub_variants/${subVariantId}`,
          {},
          "GET"
        ),
      ])
        .then((res) => {
          const associateProduct = res[0].data.data;
          const variantData = res[1].data.data;
          const subVariantData = res[2].data;

          let product = {
            associate_product: associateProduct,
            associate_product_id: productId,
            product_sub_variant: subVariantData,
            product_sub_variant_id: subVariantId,
            product_variant: variantData,
            product_variant_id: variantId,
            quantity: quantity,
          };

          let found = localCart.findIndex(
            (p) =>
              p.associate_product_id === product.associate_product_id &&
              p.product_sub_variant_id === product.product_sub_variant_id
          );

          if (found === -1) {
            localCart.push(product);
          } else {
            localCart[found] = {
              ...localCart[found],
              quantity: (localCart[found].quantity || 0) + product.quantity,
            };
          }

          localStorage.setItem("cart_products", JSON.stringify(localCart));
          SuccessTaster(t("Added to cart sucessfully."));
        })
        .catch((error) => {
          if (error && error.data) {
            const { message } = error.data;
            ErrorTaster(t(message));
          }
        });
    } else {
      ErrorTaster(t("Network Error"));
    }
  };

  const formik = useFormik({
    initialValues: {
      product_variant_id: "",
      product_sub_variant_id: "",
      quantity: 1,
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      const reqBody = {
        associate_product_id: get(params, "id")?.split("-")?.[1],
        product_variant_id: values.product_variant_id,
        product_sub_variant_id: values.product_sub_variant_id,
        quantity: values.quantity,
        action_type: "add_to_cart",
      };

      const URL = "/cart_products/add-to-cart";

      if (ACCESS_TOKEN) {
        setLoading(true);

        const result = await commonAddUpdateQuery(URL, reqBody, "POST");

        if (result) {
          SuccessTaster(t("Added to cart sucessfully."));
        }
        setLoading(false);
      } else {
        setLoading(true);

        setLocalCart(
          reqBody.associate_product_id,
          reqBody.product_variant_id,
          reqBody.product_sub_variant_id,
          reqBody.quantity
        );

        setLoading(false);
      }
    },
  });

  const getAssociateProduct = async () => {
    setLoading(true);

    let id = get(params, "id")?.split("-")?.[1];

    const response = await commonGetQuery(`/associate_products/${id}`);

    if (response) {
      const { data } = response.data;

      setProductData(data);

      if (size(get(data, "product.product_variants")) > 0) {
        const findCoverImage = [
          ...get(data, "product.product_variants"),
        ].filter((item) => item.color_id === get(data, "cover_image_color_id"));

        setPrieviewProduct(findCoverImage[0]);

        formik.setFieldValue(
          "product_variant_id",
          get(data, "product.product_variants.0.id", "")
        );

        let associatePData = [...data?.associate_product_colors].map(
          (item) => item?.color_id
        );

        const filteredData = get(data, "product.product_variants").filter(
          (item) => associatePData.includes(item.color_id)
        );

        setAssociateProductColors(filteredData);
        getAboutProductsData(get(data, "product.sub_category.id"));
      }

      setLoading(false);
    }

    setLoading(false);
  };

  const handelChangeViewProduct = (id) => {
    formik.setFieldValue("product_variant_id", id);
    formik.setFieldValue("product_sub_variant_id", "");

    let currentProduct = get(productData, "product.product_variants").find(
      (item) => item.id === id
    );

    setPrieviewProduct(currentProduct);
  };

  const addRemoveWishList = async (id) => {
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
      if (ACCESS_TOKEN) {
        getWishListData();
      }
      SuccessTaster(t("Product added to wishList sucessfully."));
    }

    setLoading(false);
  };

  const checkIsInWishList = (id) => {
    if (wishListData.length > 0) {
      return wishListData.find((item) => item.associate_product_id == id);
    }
  };

  useEffect(() => {
    getAssociateProduct();
    if (ACCESS_TOKEN) {
      getWishListData();
    }
  }, []);

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

  let SubCetegoryUrl = `${ShopUrl}?categoryId=${get(
    productData,
    "product.category_id",
    0
  )}&sub_categoryId=${get(productData, "product.subcategory_id", 0)}`;

  return loading ? (
    <div className="p-5">
      <Loader></Loader>
    </div>
  ) : (
    <div className="page-wrapper single-product-page">
      <Helmet>
        <title>
          {get(productData, "name")
            ? `${get(productData, "name")}`
            : t("Product Details - Hulahop")}
        </title>
      </Helmet>
      <div className="product-hero-section">
        <div className="container single-product-container">
          <GobackButton className="back-btn" />
          <div className="row">
            <div className="col-lg-5">
              <div className="product-img-section">
                <div className="product-img-box">
                  <div className="image-box-wrapper">
                    <PreviewJsonImage
                      previewImageUrl={getImageUrlById(
                        get(prieviewProduct, "image_id")
                      )}
                      json={
                        get(productData, "image_json.imageObj", "")
                          ? JSON.parse(
                              get(productData, "image_json.imageObj", "")
                            )
                          : null
                      }
                      autoHeight
                      productData={productData}
                    />
                  </div>
                </div>
                <div className="product-img-slider-box">
                  <div className="product-img-slider">
                    <SliderComponent
                      dots={false}
                      slidesToShow={
                        size(associateProductColors) > 4
                          ? 4
                          : size(associateProductColors)
                      }
                      arrows={true}
                    >
                      {size(associateProductColors) > 0 &&
                        map(associateProductColors, (item, key) => {
                          return (
                            <div className="product-img-slide" key={key}>
                              <div
                                className="silde-img-box"
                                onClick={() => handelChangeViewProduct(item.id)}
                              >
                                <img
                                  src={getImageUrlById(
                                    get(item, "image_id", "")
                                  )}
                                  alt=""
                                />
                              </div>
                            </div>
                          );
                        })}
                    </SliderComponent>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="product-description-section">
                <div className="product-detail-box">
                  <div className="product-detail-wrapper">
                    <div className="product-basic">
                      <h3 className="product-name">
                        {get(productData, "name", "")}
                      </h3>
                      <h5 className="product-price">
                        {get(productData, "price", "")} RSD
                      </h5>
                      <p className="about-product">
                        {get(productData, "description", "")}
                      </p>
                    </div>
                    <div className="product-hr-line"></div>
                    <div className="product-vendor-data">
                      {!isAssociateProduct && (
                        <div className="vendor-name">
                          <p>
                            {" "}
                            <b>{t("Vendor")}:</b>
                          </p>
                          <>
                            {size(
                              get(productData, "user.store_layout_details")
                            ) > 0 && (
                              <div
                                onClick={() => {
                                  window.location =
                                    ROUTE_ASSOCIATE_BRAND_STORE.replace(
                                      ":id",
                                      slugifyString(
                                        get(
                                          productData,
                                          "user.store_layout_details[0].name"
                                        )
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
                                  {get(
                                    productData,
                                    "user.store_layout_details[0].name"
                                  )}
                                </div>
                              </div>
                            )}
                          </>
                        </div>
                      )}
                      <div className="category-name">
                        <p>
                          <b>{t("Category")}:</b>
                        </p>
                        <p className="product-category  ">
                          <span
                            onClick={() => window.location.replace(CetegoryUrl)}
                          >
                            {t(get(productData, "product.category.name", ""))}
                          </span>
                          ,{" "}
                          <span
                            onClick={() =>
                              window.location.replace(SubCetegoryUrl)
                            }
                          >
                            {t(
                              get(productData, "product.sub_category.name", "")
                            )}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="product-hr-line"></div>
                    <div className="color-detail-data">
                      <div className="color-detail-flexbox">
                        <p className="color-text">{t("Color")}:</p>
                        <Row className="color-row">
                          {get(productData, "product") &&
                            associateProductColors &&
                            associateProductColors.map((item, i) => (
                              <Col
                                md={2}
                                lg={2}
                                sm={4}
                                key={`color-${i}`}
                                className="color-col"
                              >
                                <ColorBox
                                  onClick={() =>
                                    handelChangeViewProduct(item.id)
                                  }
                                  color={item.color?.code}
                                  className={
                                    item.id === get(prieviewProduct, "id") &&
                                    "active"
                                  }
                                >
                                  <div className="dot"></div>
                                </ColorBox>
                              </Col>
                            ))}
                        </Row>
                      </div>
                      {formik.errors.product_variant_id && (
                        <p>{formik.errors.product_variant_id}</p>
                      )}
                    </div>
                    {get(prieviewProduct, "sub_variants") &&
                      size(get(prieviewProduct, "sub_variants")) > 0 && (
                        <>
                          {size(get(prieviewProduct, "sub_variants")) === 1 &&
                          !get(
                            prieviewProduct,
                            "sub_variants[0].value"
                          ) ? null : (
                            <div className="size-detail-box">
                              <div className="size-detail-flexbox">
                                <p className="size-text">{t("Size")}:</p>
                                <div className="size-flexbox">
                                  {get(prieviewProduct, "sub_variants").map(
                                    (item, index) => (
                                      <p
                                        key={index}
                                        className={cx(
                                          "size-box",
                                          formik &&
                                            formik.values
                                              .product_sub_variant_id &&
                                            formik.values
                                              .product_sub_variant_id ===
                                              item.id &&
                                            "selected"
                                        )}
                                        onClick={() =>
                                          formik.setFieldValue(
                                            "product_sub_variant_id",
                                            item.id
                                          )
                                        }
                                      >
                                        {get(item, "value")}
                                      </p>
                                    )
                                  )}
                                </div>
                              </div>
                              {formik.errors.product_sub_variant_id && (
                                <p className="input-error">
                                  {formik.errors.product_sub_variant_id}
                                </p>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    <div className="product-hr-line"></div>
                    <div className="add-cart-section">
                      <div className="add-cart-flexbox">
                        <div className="quantity-box">
                          <div
                            className="cart-plus-minus cart-plus"
                            onClick={() => {
                              formik.setFieldValue(
                                "quantity",
                                formik.values.quantity > 1
                                  ? formik.values.quantity - 1
                                  : 1
                              );
                            }}
                          >
                            <RemoveIcon />
                          </div>
                          <div className="cart-plus-minus  quantity">
                            {formik && formik.values.quantity}
                          </div>
                          <div
                            className="cart-plus-minus cart-minus"
                            onClick={() => {
                              formik.setFieldValue(
                                "quantity",
                                formik.values.quantity
                                  ? formik.values.quantity + 1
                                  : 1
                              );
                            }}
                          >
                            <AddIcon />
                          </div>
                          {formik.errors.quantity && (
                            <p className="input-error">
                              {formik.errors.quantity}
                            </p>
                          )}
                        </div>
                        <div className="add-cart-btn">
                          <ButtonComponent
                            text={t("Add to Cart")}
                            startIcon={<ShoppingCartIcon />}
                            variant="contained"
                            className="add-btn"
                            onClick={() => formik.submitForm()}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="wishlist-box">
                      <p
                        role="button"
                        onClick={() => {
                          loading ||
                          checkIsInWishList(get(productData, "id", ""))
                            ? {}
                            : addRemoveWishList(get(productData, "id", ""));
                        }}
                      >
                        <span className="wishlist-icon">
                          {loading ? (
                            <div className="loader">
                              <Loader />
                            </div>
                          ) : checkIsInWishList(get(productData, "id", "")) ? (
                            <FavoriteIcon style={{ color: "red" }} />
                          ) : (
                            <FavoriteBorderIcon />
                          )}{" "}
                        </span>
                        <span className="wishlist-text">
                          {t("Add to Wishlist")}
                        </span>
                      </p>
                    </div>
                    <div className="product-hr-line"></div>
                    <div className="share-product-section">
                      <div className="share-product-flexbox">
                        <p className="share-text">{t("Share")}:</p>
                        <div className="social-flexbox">
                          <div className="social-box">
                            <p className="social-icon">
                              <FacebookShareButton url={window.location.href}>
                                <BiLogoFacebook />
                              </FacebookShareButton>
                            </p>
                            <p>Facebook</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="after-purchase-section">
        <div className="container">
          {size(aboutProductsData) > 0 && (
            <div className="about-product-section">
              <div className="container">
                <div className="row g-4">
                  <div className="col-12">
                    <div>
                      <h3 className="banner-head">{t("About Our Product")}</h3>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="about-product-desciption">
                      <div className="description-white-box">
                        {lang == "sr"
                          ? get(
                              aboutProductsData,
                              "0.product_description_1_ab"
                            ) &&
                            parse(
                              get(
                                aboutProductsData,
                                "0.product_description_1_ab"
                              )
                            )
                          : get(aboutProductsData, "0.product_description_1") &&
                            parse(
                              get(aboutProductsData, "0.product_description_1")
                            )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="about-product-desciption">
                      <div className="description-white-box white-box">
                        {lang == "sr"
                          ? get(
                              aboutProductsData,
                              "0.product_description_2_sb"
                            ) &&
                            parse(
                              get(
                                aboutProductsData,
                                "0.product_description_2_sb"
                              )
                            )
                          : get(aboutProductsData, "0.product_description_2") &&
                            parse(
                              get(aboutProductsData, "0.product_description_2")
                            )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-12">
              <div className="after-purchase-wrapper">
                <div className="row g-4">
                  <div className="col-lg-4">
                    <div className="after-purchase-box">
                      <div className="after-purchase">
                        <div className="icon-box">
                          <LocalShippingIcon />
                        </div>
                        <div className="after-purchase-description">
                          <h4>{t("Free Shipping")}</h4>
                          <p>{t("Free shipping on orders over $99.")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="after-purchase-box">
                      <div className="after-purchase">
                        <div className="icon-box">
                          <GiReceiveMoney />
                        </div>
                        <div className="after-purchase-description">
                          <h4>{t("Money Back")}</h4>
                          <p>{t("15 days money back guarantee.")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="after-purchase-box">
                      <div className="after-purchase">
                        <div className="icon-box">
                          <SupportAgentIcon />
                        </div>
                        <div className="after-purchase-description">
                          <h4>{t("Support")}</h4>
                          <p>
                            {t("We strive for great support to please you.")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommonCategorySidebar
        isAssociate={isAssociateProduct}
        storeData={storeData}
        renderHeader={() => {
          return (
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head">{t("Product Categories")}</h3>
              </div>
            </div>
          );
        }}
      />
      {authenticationModal && (
        <AuthModal
          open={authenticationModal}
          handleClose={() => setAuthenticationModal(!authenticationModal)}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  storeData: state.user.storeData,
});

export default connect(mapStateToProps, null)(SingleProduct);
