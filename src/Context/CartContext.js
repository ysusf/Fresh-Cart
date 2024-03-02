import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  let [cartCount, setCartCount] = useState(0);
  let [cartId, setCartId] = useState(null);

  function addProductToCart(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then((response) => {
        setCartCount(response.data.numOfCartItems);
        if (response.data.status === "success") {
          toast.success("Product is added successfully", {
            duration: 3500,
          });
        } else {
          toast.error("error adding product to cart", {
            duration: 3500,
          });
        }
        return response;
      })
      .catch((error) => error);
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        setCartCount(response?.data.numOfCartItems);
        setCartId(response?.data.data._id);
        return response;
      })
      .catch((error) => error);
  }

  function deleteCartItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        setCartCount(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => error);
  }

  function updateProductCout(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then((response) => {
        return response;
      })
      .catch((err) => err);
  }

  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        setCartCount(0);
        return response;
      })
      .catch((err) => err);
  }

  function payOnline(cartId, host, values) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${host}`,
        { shippingAddress: values },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then((response) => {
        return response;
      })
      .catch((err) => err);
  }

  function payByCash(id, values) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
        { shippingAddress: values },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then((response) => {
        return response;
      })
      .catch((err) => err);
  }

  useEffect(() => {
    getLoggedUserCart();
  }, [cartId]);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getLoggedUserCart,
        deleteCartItem,
        updateProductCout,
        clearCart,
        cartCount,
        setCartCount,
        payOnline,
        cartId,
        payByCash,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
