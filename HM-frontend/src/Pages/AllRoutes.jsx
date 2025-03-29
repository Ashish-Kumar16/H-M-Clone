import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { CartPage } from "./Cart/CartPage"; // Adjust paths as needed
import { Favorites } from "./Favourite/Favourite";
import { Home } from "./Home/Home";
import { ProductPage } from "./ProductPage/ProductPage";
import { SignUpPage } from "./SignUp/SignUpPage";
import { SingleProductPage } from "./SingleProductPage/SingleProductPage";
// import { AccountDetail } from "../Components/AuthModal/AccountDetail"; // Adjust path if needed
import SettingsRoutes from "../Components/Accounts/SettingsRoutes"; // Adjust path if needed
import { Checkout } from "../Components/Checkout/Checkout";
import { OrderDetails } from "../Pages/orders/orderDetail";
// import SearchResult from "../components/ProductComp/searchResult";
export const AllRoutes = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />
      {/* Single Product Page */}
      <Route
        path="/productdetail/:articleCode"
        element={<SingleProductPage />}
      />
      <Route path="/product/:id" element={<SingleProductPage />} />
      <Route path="/product/:id/:variantCode" element={<SingleProductPage />} />
      {/* <Route path="/search" element={<SearchResult />} /> */}
      {/* Sign Up Page */}
      <Route path="/signup" element={<SignUpPage />} />
      {/* Account Detail Page with nested settings routes */}
      <Route path="/account/*" element={<SettingsRoutes />} />
      {/* Product Page by Category */}
      <Route path="/category/:category" element={<ProductPage />} />
      {/* Cart Page */}
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order/:orderId" element={<OrderDetails />} />
      {/* Favourite Products Page */}
      <Route path="/favourite" element={<Favorites />} />
      {/* 404 Error Page */}
      <Route
        path="*"
        element={
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/404-page-not-found-4190275-3468592.png"
              alt="404 Not Found"
              style={{
                margin: "auto",
                objectFit: "contain",
                marginBottom: "20px",
                maxWidth: "500px",
              }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/")}
              sx={{ mt: 2 }}
            >
              Go to Home
            </Button>
          </Box>
        }
      />
    </Routes>
  );
};
