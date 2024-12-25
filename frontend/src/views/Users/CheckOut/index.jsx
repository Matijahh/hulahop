import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { getImageUrlById } from "../../../utils/commonFunctions";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { ROUTE_MAIN, ROUTE_MAIN_ORDERS } from "../../../routes/routes";
import { ACCESS_TOKEN } from "../../../utils/constant";
import { get, size } from "lodash";
import * as Yup from "yup";

import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import PreviewJsonImage from "../../../components/PreviewJsonImage";

import { SuccessTaster } from "../../../components/Toast";
import { Helmet } from "react-helmet";
import { LoaderContainer } from "../../../components/Loader";

const CheckOut = () => {
  const [loading, setLoading] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required(t("First name is required.")),
    last_name: Yup.string().required(t("Last name is required.")),
    email: Yup.string()
      .email(t("Invalid email!"))
      .required(t("Email is required!")),
    mobile: Yup.string().required(t("Phone number is required")),
    house_flat_no: Yup.string().required(t("Required")),
    city: Yup.string().required(t("Required")),
    country: Yup.string().required(t("Required")),
    pincode: Yup.string().required(t("Required")),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      house_flat_no: "",
      street_locality: "",
      city: "",
      country: "",
      pincode: "",
      instructions: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const order_addresses = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        mobile: values.mobile,
        house_flat_no: values.house_flat_no,
        street_locality: "",
        city: values.city,
        //state: null,
        country: values.country,
        pincode: values.pincode,
      };

      const response = ACCESS_TOKEN
        ? await commonAddUpdateQuery(
            "/orders/order-place",
            {
              instructions: values.instructions,
              order_addresses,
              status: "PENDING",
            },
            "POST"
          )
        : await commonAddUpdateQuery(
            "/orders/order-place-guest",
            {
              createOrdersInput: {
                instructions: values.instructions,
                order_addresses,
                status: "PENDING",
              },
              cart: cartList,
            },
            "POST"
          );

      setLoading(false);

      if (response) {
        const { message } = response.data;
        SuccessTaster(t(message));
        ACCESS_TOKEN ? navigate(ROUTE_MAIN_ORDERS) : navigate(ROUTE_MAIN);
        if (!ACCESS_TOKEN) {
          localStorage.setItem("cart_products", null);
        }
      }
    },
  });

  const getLocalCart = () => {
    setLoading(true);

    const localCart = JSON.parse(localStorage.getItem("cart_products"));

    if (localCart) {
      let cartTotalData = 0;

      // Calculate total cart value
      if (size(localCart) > 0) {
        localCart.forEach((product) => {
          const price = parseFloat(product.associate_product.price);
          const quantity = Number(product.quantity);
          cartTotalData += price * quantity;
        });
      }

      setCartTotal(cartTotalData);
      setCartList({ cart_products: localCart });
    } else {
      setCartList({ cartProducts: [] });
    }

    setLoading(false);
  };

  const getCartList = async () => {
    setLoading(true);

    const response = await commonGetQuery("/carts/get-cart-summary");

    if (response) {
      const { data } = response.data;
      setCartList(data);
      let cartTotalData = 0;
      let cartProducts = get(data, "cart_products");

      // Calculate total cart value
      if (size(cartProducts) > 0) {
        cartProducts.forEach((product) => {
          const price = parseFloat(product.associate_product.price);
          const quantity = Number(product.quantity);
          cartTotalData += price * quantity;
        });
      }

      setCartTotal(cartTotalData);
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (ACCESS_TOKEN) getCartList();
    else getLocalCart();
  }, []);

  return (
    <div className="page-wrapper checkout-page">
      <Helmet>
        <title>{t("Checkout - HulaHop")}</title>
      </Helmet>

      {loading && <LoaderContainer />}

      <div className="checkout-banner-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-section">
                <h3 className="banner-head">{t("Checkout")}</h3>
                <p className="banner-paragraph">
                  {t(
                    "Complete your purchase and get your order on its way. We're committed to your security and satisfaction. The latest security technology protects your personal information, and we offer a hassle-free return policy."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="blling-order-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="billing-section">
                <div className="hero-section">
                  <h3 className="banner-head">{t("Billing Details")}</h3>
                </div>
                <div className="billing-form-box">
                  <form className="billing-form">
                    <div className="container-fluid">
                      <div className="row g-3">
                        <div className="col-lg-6">
                          <InputComponent
                            InnerPlaceholder={t("First Name")}
                            fullWidth
                            label={t("First Name")}
                            name="first_name"
                            formik={formik}
                          />
                        </div>
                        <div className="col-lg-6">
                          <InputComponent
                            InnerPlaceholder={t("Last Name")}
                            fullWidth
                            label={t("Last Name")}
                            name="last_name"
                            formik={formik}
                          />
                        </div>
                        <div className="col-lg-12">
                          <InputComponent
                            InnerPlaceholder={t("Email")}
                            fullWidth
                            label={t("Email")}
                            name="email"
                            formik={formik}
                          />
                        </div>
                        <div className="col-lg-12">
                          <InputComponent
                            InnerPlaceholder={t("Contact No")}
                            fullWidth
                            label={t("Contact No")}
                            name="mobile"
                            formik={formik}
                          />
                        </div>
                        <div className="col-lg-12">
                          <InputComponent
                            InnerPlaceholder={t("Street and House Number")}
                            fullWidth
                            label={t("Street and House Number")}
                            name="house_flat_no"
                            formik={formik}
                          />
                        </div>
                        <div className="col-lg-6">
                          <InputComponent
                            InnerPlaceholder={t("City")}
                            fullWidth
                            label={t("City")}
                            name="city"
                            formik={formik}
                          />
                        </div>
                        <div className="col-lg-12">
                          <InputComponent
                            InnerPlaceholder={t("Country / Region")}
                            fullWidth
                            label={t("Country / Region")}
                            name="country"
                            formik={formik}
                          />
                        </div>
                        <div className="col-lg-12">
                          <InputComponent
                            InnerPlaceholder={t("Postal Code")}
                            fullWidth
                            label={t("Postal Code")}
                            name="pincode"
                            formik={formik}
                          />
                        </div>
                        <div className="col-lg-12">
                          <InputComponent
                            InnerPlaceholder={t("Write Instructions")}
                            fullWidth
                            label={t("Special Instructions for Seller")}
                            type="textarea"
                            height="100px"
                            className="summary-input"
                            name="instructions"
                            formik={formik}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="order-section">
                <div className="hero-section">
                  <h3 className="banner-head">{t("Your Order")}</h3>
                </div>
                <div className="order-detail-box">
                  {cartList &&
                    size(get(cartList, "cart_products")) > 0 &&
                    get(cartList, "cart_products").map((item, index) => {
                      let jsonData = get(
                        item,
                        "associate_product.image_json.imageObj",
                        ""
                      )
                        ? JSON.parse(
                            get(
                              item,
                              "associate_product.image_json.imageObj",
                              ""
                            )
                          )
                        : null;
                      return (
                        <div className="product-item-box" key={index}>
                          <div className="product-item-flexbox">
                            <div className="product-info-flexbox">
                              <div className="product-img-box">
                                <PreviewJsonImage
                                  previewImageUrl={getImageUrlById(
                                    get(item, "product_variant.image_id")
                                  )}
                                  json={jsonData}
                                  maxHeight="80px"
                                  productData={get(
                                    item,
                                    "associate_product",
                                    null
                                  )}
                                />
                                <p className="product-quantity">
                                  {get(item, "quantity")}
                                </p>
                              </div>
                              <div className="product-description">
                                <h6 className="product-name">
                                  {get(item, "associate_product.name")}
                                </h6>
                                <p>
                                  <b>{t("Price")}:</b>{" "}
                                  {get(item, "associate_product.price")} RSD
                                </p>
                                <p>
                                  <b>{t("Size")}:</b>{" "}
                                  {get(item, "product_sub_variant.value")}
                                </p>
                              </div>
                            </div>
                            <div className="item-total-box">
                              <h5 className="item-total">
                                {Number(
                                  get(item, "quantity") *
                                    Number(get(item, "associate_product.price"))
                                )}{" "}
                                RSD
                              </h5>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                <div className="order-total-box">
                  <div className="checkout-total-table">
                    <table className="table table-responsive  ">
                      <tbody>
                        <tr>
                          <th>{t("Subtotal")}</th>
                          <td>{cartTotal} RSD</td>
                        </tr>
                        <tr>
                          <th>{t("Total")}</th>
                          <td>{cartTotal} RSD</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="checkout-btn-box">
                    <ButtonComponent
                      text={t("Place Order")}
                      variant="contained"
                      className="checkout-btn"
                      maxHeight="50px"
                      onClick={() => {
                        formik.handleSubmit();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
