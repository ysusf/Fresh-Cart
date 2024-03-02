import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ResetPass() {
  let [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  let navigate = useNavigate();
  let passRegex = /^[\w\.-]{6,}$/gm;

  let validationSchema = Yup.object({
    email: Yup.string().email("email is invalid").required("email is required"),
    newPassword: Yup.string()
      .matches(
        passRegex,
        "New password can have numbers, letters, _, ., -, and its min length is 6 characters"
      )
      .required("New password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: submitForgetPass,
  });

  async function submitForgetPass(values) {
    setLoading(true);

    let { data } = await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .catch((err) => {
        setLoading(false);

        setError(err.response.data.message);
      });
    navigate("/login");
  }
  return (
    <main className="my-5 mx-auto w-75">
      <Helmet>
        <title>Reset Password</title>
        <meta name="description" content="Reset Password Page" />
      </Helmet>
      {error ? (
        <div className="alert alert-danger px-2 py-1 text-center">{error}</div>
      ) : (
        ""
      )}

      <h1 className="h4 text-main text-center fw-bold">New Password</h1>
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
        {formik.errors.email && formik.touched.email ? (
          <div className="alert alert-danger px-2 py-1">
            {formik.errors.email}
          </div>
        ) : (
          ""
        )}
        <label htmlFor="newPassword" className="fw-semibold">
          New Password:
        </label>
        <input
          type="password"
          name="newPassword"
          value={formik.values.newPassword}
          id="newPassword"
          className="form-control my-3"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.newPassword && formik.touched.newPassword ? (
          <div className="alert alert-danger px-2 py-1">
            {formik.errors.newPassword}
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
