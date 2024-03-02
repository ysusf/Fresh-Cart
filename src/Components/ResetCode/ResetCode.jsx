import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ResetCode() {
  let [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  let navigate = useNavigate();
  let validationSchema = Yup.object({
    resetCode: Yup.string()
      .matches(/^[0-9]{1,}$/, "Reset Code is invalid")
      .required("Reset Code is required"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: submitResetCode,
  });

  async function submitResetCode(values) {
    setLoading(true);
    let { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });
    navigate("/resetPassword");
  }
  return (
    <main className="my-5 mx-auto w-75">
      <Helmet>
        <title>Reset Code</title>
        <meta name="description" content="Reset Code Pages" />
      </Helmet>
      {error ? (
        <div className="alert alert-danger px-2 py-1 text-center">{error}</div>
      ) : (
        ""
      )}

      <h1 className="h4 text-main text-center fw-bold mb-3">
        Enter Reset Code
      </h1>
      <p className="text-center fs-5 fw-medium">
        We've sent the reset code to your E-mail, please check it and enter the
        code below.
      </p>
      <form method="post" onSubmit={formik.handleSubmit}>
        <label htmlFor="resetCode" className="fw-semibold">
          Reset Code:
        </label>
        <input
          type="text"
          name="resetCode"
          value={formik.values.resetCode}
          id="resetCode"
          className="form-control my-3"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.resetCode ? (
          <div className="alert alert-danger px-2 py-1">
            {formik.errors.resetCode}
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
