import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "./../../Context/CartContext";
import toast from "react-hot-toast";
import { wishlistContext } from "../../Context/WishlistContext";

export default function FeaturedProducts() {
  let { addProductToCart } = useContext(CartContext);
  const {
    addProductToWishlist,
    wishlistItem,
    deleteWishlistItem,
    getLoggedUserWishlist,
  } = useContext(wishlistContext);

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

  let [page, setPage] = useState(1);
  function getProducts(pageNum = 1) {
    let response = axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}`
    );
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return response;
  }

  let { data, isLoading, isPreviousData } = useQuery({
    queryKey: ["/products", page],
    queryFn: () => getProducts(page),
    keepPreviousData: true,
  });

  useEffect(() => {
    getLoggedUserWishlist();
  });

  return (
    <>
      {isLoading ? (
        <div className="position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center overlay">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : (
        <main className="main my-5">
          <h1 className="h5 fw-bold">Get Your Favourite Products</h1>
          <div className="row g-4 my-2">
            {data?.data.data.map((product) => {
              return (
                <div className="col-md-4 col-lg-3" key={product.id}>
                  <div className="rounded-2 prCard shadow overflow-hidden position-relative">
                    <i
                      className={`fa-${
                        wishlistItem.includes(product.id) ? "solid" : "regular"
                      } text-danger fa-heart opacity-75 cursor-pointer p-3 fs-3 position-absolute heartIcon`}
                      onClick={() => {
                        if (!wishlistItem.includes(product.id)) {
                          addToWishlist(product.id);
                        } else {
                          removewishlistItem(product.id);
                        }
                      }}
                    ></i>
                    <Link to={`productDetails/${product.id}`}>
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-100"
                      />
                      <span className="text-main px-3">
                        {product.category.name}
                      </span>
                      <h2 className="text-muted h5 fw-semibold px-3 cursor-pointer">
                        {product.title.split(" ").splice(0, 2).join(" ")}
                      </h2>
                      <div className="d-flex justify-content-between align-items-center p-3">
                        <span className="fw-semibold">{product.price} EGP</span>
                        <span className=" d-inline-block">
                          <i className="fa-solid fa-star rating-color me-2"></i>
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </Link>
                    <button
                      className="btn bg-main text-light d-block w-75 mx-auto m-3"
                      onClick={() => {
                        addProductToCart(product.id);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <nav aria-label="Page navigation example" className="my-5">
            <ul className="pagination justify-content-center">
              <li className="page-item ">
                <button
                  className="page-link cursor-pointer text-main fw-semibold"
                  aria-label="Previous"
                  onClick={() => {
                    setPage((old) => Math.max(old - 1, 1));
                  }}
                  disabled={page === 1}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link cursor-pointer text-main fw-semibold"
                  aria-label="Next"
                  onClick={() => {
                    if (!isPreviousData || data.next) {
                      setPage((old) => old + 1);
                    }
                  }}
                  disabled={page === 2}
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </main>
      )}
    </>
  );
}
