import jwtDecode from "jwt-decode";
import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { OrdersContext } from "./../../Context/OrdersContext";
import { InfinitySpin } from "react-loader-spinner";

export default function UserInfo() {
  const { id, name } = jwtDecode(localStorage.getItem("token"));
  const { getCheckoutOrders, ordersDetails } = useContext(OrdersContext);

  useEffect(() => {
    getCheckoutOrders(id);
  }, []);

  return (
    <main>
      <Helmet>
        <title>User Info</title>
        <meta name="description" content="User Info Page" />
      </Helmet>
      {ordersDetails.length !== 0 ? (
        <div className="row g-5 justify-content-between align-items-center">
          <div className="col-md-6">
            <p className="fw-bold fs-5 p-0 m-0">
              Name: <span className="text-main text-capitalize">{name}</span>
            </p>
          </div>
          <div className="col-md-6 ">
            <p className="fw-bold fs-5 p-0 m-0">
              Email:{" "}
              <span className="text-main">{ordersDetails[0].user?.email}</span>
            </p>
          </div>
          <div className="col-md-6">
            <p className="fw-bold fs-5 p-0 m-0">
              Phone Number:{" "}
              <span className="text-main">{ordersDetails[0].user?.phone}</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center overlay">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      )}
    </main>
  );
}
