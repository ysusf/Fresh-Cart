import React from "react";
import { Helmet } from "react-helmet";
import { Outlet, Link } from "react-router-dom";

export default function AddAddress() {
  return (
    <>
      <Helmet>
        <title>Add Checkout Address</title>
        <meta name="description" content="Checkout Address Page" />
      </Helmet>
      <h1 className="mt-5 mb-3 h4 fw-bold">Pay your order to get it ready!</h1>
      <div className="w-75 mx-auto mb-4 pt-5">
        <ul className="list-unstyled d-flex justify-content-center align-items-center gap-2 flex-wrap">
          <li>
            <Link
              to="payCash"
              className="px-3 py-2 btn bg-main text-light fw-bold rounded-2"
            >
              Pay By Cash
            </Link>
          </li>
          <li>
            <Link
              to="payOnline"
              className="px-3 btn py-2 bg-main text-light fw-bold rounded-2"
            >
              Pay Online
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}
