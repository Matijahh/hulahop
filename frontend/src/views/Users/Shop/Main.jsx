import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { size, get } from "lodash";
import { ACCESS_TOKEN } from "../../../utils/constant";

import { Pagination } from "@mui/material";

import Product from "../../../components/Product/Product";
import SelectComponent from "../../../components/SelectComponent";

const Main = (props) => {
  const { setMainLoading, mainLoading } = props;

  const [loading, setLoading] = useState(false);
  const [associateProductsList, setAssociateProductsList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [wishListData, setWishListData] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);

  const params = useParams();
  const { t } = useTranslation();
  const limit = 20;

  const selectItems = [
    {
      title: `${t("Popularity")}`,
      id: "popularity=true",
    },
    {
      title: `${t("Lowest Price")}`,
      id: "price_low_to_high=true",
    },
    {
      title: `${t("Highest Price")}`,
      id: "price_low_to_high=false",
    },
    {
      title: `${t("Oldest Added")}`,
      id: "date_added=true",
    },
    {
      title: `${t("Latest Added")}`,
      id: "date_added=false",
    },
  ];

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

  const getAssociateProducts = async (
    categoryId,
    sub_categoryId,
    limit,
    page,
    sortBy
  ) => {
    setLoading(true);
    setMainLoading(true);

    const sort = sortBy.split(",")[0];

    let url = `associate_products?limit=${limit}&page=${page}&${sort}`;

    if (categoryId && categoryId !== "all") {
      url = `${url}&category_ids=${categoryId}`;

      if (sub_categoryId && sub_categoryId != 0) {
        url = `${url}&sub_category_ids=${sub_categoryId}`;
      }

      if (props.storeData && props.storeData.user_id) {
        url = `${url}&user_id=${props.storeData.user_id}`;
      }
    } else {
      if (sub_categoryId && sub_categoryId != 0) {
        url = `${url}&sub_categoryId=${sub_categoryId}`;

        if (props.storeData && props.storeData.user_id) {
          url = `${url}&user_id=${props.storeData.user_id}`;
        }
      } else if (props.storeData && props.storeData.user_id) {
        url = `${url}&user_id=${props.storeData.user_id}`;
      }
    }

    const response = await commonGetQuery(url);

    if (response) {
      const { data } = response.data;

      setAssociateProductsList(data.data);
      setTotalPages(data.totalPages);
      setLoading(false);
      setMainLoading(false);
    } else {
      setMainLoading(false);
    }

    setLoading(false);
  };

  const checkIsInWishList = (id) => {
    if (wishListData.length > 0) {
      return wishListData.find((item) => item.associate_product_id == id);
    }
  };

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const handleSort = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const categoryId = url.searchParams.get("categoryId");
    const sub_categoryId = url.searchParams.get("sub_categoryId");
    if (sortBy)
      getAssociateProducts(categoryId, sub_categoryId, limit, page, sortBy);

    if (ACCESS_TOKEN) {
      getWishListData();
    }
  }, [params, page, sortBy]);

  useEffect(() => {
    setSortBy(`popularity=true,${t("Popularity")}`);
  }, []);

  return (
    <div className="products-list-container">
      <div className="row g-2">
        <div className="col-md-2 mb-3">
          {selectItems && sortBy && (
            <SelectComponent
              fullWidth
              size="small"
              name="title"
              id="demo-multiple-name-label"
              labelId="demo-multiple-name-label"
              optionList={selectItems}
              label={t("Sort By")}
              value={sortBy}
              onChange={handleSort}
              isShowValue={true}
            />
          )}
        </div>
      </div>
      <div className="row g-3">
        {size(associateProductsList) > 0 ? (
          associateProductsList.map((item, i) => (
            <div className="col-sm-6 col-xl-4 col-xxl-3" key={i}>
              <Product
                mainLoading={mainLoading || loading}
                productData={item}
                isAssociateProduct={props.isAssociateProduct}
                isInWishList={checkIsInWishList(item.id)}
                getWishListData={getWishListData}
              />
            </div>
          ))
        ) : (
          <h5 className="d-flex align-items-center justify-content-center w-100 h-100">
            {t("No Product Found!")}
          </h5>
        )}
        {!loading && (
          <div className="pagination-container">
            <Pagination
              page={page}
              onChange={handlePageChange}
              count={totalPages}
              shape="rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
