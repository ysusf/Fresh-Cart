import React, { useContext, useEffect } from "react";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";
import { TokenContext } from "./../../Context/TokenContext";
import { Offline } from "react-detect-offline";

export default function MasterLayout() {
  const { setToken } = useContext(TokenContext);

  useEffect(() => {
    if (
      localStorage.getItem("token") !== null ||
      localStorage.getItem("token") !== "null"
    ) {
      setToken(localStorage.getItem("token"));
    }

    const arrowBtn = document.querySelector(".scrollUp");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        arrowBtn.classList.replace("d-none", "d-block");
      } else {
        arrowBtn.classList.replace("d-block", "d-none");
      }
    });
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container-sm space">
        <Outlet />

        <div
          className=" position-fixed scrollUp d-none px-3 py-2 bg-main rounded-1 cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          <i className="fa-solid fa-arrow-up text-light fw-bold fs-5"></i>
        </div>

        <Offline>
          <div className="text-center network bg-light shadow p-3">
            <i className="fa fa-wifi text-main me-3"></i>
            <span className="text-main fw-semibold fs-5">
              You are offline now, Check your internet connection
            </span>
          </div>
        </Offline>
      </div>
      <Footer />
    </div>
  );
}
