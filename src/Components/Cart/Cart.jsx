import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import { InfinitySpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  const { getLoggedUserCart, deleteCartItem, updateProductCout, clearCart } =
    useContext(CartContext);

  let [cartDetails, setCartDetails] = useState(null);
  let [isLoading, setLoading] = useState(true);

  async function displayCartItems() {
    const { data } = await getLoggedUserCart();
    setLoading(false);
    if (data?.status === "success") {
      setCartDetails(data);
    }
    return cartDetails;
  }

  async function deleteProduct(id) {
    let { data } = await deleteCartItem(id);

    if (data?.status === "success") {
      setCartDetails(data);
      toast.success("product is removed successfully");
    } else {
      toast.error("error in deleting the product, try again");
    }
  }

  async function updateCount(id, count) {
    let { data } = await updateProductCout(id, count);
    if (data?.status === "success") {
      setCartDetails(data);
      if (count <= 0) {
        deleteProduct(id);
      }
    }
  }

  async function clearCartItems() {
    let { data } = await clearCart();
    if (data?.message === "success") {
      setCartDetails(null);

      toast.success("cart is cleared successfully");
    } else {
      toast.error("error in clearing the cart, try again");
    }
  }

  useEffect(() => {
    displayCartItems();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="Cart Page" />
      </Helmet>
      {isLoading ? (
        <div className="position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center overlay">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : cartDetails === null ? (
        <h1 className="h3 fw-bolder mt-5 mb-3">Cart Shop is empty</h1>
      ) : (
        <>
          <div className="bg-body-tertiary mt-5 py-5 px-4">
            <h1 className="h3 fw-bolder mb-4">Cart Shop</h1>
            <div className="row justify-content-between border-bottom pb-3 border-1 border-dark border-opacity-25">
              <div className="col-6">
                <h2 className="h6 fw-bold">
                  Total Price:{" "}
                  <span className="text-main">
                    {cartDetails.data.totalCartPrice} EGP
                  </span>
                </h2>
                <h2 className="h6 fw-bold mt-4">
                  Total number of items:{" "}
                  <span className="text-main">
                    {cartDetails.numOfCartItems}
                  </span>
                </h2>
              </div>
              <div className="col-6 text-end">
                <Link
                  className="btn text-light bg-main py-2 px-3 py-lg-3 px-lg-4 fw-bold fs-6"
                  to="/addAddress"
                >
                  Checkout
                </Link>
              </div>
            </div>

            {cartDetails.data.products.map((product) => {
              return (
                <div
                  className="row justify-content-between align-items-center g-4 py-4 border-bottom border-1 border-dark border-opacity-25"
                  key={product._id}
                >
                  <div className="col-5 col-md-3">
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className="w-100"
                      height={300}
                    />
                  </div>
                  <div className="col-7 col-md-9 ">
                    <div className="row flex-column flex-lg-row justify-content-between ">
                      <div className="col-lg-6">
                        <h3 className="h6 fw-bolder">
                          {product.product.title
                            .split(" ")
                            .splice(0, 3)
                            .join(" ")}
                        </h3>
                        <p className="fw-bold ">
                          <span className=" text-main ">Price: </span>
                          {product.price} EGP
                        </p>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => {
                            deleteProduct(product.product._id);
                          }}
                        >
                          <i className="fa-solid fa-trash me-2"></i> Remove
                        </button>
                      </div>
                      <div className="col-lg-6 text-lg-end mt-3 mt-lg-0">
                        <button
                          className="me-3 btn border-main fs-5 countBtn"
                          onClick={() => {
                            updateCount(product.product._id, product.count + 1);
                          }}
                        >
                          +
                        </button>
                        <span>{product.count}</span>
                        <button
                          className="ms-3 btn border-main fs-5 countBtn"
                          onClick={() => {
                            updateCount(product.product._id, product.count - 1);
                          }}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <button
              className="btn border-main countBtn my-3 mx-auto d-block fw-bold h5"
              onClick={clearCartItems}
            >
              Clear your Cart
            </button>
          </div>
        </>
      )}
    </>
  );
}
