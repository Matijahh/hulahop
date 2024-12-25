import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { get, isEmpty, map, size } from "lodash";
import { renderHeader } from "./mock";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { camelCase, getImageUrlById } from "../../../utils/commonFunctions";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../../../utils/constant";
import moment from "moment";

import ProfileComponent from ".";
import Tables from "../../../components/SuperAdmin/Tables";
import PreviewJsonImage from "../../../components/PreviewJsonImage";
import ModalComponent from "../../../components/ModalComponent";

import { FlexBox } from "../../../components/Sections";
import { Helmet } from "react-helmet";
import { LoaderContainer } from "../../../components/Loader";
import { OrdersContainer } from "./styled";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [ordersProductsList, setOrdersProductsList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const { t } = useTranslation();

  const getOrdersProducts = async () => {
    const decoded = jwtDecode(ACCESS_TOKEN);

    setLoading(true);

    const response = await commonGetQuery(
      `/orders/${decoded.type === "ASSOCIATE" && `?associate_id=${decoded.id}`}`
    );

    if (response) {
      const { data } = response.data;
      setOrdersProductsList(data);
      setLoading(false);
    }

    setLoading(false);
  };

  const setTableRenderData = (data) => {
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      id: get(item, "id", ""),
      price: `${get(item, "total_amount", "")} RSD`,
      date: moment(Number(get(item, "created_at", ""))).format("DD/MM/YYYY"),
      sku: get(item, "sku", ""),
      status: t(camelCase(get(item, "status", ""))),
      product_image: get(
        item,
        "order_products.0.associate_product.image_id",
        ""
      ),
      productData: get(item, "order_products.0.associate_product", ""),
      previewImageUrl: getImageUrlById(
        get(item, "order_products.0.product_variant.image_id")
      ),
      json: get(
        item,
        "order_products.0.associate_product.image_json.imageObj",
        ""
      )
        ? JSON.parse(
            get(
              item,
              "order_products.0.associate_product.image_json.imageObj",
              ""
            )
          )
        : null,
      orderDetail: item,
      openModel,
    }));

    return renderData;
  };

  const openModel = (item) => {
    setIsOpen(true);
    setSelectedOrder(item);
  };

  const closeModel = () => {
    setIsOpen(false);
    setSelectedOrder({});
  };

  useEffect(() => {
    getOrdersProducts();
  }, []);

  return (
    <ProfileComponent>
      <Helmet>
        <title>{t("Orders - HulaHop")}</title>
      </Helmet>

      <div className="order-box">
        <FlexBox className="mb-4">
          <div className="hero-section">
            <h3 className="banner-head">{t("Orders")}</h3>
          </div>
        </FlexBox>

        {loading && <LoaderContainer />}

        <OrdersContainer>
          <Tables
            className="orders-table"
            body={
              size(ordersProductsList) > 0
                ? setTableRenderData(ordersProductsList)
                : []
            }
            header={renderHeader.map((item) => ({
              ...item,
              headerName: t(item.headerName),
            }))}
          />
        </OrdersContainer>
      </div>

      <ModalComponent open={isOpen} title={t("Order")} handleClose={closeModel}>
        <div className="order-detail-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h5>{t("Product List")}</h5>
              </div>
              <div className="col-12">
                <div className="row">
                  {!isEmpty(selectedOrder) &&
                    size(get(selectedOrder, "order_products", [])) > 0 &&
                    get(selectedOrder, "order_products", []).map(
                      (item, index) => {
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
                          <div className="col-lg-12" key={index}>
                            <div className="order-detail-box">
                              <div className="row g-3">
                                <div className="col-12">
                                  <h6>
                                    {t("Product")} {index + 1}
                                  </h6>
                                </div>
                                <div className="col-lg-4">
                                  <div className="product-img-box">
                                    <h6>{t("Product Image")}</h6>
                                    <PreviewJsonImage
                                      previewImageUrl={getImageUrlById(
                                        get(item, "product_variant.image_id")
                                      )}
                                      json={jsonData}
                                      maxHeight="200px"
                                      productData={get(
                                        item,
                                        "associate_product"
                                      )}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-8">
                                  <div className="product-info-box">
                                    <div className="row g-3">
                                      <div className="col-6">
                                        <p className="product-cmn-data">
                                          {t("Price")} :
                                        </p>
                                        <p>
                                          {get(
                                            item,
                                            "associate_product.price",
                                            ""
                                          )}{" "}
                                          RSD
                                        </p>
                                      </div>

                                      <div className="col-6">
                                        <p>{t("Quantity")} :</p>
                                        <p>{get(item, "quantity")}</p>
                                      </div>
                                      <div className="col-6">
                                        <p>{t("Selected Color")} :</p>
                                        <p className="color-data">
                                          <span>
                                            {`${get(
                                              item,
                                              "product_variant.color.name"
                                            )} (${get(
                                              item,
                                              "product_variant.color.code"
                                            )})`}
                                          </span>

                                          <span
                                            className="color-circle"
                                            style={{
                                              background: `${get(
                                                item,
                                                "product_variant.color.code"
                                              )}`,
                                            }}
                                          ></span>
                                        </p>
                                      </div>
                                      <div className="col-6">
                                        <p>{t("Varriant Value")}</p>
                                        <p>
                                          {get(
                                            item,
                                            "product_sub_variant.value"
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalComponent>
    </ProfileComponent>
  );
};

export default Orders;
