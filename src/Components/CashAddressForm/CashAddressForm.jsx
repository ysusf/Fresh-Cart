import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import AddressCheckoutForm from "./../AddressCheckoutForm/AddressCheckoutForm";
import { useNavigate } from "react-router-dom";

export default function CashAddressForm() {
  const { payByCash } = useContext(CartContext);

  const navigate = useNavigate();

  async function cashPayment(id, values) {
    await payByCash(id, values);
    navigate("/allorders");
  }
  return (
    <>
      <Helmet>
        <title>Cash Address Form</title>
        <meta name="description" content="Cash Address Form Page" />
      </Helmet>
      <AddressCheckoutForm submitFn={cashPayment} btnTxt="Pay By Cash" />
    </>
  );
}
