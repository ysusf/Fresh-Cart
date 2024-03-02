import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  async function userRegister(values) {
    setLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });

    if (data.message === "success") {
      setLoading(false);
      navigate("/login");
    }
  }

  let passRegex = /^[\w\.-]{6,}$/gm;
  let phoneRegex = /^(\+2){0,1}(01)[0125][0-9]{8}$/gm;

  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name min length is 3")
      .max(10, "name max length is 10")
      .required("name is required"),
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string()
      .matches(
        passRegex,
        "password can have numbers, letters, _, ., -, and its min length is 6 characters"
      )
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "repassword does not match with password")
      .required("repassword is required"),
    phone: Yup.string()
      .matches(phoneRegex, "phone number is invalid")
      .required("phone is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: userRegister,
  });

  return (
    <main className="w-75 mx-auto my-5">
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register Page" />
      </Helmet>
      {error !== null ? (
        <div className="alert alert-danger my-2 px-2 py-1 text-center">
          {error}
        </div>
      ) : (
        ""
      )}
      <h1 className="h4 fw-semibold mb-1 p-0">Register Now:</h1>
      <form method="post" className="mt-4" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="fw-medium mb-1">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger my-2 px-2 py-1">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="fw-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger my-2 px-2 py-1">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="fw-medium mb-1">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger my-2 px-2 py-1">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="rePassword" className="fw-medium mb-1">
            Re-Password:
          </label>
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger my-2 px-2 py-1">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="fw-medium mb-1">
            Phone:
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger my-2 px-2 py-1">
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          {isLoading ? (
            <button
              type="button"
              className="bg-main text-light btn px-3 rounded-1"
              disabled
            >
              <i className="fa fa-spinner fa-spin"></i>
            </button>
          ) : (
            <div>
              <button
                type="submit"
                className="bg-main text-light btn px-3 rounded-1"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Submit
              </button>
              <Link
                className="cursor-pointer d-inline-block ms-3 text-primary fw-semibold text-decoration-underline"
                to="/login"
              >
                Already have an Account?
              </Link>
            </div>
          )}
        </div>
      </form>
    </main>
  );
}
