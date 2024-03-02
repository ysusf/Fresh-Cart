import React from "react";
import { Helmet } from "react-helmet";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";

export default function Products() {
  return (
    <>
      <Helmet>
        <title>Products</title>
        <meta name="description" content="User Products Page" />
      </Helmet>
      <FeaturedProducts />
    </>
  );
}
