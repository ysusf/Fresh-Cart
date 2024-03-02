import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { OrdersContext } from "../../Context/OrdersContext";
import { InfinitySpin } from "react-loader-spinner";
import jwtDecode from "jwt-decode";
import { CartContext } from "../../Context/CartContext";

export default function UserOrders() {
  let { getCheckoutOrders, lastOrder } = useContext(OrdersContext);
  let { setCartCount } = useContext(CartContext);
  let [isLoading, setLoading] = useState(true);
  const { id } = jwtDecode(localStorage.getItem("token"));

  async function displayUserOrders(userId) {
    let response = await getCheckoutOrders(userId);
    if (response?.status === 200) {
      setLoading(false);
      setCartCount(0);
    }
  }

  useEffect(() => {
    displayUserOrders(id);
  }, []);

  return (
    <>
      <Helmet>
        <title>Orders</title>
        <meta name="description" content="User Orders Page" />
      </Helmet>
      {isLoading ? (
        <div className="position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center overlay">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : lastOrder?.length !== 0 && lastOrder?.cartItems.length !== 0 ? (
        <>
          <h1 className="h4 fw-bolder mt-5 mb-3">Your Last Order</h1>
          <h2 className="h5">
            <span className="fw-bold text-main">Total Price:</span>{" "}
            {lastOrder?.totalOrderPrice} EGP
          </h2>
          <div className="row g-4 mt-3">
            {lastOrder?.cartItems.map((product) => {
              return (
                <div className="col-md-6" key={product._id}>
                  <div className=" shadow p-2">
                    <div className="row align-items-center">
                      <div className="col-4">
                        <img
                          src={product.product.imageCover}
                          alt={product.product.title}
                          className="w-100"
                        />
                      </div>
                      <div className="col-8">
                        <h2 className="h6 fw-bold mb-3">
                          {product.product.title
                            .split(" ")
                            .splice(0, 2)
                            .join(" ")}
                        </h2>
                        <div className="row justify-content-between align-items-center g-4">
                          <div className="col-6">
                            {" "}
                            <p className="mb-1 p-0">
                              <span className="text-main fw-bold">Brand:</span>{" "}
                              {product.product.brand.name}
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="mb-1 p-0">
                              {product.product.ratingsAverage}
                              <i className="fa-solid fa-star ms-2 rating-color "></i>
                            </p>
                          </div>
                        </div>

                        <p className="mb-1 p-0">
                          <span className="text-main fw-bold">Category:</span>{" "}
                          {product.product.category.name}
                        </p>

                        <div className="row justify-content-between align-items-center g-4">
                          <div className="col-6">
                            {" "}
                            <p className="mb-1 p-0">
                              <span className="text-main fw-bold">Price:</span>{" "}
                              {product.price} EGP
                            </p>
                          </div>
                          <div className="col-6">
                            {" "}
                            <p className="mb-1 p-0">
                              <span className="text-main fw-bold">
                                Quantity:
                              </span>{" "}
                              {product.count}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="row mt-5">
              <div className="col-lg-6">
                <p className=" text-capitalize">
                  <span className="text-main fw-bold fs-5">
                    Shipping Address:
                  </span>{" "}
                  {`${lastOrder?.shippingAddress.details}, ${lastOrder?.shippingAddress.city}`}
                </p>
              </div>
              <div className="col-lg-6">
                <p className="">
                  <span className="text-main fw-bold fs-5 text-capitalize">
                    payment Method:
                  </span>{" "}
                  {lastOrder?.paymentMethodType.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
