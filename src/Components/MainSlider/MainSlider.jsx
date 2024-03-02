import React from "react";
import Slider from "react-slick";
import img1 from "../../Assets/Imgs/slider-image-1.jpeg";
import img2 from "../../Assets/Imgs/slider-image-2.jpeg";
import img3 from "../../Assets/Imgs/slider-image-3.jpeg";
import img4 from "../../Assets/Imgs/grocery-banner-2.jpeg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="row g-0 my-5">
      <div className="col-lg-8">
        <Slider {...settings}>
          <img src={img3} alt="slider catg" className="w-100" height={420} />
          <img src={img2} alt="slider catg" className="w-100" height={420} />
        </Slider>
      </div>
      <div className="col-lg-4 d-none d-lg-block">
        <img src={img4} alt="product" className="w-100" height={210} />
        <img src={img1} alt="product" className="w-100" height={210} />
      </div>
    </div>
  );
}
