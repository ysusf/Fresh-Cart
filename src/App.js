import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import MasterLayout from "./Components/MasterLayout/MasterLayout";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Brands from "./Components/Brands/Brands";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Cart from "./Components/Cart/Cart";
import NotFound from "./Components/NotFound/NotFound";
import TokenContextProvider from "./Context/TokenContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/productDetails/productDetails";
import ForgetPass from "./Components/ForgetPass/ForgetPass";
import ResetCode from "./Components/ResetCode/ResetCode";
import ResetPass from "./Components/ResetPass/ResetPass";
import PreventLogin from "./Components/PreventLogin/PreventLogin";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Profile from "./Components/Profile/Profile";
import Wishlist from "./Components/Wishlist/Wishlist";
import WishlistContextProvider from "./Context/WishlistContext";
import AddAddress from "./Components/AddAddress/AddAddress";
import UserOrders from "./Components/UserOrders/UserOrders";
import OrdersContextProvider from "./Context/OrdersContext";
import UserInfo from "./Components/UserInfo/UserInfo";
import CashAddressForm from "./Components/CashAddressForm/CashAddressForm";
import OnlineAddressForm from "./Components/OnlineAddressForm/OnlineAddressForm";

let routers = createBrowserRouter([
  {
    path: "",
    element: <MasterLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PreventLogin>
            <Register />
          </PreventLogin>
        ),
      },
      {
        path: "login",
        element: (
          <PreventLogin>
            <Login />
          </PreventLogin>
        ),
      },
      {
        path: "forgetPassword",
        element: (
          <PreventLogin>
            <ForgetPass />
          </PreventLogin>
        ),
      },
      {
        path: "resetCode",
        element: (
          <PreventLogin>
            <ResetCode />
          </PreventLogin>
        ),
      },
      {
        path: "resetPassword",
        element: (
          <PreventLogin>
            <ResetPass />
          </PreventLogin>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "/allorders",
        element: (
          <ProtectedRoute>
            <UserOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "wishlist",
            element: <Wishlist />,
          },

          {
            path: "",
            element: <Wishlist />,
          },
          {
            path: "userDetails",
            element: <UserInfo />,
          },
        ],
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "addAddress",
        element: (
          <ProtectedRoute>
            <AddAddress />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <CashAddressForm />,
          },
          {
            path: "payOnline",
            element: <OnlineAddressForm />,
          },
          {
            path: "payCash",
            element: <CashAddressForm />,
          },
        ],
      },

      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <UserOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "products/productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <TokenContextProvider>
      <CartContextProvider>
        <OrdersContextProvider>
          <WishlistContextProvider>
            <RouterProvider router={routers} />
          </WishlistContextProvider>
        </OrdersContextProvider>
        <Toaster></Toaster>
      </CartContextProvider>
    </TokenContextProvider>
  );
}

export default App;
