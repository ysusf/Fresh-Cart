import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { wishlistContext } from "../../Context/WishlistContext";
import { InfinitySpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";

export default function Wishlist() {
  const { getLoggedUserWishlist, deleteWishlistItem } =
    useContext(wishlistContext);
  let [isLoading, setLoading] = useState(true);
  let [wishlistDetails, setWishlistDetails] = useState(null);

  async function displayWishlistItems() {
    const response = await getLoggedUserWishlist();
    setLoading(false);
    if (response?.data.status === "success") {
      setWishlistDetails(response?.data);
    }
    return wishlistDetails;
  }

  async function removewishlistItem(id) {
    let response = await deleteWishlistItem(id);
    if (response?.data.status === "success") {
      toast.success("Product removed successfully from your wishlist", {
        duration: 3500,
      });
      displayWishlistItems();
    } else {
      toast.error("error in removing the product from your wishlist", {
        duration: 3500,
      });
    }
  }

  let { addProductToCart } = useContext(CartContext);

  useEffect(() => {
    displayWishlistItems();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center overlay">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : wishlistDetails === null ? (
        <h1 className="h3 fw-bolder my-4">Your Wishlist is empty</h1>
      ) : (
        <>
          <Helmet>
            <title>Wishlist</title>
            <meta name="description" content="Wishlist Page" />
          </Helmet>
          <div className="bg-body-tertiary py-5 px-4 mt-5">
            <h1 className="h3 fw-bolder mb-4">Wishlist</h1>

            <h2 className="h6 fw-bold mt-4">
              Total number of items:{" "}
              <span className="text-main">{wishlistDetails.count}</span>
            </h2>

            {wishlistDetails.data.map((product) => {
              return (
                <div
                  className="row justify-content-between align-items-center g-4 py-3 border-bottom border-1 border-dark border-opacity-25"
                  key={product._id}
                >
                  <div className="col-md-4 col-lg-3">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-100"
                      height={300}
                    />
                  </div>
                  <div className="col-md-8 col-lg-9">
                    <div className="row flex-column flex-lg-row justify-content-between ">
                      <div className="col-lg-6">
                        <h3 className="h5 fw-bolder mb-3">
                          {product.title.split(" ").splice(0, 3).join(" ")}
                        </h3>

                        <span className="fw-bold me-3">
                          <span className=" text-main ">Price: </span>
                          {product.price} EGP
                        </span>
                        <span className=" d-inline-block">
                          <i className="fa-solid fa-star rating-color me-2"></i>
                          {product.ratingsAverage}
                        </span>
                      </div>
                      <div className="col-lg-6 text-lg-end mt-3 mt-lg-0">
                        <div className="row align-items-stretch">
                          <div className="col-lg-6">
                            <button
                              className="btn btn-outline-danger me-lg-3 mb-2 d-block w-100 h-100"
                              onClick={() => {
                                removewishlistItem(product._id);
                              }}
                            >
                              <i className="fa-solid fa-trash me-2"></i> Remove
                            </button>
                          </div>
                          <div className="col-lg-6">
                            {" "}
                            <button
                              className="btn border-main countBtn d-block w-100 h-100"
                              onClick={async () => {
                                await addProductToCart(product._id);
                                removewishlistItem(product._id);
                              }}
                            >
                              {" "}
                              <i className="fa-solid fa-plus me-2"></i>
                              Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
