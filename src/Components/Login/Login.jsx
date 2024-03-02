import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { TokenContext } from "./../../Context/TokenContext";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";

export default function Login() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  let { setToken } = useContext(TokenContext);
  const { getLoggedUserCart } = useContext(CartContext);

  async function userLogin(values) {
    setLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });

    if (data?.message === "success") {
      localStorage.setItem("token", data.token);
      await setToken(data.token);
      navigate("/");
      await getLoggedUserCart();
    }
  }

  let passRegex = /^[\w\.-]{6,}$/gm;

  let validationSchema = Yup.object({
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string()
      .matches(
        passRegex,
        "password can have numbers, letters, _, ., -, and its min length is 6 characters"
      )
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: userLogin,
  });

  return (
    <main className="w-75 mx-auto my-5">
      <Helmet>
        <title>Log in</title>
        <meta name="description" content="Log in Page" />
      </Helmet>
      {error !== null ? (
        <div className="alert alert-danger my-2 px-2 py-1 text-center">
          {error}
        </div>
      ) : (
        ""
      )}
      <h1 className="h4 fw-semibold mb-1 p-0">Login Now:</h1>
      <form method="post" className="mt-4" onSubmit={formik.handleSubmit}>
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
                className="bg-main d-block text-light btn px-3 rounded-1"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Login
              </button>
              <div className="text-center">
                <Link
                  className="d-inline-block my-3 text-main fw-semibold"
                  to="/register"
                >
                  Create an Account
                </Link>
                <span className="ms-3 fw-semibold">|</span>
                <Link
                  className="d-inline-block ms-3 text-center fw-semibold"
                  to="/forgetPassword"
                >
                  Forget Password?
                </Link>
              </div>
            </div>
          )}
        </div>
      </form>
    </main>
  );
}
