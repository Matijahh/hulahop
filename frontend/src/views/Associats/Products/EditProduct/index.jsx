import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../../utils/axiosInstance";
import { REST_URL_SERVER } from "../../../../utils/constant";
import { ROUTE_ASSOCIATE_MAIN_PRODUCTS } from "../../../../routes/routes";
import { size } from "lodash";
import * as Yup from "yup";

import { Col, Row } from "react-bootstrap";
import { CommonWhiteBackground } from "../../../../components/Sections";
import { ColorBarList, EditProductContainer } from "./styled";
import { Loader } from "../../../../components/Loader";
import { SuccessTaster } from "../../../../components/Toast";
import { Helmet } from "react-helmet";

import ProductSettingSidebar from "./ProductSettingSidebar";
import ImageLibrary from "../../ImageLibrary";
import NewImageEditor from "./NewImageEditer";

const EditProduct = () => {
  const [isOpenImageLibrary, setIsOpenImageLibrary] = useState();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState({});
  const [formLoading, setFormLoading] = useState(false);
  const [selectedId, selectImage] = useState(null);
  const [showFrame, setShowFrame] = useState(true);
  const [activeProductId, setActiveProductId] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [highlighted, setHighlighted] = useState(false);

  const { productId } = useParams();
  const generatedImageRef = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const hasColors =
    size(product?.product_variants || []) > 0 &&
    product?.product_variants.some((item) => item.color);

  const validation = Yup.object().shape({
    productName: Yup.string().required(t("Product name is required!")),
    productDescription: Yup.string().required(
      t("Product description is required!")
    ),
    selectedColorIds: hasColors
      ? Yup.array()
          .required(t("Color is required!"))
          .min(1, t("Color is required!"))
      : Yup.array(),
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      productDescription: "",
      selectedColorIds: [],
      coverImageColor: null,
      productPrice: "",
      associateProfit: "",
      customizedJson: "",
    },
    validationSchema: validation,
    onSubmit: async () => {
      if (generatedImageRef.current) {
        generatedImageRef.current.click();
      }
    },
  });

  const handleHighlight = () => {
    setHighlighted(!highlighted);
  };

  const handleSubmit = async (base64) => {
    selectImage(null);

    const values = formik?.values;

    const reqBody = {
      product_id: parseInt(productId),
      name: values.productName,
      description: values.productDescription,
      cover_image_color_id: hasColors
        ? parseInt(values.coverImageColor.split(",")[0])
        : null,
      image_json: {
        imageObj: values.customizedJson?.imageObj,
      },
      selected_colors: hasColors ? values.selectedColorIds : null,
      price: productPrice,
      base64: base64,
    };

    const data = new URLSearchParams(window.location.search);

    const pId = data.get("edit");

    setFormLoading(true);

    const response = await commonAddUpdateQuery(
      pId ? `/associate_products/${pId}` : "/associate_products",
      reqBody,
      pId ? "PATCH" : "POST"
    );

    setFormLoading(false);

    if (response) {
      const { message } = response.data;
      if (pId) {
        await commonAddUpdateQuery(
          `/associate_products/associate_highlighted/${pId}`,
          { associate_highlighted: highlighted },
          "PATCH"
        );
      }
      localStorage.removeItem("canvasState");
      navigate(ROUTE_ASSOCIATE_MAIN_PRODUCTS);
      SuccessTaster(t(message));
    }
  };

  const handleToggle = () => {
    setIsOpenImageLibrary(!isOpenImageLibrary);
  };

  const getProductData = async () => {
    setLoading(true);

    const response = await commonGetQuery(`/products/${productId}`);

    setLoading(false);

    if (response) {
      const { data } = response.data;
      setActiveProductId(data?.image_id);
      setProduct(data);
    }
  };

  const onPickImage = (url) => {
    const copyUrl = url;
    setSelectedImage(url !== selectedImage && copyUrl);
    handleToggle();
  };

  const editedProductData = async (id) => {
    const response = await commonGetQuery(`/associate_products/${id}`);

    if (response) {
      const { data } = response.data;

      if (data?.associate_highlighted) {
        setHighlighted(data?.associate_highlighted);
      }

      formik.setValues({
        ...formik.values,
        productName: data?.name,
        productDescription: data?.description,
        selectedColorIds: data.associate_product_colors.map(
          (item) => item.color_id
        ),
        coverImageColor: `${data?.cover_image_color?.id},${data?.cover_image_color?.name}`,
        productPrice: data?.price,
        associateProfit: "",
        customizedJson: data?.image_json,
      });

      setActiveProductId(data?.product?.image_id);
      setProduct({ ...data.product, productPrice: data.price });
    }
  };

  useEffect(() => {
    const data = new URLSearchParams(window.location.search);
    const pId = data.get("edit");

    if (pId) {
      editedProductData(pId);
    } else {
      getProductData();
    }
  }, []);

  return (
    <EditProductContainer>
      <Helmet>
        <title>{t("Edit Products - Associate")}</title>
      </Helmet>

      <CommonWhiteBackground padding="0px">
        {loading ? (
          <Loader height="200px" />
        ) : (
          <>
            <Row>
              <Col md={8} lg={8} sm={6} className="left-col">
                <div className="main-title">
                  {new URLSearchParams(window.location.search).get("edit")
                    ? t("Edit Product")
                    : t("Add Product")}
                </div>
                <NewImageEditor
                  imgURL={`${REST_URL_SERVER}/images/${activeProductId}`}
                  pickImageUrl={selectedImage}
                  productData={product}
                  formik={formik}
                  selectedId={selectedId}
                  selectImage={selectImage}
                  imageRef={generatedImageRef}
                  handleSubmit={handleSubmit}
                  setShowFrame={setShowFrame}
                  showFrame={showFrame}
                />

                <ColorBarList>
                  {product?.product_variants?.length > 0 &&
                    product?.product_variants?.map((item, key) => {
                      return (
                        <div
                          key={key}
                          onClick={() => setActiveProductId(item?.image_id)}
                          className={`color-item ${
                            item?.image_id === activeProductId && "active"
                          }`}
                          style={{
                            background: item?.color?.code,
                          }}
                        ></div>
                      );
                    })}
                </ColorBarList>
              </Col>
              <Col md={4} lg={4} sm={6}>
                <ProductSettingSidebar
                  formik={formik}
                  handleAddDesign={handleToggle}
                  product={product}
                  loading={formLoading}
                  selectImage={selectImage}
                  setShowFrame={setShowFrame}
                  setProductPrice={setProductPrice}
                  handleHighlight={handleHighlight}
                  highlighted={highlighted}
                />
              </Col>
            </Row>
          </>
        )}
      </CommonWhiteBackground>
      <ImageLibrary
        handleClose={handleToggle}
        onPickImage={onPickImage}
        open={isOpenImageLibrary}
      />
    </EditProductContainer>
  );
};

export default EditProduct;
