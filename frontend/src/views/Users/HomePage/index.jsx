import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { get, map, size } from "lodash";
import { ACCESS_TOKEN } from "../../../utils/constant";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ROUTE_ASSOCIATE_BRAND_STORE,
  ROUTE_MAIN_SHOP,
  ROUTE_SIGN_UP,
} from "../../../routes/routes";
import { getImageUrlById, slugifyString } from "../../../utils/commonFunctions";
import createStore from "../../../assets/images/createStore.png";

import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import PhoneCallbackOutlinedIcon from "@mui/icons-material/PhoneCallbackOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import ButtonComponent from "../../../components/ButtonComponent";
import SliderSection from "./SliderSection";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import Product from "../../../components/Product/Product";
import CommonCategorySidebar from "../../../components/CommonCategorySidebar";

import { Helmet } from "react-helmet";
import { Loader } from "../../../components/Loader";

const HomePage = () => {
  const [value, setValue] = useState("1");
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [associatesList, setAssociatesList] = useState([]);
  const [bestSellingCategories, setBestSellingCategories] = useState([]);
  const [wishListData, setWishListData] = useState([]);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getAllCategory = async () => {
    let url = "/categories";

    const response = await commonGetQuery(url);

    if (response) {
      const { data } = response.data;
      setCategories(
        [...data].filter((d) => bestSellingCategories.find((i) => i === d.id))
      );
    }
  };

  const getBestSellingProduct = async (id) => {
    let url = "associate_products?best_selling=true";
    let categoryIds = [];

    if (id) {
      url = `${url}&category_ids=${id}`;
    }

    setLoading(true);

    const response = await commonGetQuery(`/${url}`);

    setLoading(false);

    if (response) {
      const { data } = response.data;
      data.forEach((d) => {
        if (
          d.product?.category_id &&
          !categoryIds.find((c) => c === d.product?.category_id)
        ) {
          categoryIds.push(d.product?.category_id);
        }
      });

      setBestSellingCategories(categoryIds);
      setBestSellingProducts(data);
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

  const getAssociatesList = async () => {
    setLoading(true);

    const response = await commonGetQuery("/associates?isHighlighted=true");

    if (response) {
      const { data } = response.data;

      setAssociatesList(data);
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    getBestSellingProduct();

    getAssociatesList();

    if (ACCESS_TOKEN) {
      getWishListData();
    }
  }, []);

  useEffect(() => {
    getAllCategory();
  }, [bestSellingCategories]);

  return (
    <div className="page-wrapper home-page">
      <Helmet>
        <title>{t("Home Page - HulaHop")}</title>
      </Helmet>
      <div className="banner-section">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-5 order-2 order-lg-1">
              <div className="banner-about-section">
                <h4>{t("Create your own store completely free")}</h4>
                <div className="banner-description">
                  <p>
                    {t(
                      "Drive sales by offering your designs on our products online."
                    )}
                  </p>
                  <p>
                    {t(
                      "Make money easily, from home, without inventory and initial investment. You just need to sit down at your computer, come up with your design, upload it to our items through the app and start selling."
                    )}
                  </p>
                </div>
                <ButtonComponent
                  text={t("Register and Create a Store")}
                  startIcon={<PersonAddAltOutlinedIcon />}
                  variant="contained"
                  className="register-button"
                  onClick={() => navigate(ROUTE_SIGN_UP)}
                />
              </div>
            </div>
            <div className="col-lg-7 order-1 order-lg-2">
              <div className="banner-video-section">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/PgniL3fILmM?si=qcqCY5kBg7g3lMUD"
                  title={t("YouTube Video Player")}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-slider-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head">{t("How Does It Work?")}</h3>
                {/* <p className="banner-paragraph">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
                  veniam eos id nam incidunt et esse consequatur consectetur
                  accusantium impedit sit ex at temporibus, non facere
                  reiciendis nulla. Enim, qui.
                </p> */}
              </div>
            </div>
            <div className="col-12">
              <div className="slider-container">
                <SliderSection />
              </div>
            </div>
          </div>
        </div>
      </div>

      {size(bestSellingProducts) > 0 && (
        <div className="product-list-section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="hero-section">
                  <h3 className="banner-head m-0">
                    {t("Best Selling Products")}
                  </h3>
                </div>
              </div>
              <div className="col-12">
                {loading ? (
                  <div className="d-flex justify-content-center aline-items-center">
                    <Loader />
                  </div>
                ) : (
                  <div className="product-listing">
                    <div className="products-list-container">
                      <div className="row g-3">
                        {size(bestSellingProducts) > 0 &&
                          bestSellingProducts.map((item, key) => (
                            <div className="col-md-6 col-lg-3" key={key}>
                              <Product
                                productData={item}
                                isInWishList={checkIsInWishList(item.id)}
                                getWishListData={getWishListData}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                    {/* <TabContext value={value}>
                      <div className="product-listing-tabs">
                        <TabList
                          onChange={handleChange}
                          aria-label="categories"
                          centered
                        >
                          {_size(categories) > 0 &&
                            _map(categories, (item, key) => (
                              <Tab
                                className="product-tab"
                                label={t(item?.name)}
                                value={item?.id}
                                key={key}
                                onClick={() => getBestSellingProduct(item?.id)}
                              />
                            ))}
                        </TabList>
                      </div>
                      <div className="products-list-container">
                        <div className="row g-3">
                          {size(bestSellingProducts) > 0 &&
                            bestSellingProducts.map((item, key) => (
                              <div className="col-md-6 col-lg-3" key={key}>
                                <Product
                                  productData={item}
                                  isInWishList={checkIsInWishList(item.id)}
                                  getWishListData={getWishListData}
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    </TabContext> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="associates-listing-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head">{t("Our Associates")}</h3>
              </div>
            </div>
            <div className="col-12">
              <div className="associates-slider">
                <SliderComponent dots={false} arrows={true} slidesToShow={5}>
                  {size(associatesList) > 0 &&
                    map(associatesList, (item, index) => {
                      return (
                        <>
                          <div className="associates-slide" key={index}>
                            <div
                              className="associates-box"
                              onClick={() =>
                                window.location.replace(
                                  ROUTE_ASSOCIATE_BRAND_STORE.replace(
                                    ":id",
                                    slugifyString(
                                      get(
                                        item,
                                        "store_layout_details.0.name",
                                        null
                                      )
                                    )
                                  )
                                )
                              }
                            >
                              <img
                                src={getImageUrlById(
                                  size(get(item, "store_layout_details", [])) >
                                    0
                                    ? get(
                                        item,
                                        "store_layout_details.0.logo_image",
                                        ""
                                      )
                                    : get(item, "image_id", "")
                                    ? get(item, "image_id", "")
                                    : undefined
                                )}
                                alt=""
                              />
                            </div>
                          </div>
                        </>
                      );
                    })}
                </SliderComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-passion">
        <div className="container">
          <div className="section-wrapper">
            <div className="row justify-content-between g-3">
              <div className="col-lg-5">
                <div className="section-img">
                  <img src={createStore} alt="" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="section-content">
                  <h3>{t("Our Passion is Your Inspiration")}</h3>
                  <p>
                    {t(
                      "Being creative is not a hobby. it is a way of life for every artist. We are committed to our work, and we hope to inspire you to make a difference in the world."
                    )}
                  </p>
                  <p>
                    {t(
                      "We believe that art has the power to change the world. Through our art, we can challenge the status quo, ins pire others, and create new perspectives. We are driven by our passion to create something meaningful and lasting."
                    )}
                  </p>
                  <ButtonComponent
                    text={t("Shop Now")}
                    variant="outlined"
                    className="shop-now-btn"
                    onClick={() => navigate(ROUTE_MAIN_SHOP)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="delivery-info-section">
        <div className="container">
          <div className="row g-3">
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head">{t("We Deliver Happiness")}</h3>
                {/* <p className="banner-paragraph">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
                  veniam eos id nam incidunt et esse consequatur consectetur
                  accusantium impedit sit ex at temporibus, non facere
                  reiciendis nulla. Enim, qui.
                </p> */}
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <div className="delivery-box-wrapper">
                <div className="delivery-info-box">
                  <div className="icon-box">
                    <RocketLaunchOutlinedIcon />
                  </div>
                  <div className="content-box">
                    <h4>{t("Fast and Safe Delivery")}</h4>
                    <p>
                      {t(
                        "When it comes to fast and secure delivery in Serbia, there is no better option than Post Express. With their reliable courier services, your parcels and packages are guaranteed to reach their destination without any delay or hassle."
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <div className="delivery-box-wrapper">
                <div className="delivery-info-box">
                  <div className="icon-box">
                    <CurrencyExchangeOutlinedIcon />
                  </div>
                  <div className="content-box">
                    <h4>{t("Refund")}</h4>
                    <p>
                      {t(
                        "If the product you receive fails to meet your expectations, we offer a hassle-free return policy. You have the option to send the goods back to us and receive a full refund. Your satisfaction is our top priority."
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <div className="delivery-box-wrapper">
                <div className="delivery-info-box">
                  <div className="icon-box">
                    <PhoneCallbackOutlinedIcon />
                  </div>
                  <div className="content-box">
                    <h4>{t("Contact")}</h4>
                    <p>
                      {t(
                        "Feel free to reach out to us during weekdays from 9 am to 4 pm if you have any inquiries or suggestions about potential collaborations. We'll be more than happy to assist you."
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommonCategorySidebar
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  shopCategoryDataList: state.user.shopCategoryDataList,
});

export default connect(mapStateToProps, null)(HomePage);
