import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { connect } from "react-redux";
import { get, isEmpty, size } from "lodash";
import styled from "styled-components";
import cx from "classnames";
import _get from "lodash/get";
import { slugifyString } from "../../../utils/commonFunctions";
import {
  ROUTE_ASSOCIATE_BRAND_STORE_SHOP,
  ROUTE_MAIN_SHOP,
} from "../../../routes/routes";
import * as Action from "../../../redux/actions";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandLessOutlined } from "@mui/icons-material";
import { Loader } from "../../Loader";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CategorySidebarContainer = styled.div`
  .MuiPaper-root {
    box-shadow: none !important;
    max-width: 100%;
    width: 100%;

    &:before {
      background-color: transparent !important;
    }
  }

  .MuiAccordionSummary-content,
  .Mui-expanded {
    margin: 0px !important;
    min-height: auto !important;
  }

  .MuiButtonBase-root {
    padding: 0 !important;
    min-height: auto !important;
  }

  .MuiAccordionDetails-root {
    padding: 0 !important;
  }

  .category-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    color: #9e9e9e;
    padding-bottom: 10px;
    width: 100%;

    &.active {
      color: rgba(241, 103, 109, 1);

      .category-item-numb {
        background-color: rgba(241, 103, 109, 1);
        color: #fff;
      }
    }

    .category-item-right {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .category-item-numb {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #7e7e7e;
        margin-right: 10px;
        display: none;
      }
    }

    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
  }
  .sub-category-item {
    font-size: 18px;
    color: #7e7e7e;
    padding-bottom: 10px;
    width: 100%;
    margin-left: 20px;
    cursor: pointer;

    &.active {
      color: rgba(241, 103, 109, 1);
    }

    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

const CategorySidebarUser = ({
  className,
  isAssociateProduct,
  shopCategoryDataList,
  saveShopCategoryList,
  mainLoading,
  setMainLoading,
  storeData,
}) => {
  const [selectedId, setSelectedId] = useState("all");
  const [subSelectedId, setSubSelectedId] = useState();
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const navigation = useNavigate();
  const params = useParams();
  const { t } = useTranslation();

  const queryParams = new URLSearchParams(location.search);

  const getAllCategory = async () => {
    setCategoryLoading(true);
    setMainLoading(true);

    const response = storeData?.user_id
      ? await commonGetQuery(`/categories/?user_id=${storeData?.user_id}`)
      : await commonGetQuery("/categories");

    setCategoryLoading(false);

    if (response) {
      const { data } = response.data;
      setCategories([
        {
          id: "all",
          name: "All",
        },
        ...data,
      ]);
      saveShopCategoryList(data);
      setMainLoading(false);
    } else {
      setMainLoading(false);
    }
  };

  const toggle = (id, subId) => {
    setSelectedId(id);
    setSubSelectedId(subId);

    let url;

    if (isAssociateProduct) {
      url =
        ROUTE_ASSOCIATE_BRAND_STORE_SHOP.replace(
          ":id",
          slugifyString(_get(params, "id"))
        ) + `?categoryId=${id || 0}&sub_categoryId=${subId || 0}`;
    } else {
      url =
        ROUTE_MAIN_SHOP + `?categoryId=${id || 0}&sub_categoryId=${subId || 0}`;
    }

    navigation(url);
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    let category = queryParams.get("categoryId");
    let subCategory = queryParams.get("sub_categoryId");

    setSelectedId(category === "all" ? category : parseFloat(category));
    setSubSelectedId(parseFloat(subCategory));
  }, [queryParams]);

  return (
    <CategorySidebarContainer>
      {categoryLoading ? (
        <Loader />
      ) : (
        <>
          {categories.map((item, i) => (
            <Accordion
              disabled={mainLoading || categoryLoading}
              key={i}
              expanded={item.id === selectedId}
              onClick={() => toggle(item.id)}
              className={className}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div
                  className={`category-item ${
                    item.id === selectedId && "active"
                  }`}
                >
                  <div className={`category-item-title `}>{t(item.name)}</div>
                  {item.sub_categories && (
                    <div
                      className={`category-item-right ${
                        item.id === selectedId && "active"
                      }`}
                    >
                      <div className="category-item-numb">
                        {item.sub_categories.length}
                      </div>
                      {item.id === selectedId ? (
                        <ExpandLessOutlined />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </div>
                  )}
                </div>
              </AccordionSummary>
              {item.sub_categories &&
                item.sub_categories.map((subItem, i) => (
                  <AccordionDetails key={`demo-${i}`}>
                    <div
                      className={cx(
                        "sub-category-item",
                        subItem.id === subSelectedId && "active"
                      )}
                      onClick={
                        categoryLoading || mainLoading
                          ? () => {}
                          : (e) => {
                              e.stopPropagation();
                              toggle(item.id, subItem.id);
                            }
                      }
                    >
                      {t(subItem.name)}
                    </div>
                  </AccordionDetails>
                ))}
            </Accordion>
          ))}
        </>
      )}
    </CategorySidebarContainer>
  );
};

const mapStateToProps = (state) => ({
  shopCategoryDataList: state.user.shopCategoryDataList,
});

const mapDispatchToProps = {
  saveShopCategoryList: (data) => Action.saveShopCategoryList(data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySidebarUser);
