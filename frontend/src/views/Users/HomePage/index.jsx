import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { debounce, get, map, size } from "lodash";
import { ACCESS_TOKEN } from "../../../utils/constant";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ROUTE_ASSOCIATE_BRAND_STORE,
  ROUTE_ASSOCIATE_BRAND_STORE_SHOP,
  ROUTE_MAIN_SHOP,
  ROUTE_MAIN_SHOP_PRODUCT,
  ROUTE_SIGN_UP,
} from "../../../routes/routes";
import {
  getImageUrlById,
  slugify,
  slugifyString,
} from "../../../utils/commonFunctions";

import SearchOutlined from "@mui/icons-material/SearchOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import PhoneCallbackOutlinedIcon from "@mui/icons-material/PermPhoneMsgOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ButtonComponent from "../../../components/ButtonComponent";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import SliderSection from "./SliderSection";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import Product from "../../../components/Product/Product";
import CommonCategorySidebar from "../../../components/CommonCategorySidebar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { Helmet } from "react-helmet";
import { Loader } from "../../../components/Loader";
import laptopImage from "../../../assets/images/laptop-image.png";
import step1 from "../../../assets/images/step1.png";
import step2 from "../../../assets/images/step2.png";
import step3 from "../../../assets/images/step3.png";
import step4 from "../../../assets/images/step4.png";
import step5 from "../../../assets/images/step5.png";
import step6 from "../../../assets/images/step6.png";
import { InputAdornment, Menu, MenuItem, TextField } from "@mui/material";

const HomePage = () => {
  const [value, setValue] = useState("1");
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [associatesList, setAssociatesList] = useState([]);
  const [productsList, setProductList] = useState([]);
  const [bestSellingCategories, setBestSellingCategories] = useState([]);
  const [wishListData, setWishListData] = useState([]);
  const [filteredSearchData, setFilteredSearchData] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const searchModal = Boolean(anchorEl);
  const [searchDataList, setSearchDataList] = useState([]);

  const navigate = useNavigate();
  const targetSearchField = useRef(null);
  const { t } = useTranslation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    setAnchorEl(targetSearchField.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    debouncedHandleSearch(event.target.value);
  };

  const filterSearch = (query) => {
    return searchDataList.filter(
      (item) =>
        item.name?.toLowerCase().includes(query.toLowerCase()) || // Search by Name
        item.storeName?.toLowerCase().includes(query.toLowerCase()) // Search by Store Name
    );
  };

  const debouncedHandleSearch = useCallback(
    debounce((query) => {
      if (query) {
        setSearchMode(true);
      } else {
        setSearchMode(false);
      }

      const filteredItems = filterSearch(query);
      setFilteredSearchData(filteredItems);
    }, 1000),
    [searchTerm]
  );

  const handleItemPick = (item) => {
    setAnchorEl(null);
    let url = item.productId
      ? ROUTE_MAIN_SHOP_PRODUCT.replace(":sId", item.productId).replace(
          ":id",
          slugify(item.name, item.productId)
        )
      : ROUTE_ASSOCIATE_BRAND_STORE_SHOP.replace(
          ":id",
          slugifyString(item.storeName)
        );

    if (url) {
      navigate(url);
      window.location.reload();
    }
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

  const getProductList = async () => {
    const response = await commonGetQuery("/associate_products");

    if (response) {
      const { data } = response.data;
      setProductList(data);
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

  const initSearchData = () => {
    let initData = [];

    productsList?.forEach((p) =>
      initData.push({ productId: p.id, name: p.name })
    );
    associatesList?.forEach((a) =>
      initData.push({
        userId: a.id,
        name: `${a.first_name} ${a.last_name}`,
        storeName:
          a.store_layout_details &&
          a.store_layout_details[0] &&
          a.store_layout_details[0].name,
      })
    );

    return initData;
  };

  useEffect(() => {
    getBestSellingProduct();
    getProductList();
    getAssociatesList();

    if (ACCESS_TOKEN) {
      getWishListData();
    }
  }, []);

  useEffect(() => {
    getAllCategory();
  }, [bestSellingCategories]);

  useEffect(() => {
    const dataSearch = initSearchData();
    if (dataSearch) setSearchDataList(dataSearch);
  }, [associatesList, productsList]);

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
                              aria-controls={
                                searchModal ? "basic-menu" : undefined
                              }
                              aria-haspopup="true"
                              aria-expanded={searchModal ? "true" : undefined}
                              onClick={handleClick}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Menu
                      anchorEl={anchorEl}
                      id="basic-menu"
                      className="search-menu-container"
                      open={searchModal}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {searchMode
                        ? filteredSearchData &&
                          filteredSearchData.length > 0 &&
                          filteredSearchData.map((l, index) => {
                            return (
                              <MenuItem
                                key={index}
                                onClick={() => handleItemPick(l)}
                              >
                                {l.productId ? (
                                  <ShoppingBagOutlinedIcon className="me-2" />
                                ) : (
                                  <StoreOutlinedIcon className="me-2" />
                                )}
                                {l.storeName || l.name}
                              </MenuItem>
                            );
                          })
                        : searchDataList &&
                          searchDataList.length > 0 &&
                          searchDataList.map((l, index) => {
                            return (
                              <MenuItem
                                key={index}
                                onClick={() => handleItemPick(l)}
                              >
                                {l.productId ? (
                                  <ShoppingBagOutlinedIcon className="me-2" />
                                ) : (
                                  <StoreOutlinedIcon className="me-2" />
                                )}
                                {l.storeName || l.name}
                              </MenuItem>
                            );
                          })}
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 order-1 order-lg-2 banner-image-container">
              <img src={laptopImage} alt="Laptop" />
              {/* <div className="banner-video-section">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/PgniL3fILmM?si=qcqCY5kBg7g3lMUD"
                  title={t("YouTube Video Player")}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div> */}
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
            {/* <div className="slider-container">
                <SliderSection />
              </div> */}
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
                      style={{ objectFit: "contain" }}
                        src={getImageUrlById(
                          size(get(item, "store_layout_details", [])) > 0
                            ? get(item, "store_layout_details.0.logo_image", "")
                            : get(item, "image_id", "")
                            ? get(item, "image_id", "")
                            : undefined
                        )}
                        alt=""
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
                        <h3 className="title">
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
              {/* <div className="associates-slider">
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
              </div> */}
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
