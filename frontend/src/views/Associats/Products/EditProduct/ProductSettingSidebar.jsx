import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";

import { ColorBox, ProductSettingSidebarContainer } from "./styled";
import { Divider } from "@mui/material";
import { Col, Row } from "react-bootstrap";

import ButtonComponent from "../../../../components/ButtonComponent";
import InputComponent from "../../../../components/InputComponent";
import SelectComponent from "../../../../components/SelectComponent";
import NumericComponent from "../../../../components/NumericComponent";

const ProductSettingSidebar = ({
  handleAddDesign,
  formik,
  product,
  loading,
  selectImage,
  setShowFrame,
  setProductPrice,
  handleHighlight,
  highlighted,
}) => {
  const [priceProduct, setPriceProduct] = useState(null);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const onColorChange = (data) => {
    if (formik.values.selectedColorIds.includes(data.id)) {
      const filtered = formik.values.selectedColorIds.filter(
        (item) => item !== data.id
      );

      formik.setFieldValue("selectedColorIds", filtered);
    } else {
      formik.setFieldValue("selectedColorIds", [
        ...formik.values.selectedColorIds,
        data.id,
      ]);
    }
  };

  const renderColorList = () => {
    const colors =
      product &&
      product.product_variants?.map((item) => {
        return {
          title: item.color?.name,
          id: item.color_id,
        };
      });

    return (
      (colors &&
        colors.filter((color) =>
          formik.values.selectedColorIds.includes(color.id)
        )) ||
      []
    );
  };

  useEffect(() => {
    setPriceProduct(
      parseInt(get(product, "productPrice") || parseInt(get(product, "price")))
    );
  }, [product]);

  useEffect(() => {
    setProductPrice(priceProduct);
  }, [priceProduct]);

  return (
    <ProductSettingSidebarContainer>
      <div className="title">{t("Product Settings")}</div>
      <Divider />
      <div className="tab-list">
        <ButtonComponent
          text={t("Add Design")}
          variant="outlined"
          width="100%"
          onClick={handleAddDesign}
          fontSize="12px"
        />
        {new URLSearchParams(window.location.search).get("edit") && (
          <ButtonComponent
            text={t("Highlight Product")}
            variant={`${highlighted ? "contained" : "outlined"}`}
            width="100%"
            onClick={handleHighlight}
            fontSize="12px"
          />
        )}
      </div>
      <Divider />
      <form className="info-form">
        <InputComponent
          InnerPlaceholder="Enter Name of the Product"
          fullWidth
          label={t("Name of the Product")}
          name="productName"
          formik={formik}
        />
        <InputComponent
          InnerPlaceholder="Enter Description of the Product"
          fullWidth
          label={t("Description of the Product")}
          type="textarea"
          height="100px"
          className="mt-3"
          name="productDescription"
          formik={formik}
        />

        <label className="mt-3">{t("Choose Colors")}</label>
        <Row className="color-row">
          {product &&
            product.product_variants &&
            product.product_variants.map((item, i) => (
              <Col
                md={2}
                lg={2}
                sm={4}
                key={`color-${i}`}
                className="color-col"
              >
                {item.color && (
                  <ColorBox
                    onClick={() =>
                      onColorChange({
                        id: item.color_id,
                      })
                    }
                    color={item.color?.code}
                    className={
                      formik.values.selectedColorIds.find(
                        (color) => color === item.color_id
                      ) && "active"
                    }
                  >
                    <div className="dot"></div>
                  </ColorBox>
                )}
              </Col>
            ))}
        </Row>
        {formik.errors.selectedColorIds && (
          <div className="error-msg">{formik.errors.selectedColorIds}</div>
        )}
        <label className="mt-3">{t("Select Product Cover Image Color")}</label>
        <SelectComponent
          optionList={renderColorList()}
          formik={formik}
          name="coverImageColor"
          width="100%"
          size="small"
        />
        {formik.errors.coverImageColor && (
          <div className="error-msg">{formik.errors.coverImageColor}</div>
        )}
        <Row>
          <Col className={"price-wrapper"}>
            <label className="mt-3">{t("Selling Price")}</label>
            <NumericComponent
              helperText={`${t("Selling Price")} (RSD)`}
              InnerPlaceholder={`${t("Selling Price")} (RSD)`}
              fullWidth
              isUseCustomValue={true}
              onChange={(e) => setPriceProduct(parseInt(e.target.value))}
              value={priceProduct}
              min={parseInt(get(product, "price"))}
              name="productPrice"
            />
          </Col>
          <Col className={"price-wrapper"}>
            <label className="mt-3">{t("Base Price")}</label>
            <NumericComponent
              helperText={`${t("Base Price")} (RSD)`}
              InnerPlaceholder={`${t("Base Price")} (RSD)`}
              fullWidth
              value={parseInt(get(product, "price"))}
              disabled
            />
          </Col>
          <Col className={"price-wrapper"}>
            <label className="mt-3">{t("Earning")}</label>
            <NumericComponent
              helperText={`${t("Earning")} (RSD)`}
              InnerPlaceholder={`${t("Earning")} (RSD)`}
              fullWidth
              name="associateProfit"
              value={priceProduct - parseInt(get(product, "price"))}
              disabled
            />
          </Col>
        </Row>
        <div className="fix-footer">
          <ButtonComponent
            text={t("Cancel")}
            variant="contained"
            width="50%"
            loading={loading}
            onClick={() => navigate(-1)}
          />
          <ButtonComponent
            onClick={() => {
              selectImage(null);
              setShowFrame(false);
              setTimeout(() => {
                formik.handleSubmit();
              }, 100);
            }}
            text={
              new URLSearchParams(window.location.search).get("edit")
                ? t("Edit Product")
                : t("Add Product")
            }
            variant="contained"
            width="50%"
            loading={loading}
          />
        </div>
      </form>
    </ProductSettingSidebarContainer>
  );
};

export default ProductSettingSidebar;
