import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CreateProductContainer, ProductCardBox } from "./styled";
import {
  ROUTE_ASSOCIATE_EDIT_PRODUCT,
  ROUTE_ASSOCIATE_MAIN_PRODUCTS,
} from "../../../../routes/routes";
import { commonGetQuery } from "../../../../utils/axiosInstance";
import { REST_URL_SERVER } from "../../../../utils/constant";
import { connect } from "react-redux";

import { Col, Row } from "react-bootstrap";
import { CommonWhiteBackground } from "../../../../components/Sections";
import { Loader } from "../../../../components/Loader";
import { Helmet } from "react-helmet";

import CategorySidebar from "../../../../components/SuperAdmin/CategorySidebar";
import ButtonComponent from "../../../../components/ButtonComponent";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const CreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sub_categoryId, categoryId } = useParams();

  const getAllProducts = async () => {
    setLoading(true);

    let URL;

    if (categoryId === "all") {
      URL = `/products`;
    } else if (categoryId && sub_categoryId !== "0") {
      URL = `/products?category_id=${categoryId}&subcategory_id=${parseInt(
        sub_categoryId
      )}`;
    } else if (categoryId) {
      URL = `/products?category_id=${categoryId}`;
    } else if (sub_categoryId !== "0") {
      URL = `/products?subcategory_id=${parseInt(sub_categoryId)}`;
    } else {
      URL = `/products`;
    }

    const response = await commonGetQuery(URL);

    setLoading(false);

    if (response) {
      const { data } = response.data;
      setProducts(data);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [categoryId, sub_categoryId]);

  return (
    <CreateProductContainer>
      <Helmet>
        <title>{t("Create Products - Associate")}</title>
      </Helmet>
      <CommonWhiteBackground>
        <ButtonComponent
          text={t("Back")}
          className="mb-3"
          startIcon={<ArrowBackOutlinedIcon />}
          variant="outlined"
          onClick={() => navigate(ROUTE_ASSOCIATE_MAIN_PRODUCTS)}
        />
        <div className="main-title">{t("Create Product")}</div>
        <Row>
          <Col md={12} lg={3} sm={12} className="mt-4">
            <CategorySidebar />
          </Col>
          <Col md={12} lg={9} sm={12} className="mt-4">
            {loading ? (
              <Loader />
            ) : (
              <Row>
                {products.length > 0 ? (
                  <>
                    {products.map((item, i) => (
                      <Col md={4} lg={4} sm={6} key={i}>
                        <ProductCardBox
                          onClick={() =>
                            navigate(
                              ROUTE_ASSOCIATE_EDIT_PRODUCT.replace(
                                ":productId",
                                item.id
                              )
                            )
                          }
                        >
                          <div className="image-cover">
                            {item.image_id && (
                              <img
                                src={`${REST_URL_SERVER}/images/compressed/${item.image_id}`}
                              />
                            )}
                          </div>
                          <div className="product-data">
                            <div className="product-title">{item?.name}</div>
                            <div className="product-caregory">
                              {item?.sub_category?.name || item?.category?.name}
                            </div>
                          </div>
                        </ProductCardBox>
                      </Col>
                    ))}
                  </>
                ) : (
                  <center>
                    <b>{t("No Data Found!")}</b>
                  </center>
                )}
              </Row>
            )}
          </Col>
        </Row>
      </CommonWhiteBackground>
    </CreateProductContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    shopCategoryDataList: state.user.shopCategoryDataList, // Assuming shopCategoryDataList is a key in your Redux store
  };
};
export default connect(mapStateToProps, null)(CreateProduct);
