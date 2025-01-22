import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { get, map, size } from "lodash";
import { getImageUrlById } from "../../../utils/commonFunctions";
import parse from "html-react-parser";

import { Helmet } from "react-helmet";
import { LoaderContainer } from "../../../components/Loader";

import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import { AboutProductsContainer } from "./styled";

const AboutProducts = () => {
  const [loading, setLoading] = useState(false);
  const [aboutProductsData, setAboutProductsData] = useState();

  const { t } = useTranslation();
  const params = useParams();

  const lang = localStorage.getItem("I18N_LANGUAGE") || "en";

  const getAboutProductsData = async (sub_categoryId) => {
    setLoading(true);

    let url = "about-product-data";

    if (sub_categoryId && sub_categoryId != 0) {
      url = `${url}?subcategory_id=${sub_categoryId}`;
    }

    const response = await commonGetQuery(url);

    if (response) {
      const { data } = response.data;
      setAboutProductsData(data);
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const sub_categoryId = url.searchParams.get("sub_categoryId");
    getAboutProductsData(sub_categoryId);
  }, [params]);

  return (
    <AboutProductsContainer>
      <div className="page-wrapper about-products-page ">
        <Helmet>
          <title>{t("About Products - HulaHop")}</title>
        </Helmet>

        {loading && <LoaderContainer />}

        <div className="banner-slider-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-lg-7">
                <div className="image-hero-section">
                  <img
                    className="main-image"
                    src={getImageUrlById(
                      get(
                        aboutProductsData,
                        "0.about_product_top_bar_image.0.top_bar_images_id"
                      )
                    )}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-lg-5">
                <div className="hero-section">
                  <h3 className="banner-head">
                    {t(get(aboutProductsData, "0.sub_category.name"))}
                  </h3>
                  <div className="paragraph-container">
                    <p>
                      {(get(aboutProductsData, "0.product_description_1_ab") ||
                        get(aboutProductsData, "0.product_description_1")) &&
                        (lang == "sr"
                          ? get(
                              aboutProductsData,
                              "0.product_description_1_ab"
                            ) &&
                            parse(
                              get(
                                aboutProductsData,
                                "0.product_description_1_ab"
                              )
                            )
                          : get(aboutProductsData, "0.product_description_1") &&
                            parse(
                              get(aboutProductsData, "0.product_description_1")
                            ))}
                      {(get(aboutProductsData, "0.product_description_2_sb") ||
                        get(aboutProductsData, "0.product_description_2")) &&
                        (lang == "sr"
                          ? get(
                              aboutProductsData,
                              "0.product_description_2_sb"
                            ) &&
                            parse(
                              get(
                                aboutProductsData,
                                "0.product_description_2_sb"
                              )
                            )
                          : get(aboutProductsData, "0.product_description_2") &&
                            parse(
                              get(aboutProductsData, "0.product_description_2")
                            ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {size(get(aboutProductsData, "0.about_product_size_chart_image")) >
          0 && (
          <div className="product-sizing-section">
            <div className="container">
              <div className="row g-3">
                <div className="col-12">
                  <div className="hero-section">
                    <h3 className="banner-head">{t("Product Size Chart")}</h3>
                  </div>
                </div>
                <div className="col-12">
                  <div className="size-slider">
                    <SliderComponent
                      dots={false}
                      slidesToShow={
                        size(
                          get(
                            aboutProductsData,
                            "0.about_product_size_chart_image"
                          )
                        ) > 4
                          ? 4
                          : size(
                              get(
                                aboutProductsData,
                                "0.about_product_size_chart_image"
                              )
                            )
                      }
                    >
                      {size(
                        get(
                          aboutProductsData,
                          "0.about_product_size_chart_image"
                        )
                      ) > 0 &&
                        map(
                          get(
                            aboutProductsData,
                            "0.about_product_size_chart_image"
                          ),
                          (item) => {
                            return (
                              <div className="size-slide">
                                <div className="size-slide-flexbox">
                                  <div
                                    className="size-image-box"
                                    style={{
                                      backgroundImage: `url(${getImageUrlById(
                                        item.size_chart_image_id
                                      )})`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            );
                          }
                        )}
                    </SliderComponent>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {size(get(aboutProductsData, "0.about_product_top_bar_image")) > 0 && (
          <div className="products-banner-slider">
            <SliderComponent
              dots={false}
              slidesToShow={
                size(get(aboutProductsData, "0.about_product_top_bar_image")) >
                4
                  ? 4
                  : size(
                      get(aboutProductsData, "0.about_product_top_bar_image")
                    )
              }
            >
              {size(get(aboutProductsData, "0.about_product_top_bar_image")) >
                0 &&
                map(
                  get(aboutProductsData, "0.about_product_top_bar_image"),
                  (item) => {
                    return (
                      <div className="products-slide">
                        <div className="products-slide-flexbox">
                          <div
                            className="product-image-box"
                            style={{
                              backgroundImage: `url(${getImageUrlById(
                                item.top_bar_images_id
                              )})`,
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  }
                )}
            </SliderComponent>
          </div>
        )}
        {size(get(aboutProductsData, "0.about_product_bottom_bar_images")) >
          0 && (
          <div className="products-banner-slider">
            <SliderComponent
              dots={false}
              slidesToShow={
                size(
                  get(aboutProductsData, "0.about_product_bottom_bar_images")
                ) > 4
                  ? 4
                  : size(
                      get(
                        aboutProductsData,
                        "0.about_product_bottom_bar_images"
                      )
                    )
              }
            >
              {size(
                get(aboutProductsData, "0.about_product_bottom_bar_images")
              ) > 0 &&
                map(
                  get(aboutProductsData, "0.about_product_bottom_bar_images"),
                  (item) => {
                    return (
                      <div className="products-slide">
                        <div className="products-slide-flexbox">
                          <div
                            className="product-image-box"
                            style={{
                              backgroundImage: `url(${getImageUrlById(
                                item.bottom_bar_images_id
                              )})`,
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  }
                )}
            </SliderComponent>
          </div>
        )}
      </div>
    </AboutProductsContainer>
  );
};

export default AboutProducts;
