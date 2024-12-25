import { getImageUrlById } from "../../../../utils/commonFunctions";

import Slider from "react-slick";

import { SliderSectionContainer } from "./styled";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderSection = ({ data }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: 0,
  };

  return (
    <>
      {data && data.store_layout_sliders ? (
        <SliderSectionContainer>
          <Slider {...settings}>
            <div className="home-slide-wrapper">
              <img
                src={getImageUrlById(data.store_layout_sliders[0].image_id)}
                alt=""
              />
              <div className="overlay"></div>
            </div>
          </Slider>
          <div className="content">
            <div className="shop-title">
              {data.store_layout_sliders[0].name}
            </div>
          </div>
        </SliderSectionContainer>
      ) : null}
    </>
  );
};

export default SliderSection;
