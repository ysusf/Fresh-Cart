import React from "react";
import { Navigate } from "react-router-dom";

export default function PreventLogin(props) {
  if (localStorage.getItem("token") !== null) {
    return <Navigate to="/" />;
  } else {
    return props.children;
  }
}
