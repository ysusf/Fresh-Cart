import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ForgetPass() {
  let [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  let navigate = useNavigate();
  let validationSchema = Yup.object({
    email: Yup.string().email("email is invalid").required("email is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: submitForgetPass,
  });

  async function submitForgetPass(values) {
    setLoading(true);

    let { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .catch((err) => {
        setLoading(false);

        setError(err.response.data.message);
      });
    navigate("/resetCode");
  }
  return (
    <main className="my-5 mx-auto w-75">
      <Helmet>
        <title>Forget Password</title>
        <meta name="description" content="Forget Password Page" />
      </Helmet>
      {error ? (
        <div className="alert alert-danger px-2 py-1 text-center">{error}</div>
      ) : (
        ""
      )}

      <h1 className="h4 text-main text-center fw-bold">Forget Password</h1>
      <form method="post" onSubmit={formik.handleSubmit}>
        <label htmlFor="email" className="fw-semibold">
          Email:
        </label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          id="email"
          className="form-control my-3"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email ? (
          <div className="alert alert-danger px-2 py-1">
            {formik.errors.email}
          </div>
        ) : (
          ""
        )}
        {isLoading ? (
          <button
            type="button"
            className="bg-main text-light btn px-3 rounded-1"
            disabled
          >
            <i className="fa fa-spinner fa-spin"></i>
          </button>
        ) : (
          <button type="submit" className="btn bg-main text-light">
            Submit
          </button>
        )}
      </form>
    </main>
  );
}
