import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext";

export default function AddressCheckoutForm({ submitFn, btnTxt }) {
  const { cartId } = useContext(CartContext);

  async function submitAddress(value) {
    submitFn(cartId, value);
  }

  const validationSchema = Yup.object({
    details: Yup.string().required("Address Details is Required"),
    phone: Yup.string()
      .required("phone is required")
      .matches(
        /^(\+2){0,1}(01)[0125][0-9]{8}$/gm,
        "Enter a valid phone number"
      ),
    city: Yup.string().required("city is required"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: submitAddress,
  });

  return (
    <>
      <Helmet>
        <title>Add Checkout Address</title>
        <meta name="description" content="Checkout Address Page" />
      </Helmet>
      <div className="w-75 mx-auto">
        <form method="post" onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              name="details"
              id="addressDetails"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Address Details"
            />
            {formik.errors.details && formik.touched.details ? (
              <p className="alert alert-danger px-2 py-1 mt-2">
                {formik.errors.details}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              name="phone"
              id="userPhone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Your Phone"
            />
            {formik.errors.phone && formik.touched.phone ? (
              <p className="alert alert-danger px-2 py-1 mt-2">
                {formik.errors.phone}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              name="city"
              id="userCity"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Address City"
            />
            {formik.errors.city && formik.touched.city ? (
              <p className="alert alert-danger px-2 py-1 mt-2">
                {formik.errors.city}
              </p>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            className="btn d-block w-100 border-main countBtn"
          >
            {btnTxt}
          </button>
        </form>
      </div>
    </>
  );
}
