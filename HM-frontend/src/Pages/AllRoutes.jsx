import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { CartPage } from "./Cart/CartPage";
import { Favorites } from "./Favourite/Favourite"; // Ensure correct spelling: "Favourite" vs "Favorites"
import { Home } from "./Home/Home";
import { ProductPage } from "./ProductPage/ProductPage";
import { SignUpPage } from "./SignUp/SignUpPage";
import { SingleProductPage } from "./SingleProductPage/SingleProductPage";
import SettingsRoutes from "../Components/Accounts/SettingsRoutes";
import { Checkout } from "../Components/Checkout/Checkout";
import { OrderDetails } from "../Pages/orders/orderDetail";
import SearchResult from "../components/ProductComp/SearchResult"; // Corrected import path

export const AllRoutes = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUpPage />} />
      {/* Product-Related Routes */}
      <Route path="/category/:category" element={<ProductPage />} />
      <Route path="/product/:id" element={<SingleProductPage />} />
      <Route path="/product/:id/:variantCode" element={<SingleProductPage />} />
      <Route
        path="/productdetail/:articleCode"
        element={<SingleProductPage />}
      />
      <Route path="/search" element={<SearchResult />} />{" "}
      {/* Corrected Search Route */}
      {/* User-Related Routes */}
      <Route path="/account/*" element={<SettingsRoutes />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order/:orderId" element={<OrderDetails />} />
      <Route path="/favourite" element={<Favorites />} />{" "}
      {/* Consistent naming */}
      {/* 404 Not Found Route */}
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
