import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = ({
  dots = true,
  arrows = false,
  infinite = true,
  speed = 500,
  autoplay = true,
  slidesToShow = 3,
  slidesToScroll = 1,
  centerMode = false,
  centerPadding,
  children,
}) => {
  const settings_slider = {
    dots: dots,
    arrows: arrows,
    infinite: infinite,
    speed: speed,
    autoplay: autoplay,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    centerMode: centerMode,
    centerPadding: centerPadding,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: slidesToShow > 3 ? 3 : slidesToShow,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShow > 2 ? 2 : slidesToShow,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return <Slider {...settings_slider}>{children}</Slider>;
};

export default SliderComponent;
