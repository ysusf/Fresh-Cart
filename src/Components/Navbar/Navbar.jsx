import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/Imgs/freshcart-logo.svg";
import { TokenContext } from "./../../Context/TokenContext";
import { CartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishlistContext";

export default function Navbar() {
  const { token, setToken } = useContext(TokenContext);

  const { cartCount } = useContext(CartContext);
  const { wishlistCount } = useContext(wishlistContext);

  const navigate = useNavigate();

  function userLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-main-light fixed-top shadow-sm">
        <div className="container-sm">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="freshcart logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {token !== null ? (
                <>
                  <li className="nav-item fw-semibold text-main">
                    <Link
                      className="nav-link active px-2"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item fw-semibold text-main">
                    <Link className="nav-link  px-2" to="/products">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item fw-semibold text-main">
                    <Link className="nav-link  px-2" to="/categories">
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item fw-semibold text-main">
                    <Link className="nav-link  px-2" to="/brands">
                      Brands
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center mx-auto">
              <li className="nav-item d-flex text-dark text-opacity-75 align-items-center column-gap-2 me-lg-3 mb-2 mb-lg-0 fs-5">
                <i className="fa-brands fa-instagram cursor-pointer"></i>
                <i className="fa-brands fa-facebook cursor-pointer"></i>
                <i className="fa-brands fa-tiktok cursor-pointer"></i>
                <i className="fa-brands fa-twitter cursor-pointer"></i>
                <i className="fa-brands fa-linkedin cursor-pointer"></i>
                <i className="fa-brands fa-youtube cursor-pointer"></i>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
              {token !== null ? (
                <>
                  <li className="nav-item me-3">
                    <Link className="nav-link" to="/wishlist">
                      <i className="fa-regular fa-heart text-danger fs-5 position-relative">
                        <span className="position-absolute badge bg-danger">
                          {wishlistCount}
                        </span>
                      </i>{" "}
                    </Link>
                  </li>
                  <li className="nav-item me-5">
                    <Link className="nav-link" to="/cart">
                      <i className="fa-solid fa-cart-shopping fs-5 text-main position-relative">
                        <span className="position-absolute badge bg-danger">
                          {cartCount}
                        </span>
                      </i>{" "}
                    </Link>
                  </li>
                  <li className="nav-item me-0">
                    <Link className="nav-link" to="/profile">
                      <i className="fa-regular fa-circle-user fs-4 text-main"></i>
                    </Link>
                  </li>
                  <li className="nav-item fw-semibold">
                    <span
                      className="nav-link cursor-pointer"
                      onClick={userLogout}
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item fw-semibold">
                    <Link className="nav-link" aria-current="page" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item fw-semibold">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
