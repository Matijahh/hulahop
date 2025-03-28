import { useEffect, useRef, useState } from "react";
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

import SearchOutlined from "@mui/icons-material/SearchOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import PhoneCallbackOutlinedIcon from "@mui/icons-material/PermPhoneMsgOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ButtonComponent from "../../../components/ButtonComponent";
import Product from "../../../components/Product/Product";
import CommonCategorySidebar from "../../../components/CommonCategorySidebar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Helmet } from "react-helmet";
import { Loader } from "../../../components/Loader";
import { InputAdornment, TextField } from "@mui/material";

import laptopImage from "../../../assets/images/laptop-image.png";
import step1 from "../../../assets/images/step1.png";
import step2 from "../../../assets/images/step2.png";
import step3 from "../../../assets/images/step3.png";
import step4 from "../../../assets/images/step4.png";
import step5 from "../../../assets/images/step5.png";
import step6 from "../../../assets/images/step6.png";

const HomePage = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [associatesList, setAssociatesList] = useState([]);
  const [wishListData, setWishListData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const targetSearchField = useRef(null);
  const { t } = useTranslation();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getBestSellingProduct = async (id) => {
    let url = "associate_products?status=true&best_selling=true";
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
                    {`${t(
                      "Drive sales by offering your designs on our products online."
                    )} ${t(
                      "Make money easily, from home, without inventory and initial investment. You just need to sit down at your computer, come up with your design, upload it to our items through the app and start selling."
                    )}`}
                  </p>
                </div>
                <div className="d-flex buttons-container">
                  <ButtonComponent
                    text={t("Register and Create a Store")}
                    variant="contained"
                    className="register-button"
                    onClick={() => navigate(ROUTE_SIGN_UP)}
                  />
                  <div className="search-box">
                    <TextField
                      ref={targetSearchField}
                      id="search"
                      type="search"
                      placeholder={t("Search")}
                      size="small"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      sx={{ width: "100%", maxWidth: "420px" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchOutlined
                              className="search-btn"
                              id="basic-button"
                              aria-haspopup="true"
                              onClick={() =>
                                navigate(
                                  ROUTE_MAIN_SHOP +
                                    "?search_string=" +
                                    searchTerm
                                )
                              }
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 order-1 order-lg-2 banner-image-container">
              <img src={laptopImage} alt="Laptop" />
            </div>
          </div>
        </div>
      </div>
      <div className="how-it-works-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head">{t("How Does It Work?")}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 d-flex justify-content-center align-items-center step-info-container">
                <div className="step-container">
                  <p className="number-element">1</p>
                  <h4>{t("The first step is registration")}</h4>
                  <p>
                    {t(
                      "Register and open your store according to the instructions: 'How to register as a seller'"
                    )}
                  </p>
                </div>
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center step-image-container">
                <img src={step1} />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-6 d-flex justify-content-center align-items-center step-image-container hide-mobile">
                <img src={step2} />
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center step-info-container">
                <div className="step-container">
                  <p className="number-element">2</p>
                  <h4>{t("The second step is to set up the store")}</h4>
                  <p>
                    {t(
                      "Customize your store to your needs and taste, according to the instructions: 'How to set up a store'"
                    )}
                  </p>
                </div>
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center step-image-container hide-desktop">
                <img src={step2} />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-6 d-flex justify-content-center align-items-center step-info-container">
                <div className="step-container">
                  <p className="number-element">3</p>
                  <h4>
                    {t(
                      "The third step is the selection of articles and their design"
                    )}
                  </h4>
                  <p>
                    {t(
                      "Select and place the items from our offer in your store, according to the instructions: 'How to add items to the store'"
                    )}
                  </p>
                </div>
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center step-image-container">
                <img src={step3} />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-6 d-flex justify-content-center align-items-center step-image-container hide-mobile">
                <img src={step4} />
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center step-info-container">
                <div className="step-container">
                  <p className="number-element">4</p>
                  <h4>{t("Do your best to offer your customers")}</h4>
                  <p>
                    {t(
                      "More details in the instructions: 'How to buy', and in short like this: Your customers choose what to order in your online store,click to order the desired article, enter the data for sending."
                    )}
                  </p>
                </div>
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center step-image-container hide-desktop">
                <img src={step4} />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-6 d-flex justify-content-center align-items-center step-info-container">
                <div className="step-container">
                  <p className="number-element">5</p>
                  <h4>{t("We are processing the order")}</h4>
                  <p>
                    {t(
                      "The order arrives at our place for processing, after confirmation of the order by e-mail or phone, we print and pack the product, deliver it to the customer by a courier service with which we have a contract."
                    )}
                  </p>
                </div>
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center step-image-container">
                <img src={step5} />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-6 d-flex justify-content-center align-items-center step-image-container hide-mobile">
                <img src={step6} />
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center step-info-container">
                <div className="step-container">
                  <p className="number-element">6</p>
                  <h4>{t("Process Completed")}</h4>
                  <p>
                    {t(
                      "Upon receipt, the customer pays for the order with postal costs, the service pays us the money, we transfer your part of the payment to you."
                    )}
                  </p>
                </div>
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center step-image-container hide-desktop">
                <img src={step6} />
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
                  <div className="d-flex justify-content-center align-items-center">
                    <Loader />
                  </div>
                ) : (
                  <div className="product-listing">
                    <div className="products-list-container">
                      {size(bestSellingProducts) > 0 &&
                        bestSellingProducts.map((item, key) => (
                          <div className="product-container" key={key}>
                            <Product
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

      <div className="associates-listing-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head">{t("Trusted Associates")}</h3>
              </div>
            </div>
            <div className="associates-box-list-container">
              {size(associatesList) > 0 &&
                map(associatesList, (item, index) => {
                  return (
                    <div className="associates-box" key={index}>
                      <img
                        style={{ objectFit: "contain", cursor: "pointer" }}
                        src={getImageUrlById(
                          size(get(item, "store_layout_details", [])) > 0
                            ? get(item, "store_layout_details.0.logo_image", "")
                            : get(item, "image_id", "")
                            ? get(item, "image_id", "")
                            : undefined
                        )}
                        alt=""
                        onClick={() =>
                          window.open(
                            ROUTE_ASSOCIATE_BRAND_STORE.replace(
                              ":id",
                              slugifyString(
                                get(item, "store_layout_details.0.name", null)
                              )
                            ),
                            "_self"
                          )
                        }
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
                        <h3
                          className="title"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              ROUTE_ASSOCIATE_BRAND_STORE.replace(
                                ":id",
                                slugifyString(
                                  get(item, "store_layout_details.0.name", null)
                                )
                              ),
                              "_self"
                            )
                          }
                        >
                          {get(item, "store_layout_details.0.name", null)}
                        </h3>
                        <p>
                          {get(
                            item,
                            "store_layout_details.0.description",
                            null
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="delivery-info-section">
        <div className="container">
          <div className="row g-3">
            <div className="col-12 col-md-4">
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
            <div className="col-12 col-md-4">
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
            <div className="col-12 col-md-4">
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
      <CommonCategorySidebar />
    </div>
  );
};

const mapStateToProps = (state) => ({
  shopCategoryDataList: state.user.shopCategoryDataList,
});

export default connect(mapStateToProps, null)(HomePage);
