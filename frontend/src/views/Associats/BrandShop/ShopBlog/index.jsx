import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { get, map, size } from "lodash";
import {
  ROUTE_ASSOCIATE_BRAND_STORE_BLOGS_ID,
  ROUTE_MAIN_BLOG_SINGLE,
} from "../../../../routes/routes";
import {
  getImageUrlById,
  slugifyString,
} from "../../../../utils/commonFunctions";
import { commonGetQuery } from "../../../../utils/axiosInstance";
import parse from "html-react-parser";

import { Helmet } from "react-helmet";
import { HomeContainer } from "../Home/styled";

import SliderSection from "../Home/SliderSection";

const ShopBlog = ({ storeData }) => {
  const [loading, setLoading] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const [blogSlider, setBlogSlider] = useState([]);

  const navigate = useNavigate();
  const params = useParams();
  const { t } = useTranslation();

  const getBlogList = async () => {
    setLoading(true);

    const response = await commonGetQuery(
      `/associate_blogs/store/${storeData?.id ?? 0}`
    );

    if (response) {
      const { data } = response.data;
      setBlogList(data.sort((a, b) => b.created_at - a.created_at));
      setLoading(false);
    }

    setLoading(false);
  };

  const getBlogSliderList = async () => {
    setLoading(true);
    const response = await commonGetQuery("/blog_page_slider");
    if (response) {
      const { data } = response.data;
      setBlogSlider(data);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    //getBlogSliderList();
    getBlogList();
  }, []);

  return (
    <HomeContainer className="blog-listing-page">
      <Helmet>
        <title>{t("Blogs - HulaHop")}</title>
      </Helmet>

      <div className="blog-listing-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-12">
              <div className="hero-section m-0">
                <h3 className="banner-head mt-4">{t("Latest Posts")}</h3>
              </div>
            </div>
            <div className="blog-page-box-list-container">
              {size(blogList) > 0 &&
                map(blogList, (item, key) => {
                  return (
                    <div
                      key={key}
                      className="blog-card"
                      onClick={() => {
                        get(params, "id", null)
                          ? navigate(
                              ROUTE_ASSOCIATE_BRAND_STORE_BLOGS_ID.replace(
                                ":id",
                                slugifyString(get(params, "id", null))
                              ).replace(":blogId", item.id)
                            )
                          : navigate(
                              ROUTE_MAIN_BLOG_SINGLE.replace(":id", item.id)
                            );
                      }}
                    >
                      <div className="blog-feature-img">
                        <img
                          src={getImageUrlById(get(item, "image_id"))}
                          alt=""
                        />
                      </div>
                      <div className="blog-card-content">
                        <div className="blog-card-description">
                          <h2 className="blog-name">{get(item, "heading")}</h2>
                          <div className="blog-card-footer">
                            {item.store?.name && (
                              <p className="blog-auther-name">{`${item?.store?.name}`}</p>
                            )}
                          </div>
                          <p className="blog-detail">
                            {parse(get(item, "content"))}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </HomeContainer>
  );
};

const mapStateToProps = (state) => ({
  storeData: state.user.storeData,
});

export default connect(mapStateToProps, null)(ShopBlog);
