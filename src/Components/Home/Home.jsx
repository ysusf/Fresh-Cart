import React from "react";
import CategorySlider from "./../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>FreshCart</title>
        <meta name="description" content="User FreshCart Website" />
      </Helmet>
      <MainSlider />
      <CategorySlider />
      <FeaturedProducts />;
    </>
  );
}
