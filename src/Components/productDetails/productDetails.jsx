import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishlistContext } from "../../Context/WishlistContext";

export default function ProductDetails() {
  let { addProductToCart } = useContext(CartContext);
  const {
    addProductToWishlist,
    wishlistItem,
    setWishlist,
    deleteWishlistItem,
  } = useContext(wishlistContext);

  async function addToCart(productId) {
    let res = await addProductToCart(productId);
    if (res.data.status === "success") {
      toast.success("Product is added successfully", {
        duration: 3500,
      });
    } else {
      toast.error("error adding product to cart", {
        duration: 3500,
      });
    }
  }

  async function addToWishlist(id) {
    let response = await addProductToWishlist(id);
    if (response.data.status === "success") {
      toast.success("Product added successfully to your wishlist", {
        duration: 3500,
      });
    } else {
      toast.error("error in adding the product to your wishlist", {
        duration: 3500,
      });
    }
  }
  async function removewishlistItem(id) {
    let response = await deleteWishlistItem(id);
    if (response?.data.status === "success") {
      toast.success("Product removed successfully from your wishlist", {
        duration: 3500,
      });
    } else {
      toast.error("error in removing the product from your wishlist", {
        duration: 3500,
      });
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let { id } = useParams();

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  let { data, isLoading } = useQuery("productDetails", getProductDetails);

  return (
    <>
      <Helmet>
        <title>{data?.data.data.title}</title>
        <meta name="description" content={data?.data.data.description} />
      </Helmet>
      {isLoading ? (
        <div className="position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center overlay">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : (
        <>
          <div className="row my-5 align-items-center g-5">
            <div className="col-lg-4">
              <div className="productImg position-relative">
                <Slider {...settings}>
                  {data?.data.data.images.map((img, index) => {
                    return (
                      <img
                        src={img}
                        alt={data?.data.data.title}
                        className="w-100"
                        key={index}
                      />
                    );
                  })}
                </Slider>
                <i
                  className={`fa-${
                    wishlistItem.includes(data?.data.data.id)
                      ? "solid"
                      : "regular"
                  } text-danger fa-heart opacity-75 cursor-pointer py-3 px-4 fs-3 position-absolute heartIcon`}
                  onClick={() => {
                    if (!wishlistItem.includes(data?.data.data.id)) {
                      addToWishlist(data?.data.data.id);
                    } else {
                      removewishlistItem(data?.data.data.id);
                    }
                  }}
                ></i>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="productInfo">
                <h1 className="h4 text-main fw-semibold">
                  {data?.data.data.title}
                </h1>
                <p>{data?.data.data.description}</p>
                <p className="my-1 mx-0">
                  Category:
                  <span className="fw-semibold text-main ms-2">
                    {data?.data.data.category.name}
                  </span>
                </p>
                <p className="m-0">
                  Price:
                  <span className="fw-semibold text-main ms-2">
                    {data?.data.data.price} EGP
                  </span>
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="my-1 mx-0">
                    Ratings Quantity:
                    <span className="fw-semibold text-main ms-2">
                      {data?.data.data.ratingsQuantity}
                    </span>
                  </p>
                  <p className="m-0">
                    <i className="fa-solid fa-star rating-color me-2"></i>

                    <span className="fw-semibold text-main">
                      {data?.data.data.ratingsAverage}
                    </span>
                  </p>
                </div>
                <button
                  className="btn bg-main text-light w-100 my-3 py-1"
                  onClick={() => {
                    addToCart(id);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
