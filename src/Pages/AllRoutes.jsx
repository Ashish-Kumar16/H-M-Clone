import { Image, Box, Button } from "@chakra-ui/react";
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CartPage } from "./Cart/CartPage";
import { Favorites } from "./Favourite/Favourite";
import { Home } from "./Home/Home";
import { ProductPage } from "./ProductPage/ProductPage";
import { SignUpPage } from "./SignUp/SignUpPage";
import { SingleProductPage } from "./SingleProductPage/SingleProductPage";

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

      {/* Sign Up Page */}
      <Route path="/signup" element={<SignUpPage />} />

      {/* Product Page by Category */}
      <Route path="/category/:category" element={<ProductPage />} />

      {/* Cart Page */}
      <Route path="/cart" element={<CartPage />} />

      {/* Favourite Products Page */}
      <Route path="/favourite" element={<Favorites />} />

      {/* 404 Error Page */}
      <Route
        path="*"
        element={
          <Box textAlign="center" marginTop="20px">
            <Image
              src="https://cdni.iconscout.com/illustration/premium/thumb/404-page-not-found-4190275-3468592.png"
              alt="404 Not Found"
              margin="auto"
              objectFit="contain"
              marginBottom="20px"
              maxWidth="500px"
            />
            <Button
              mt={4}
              colorScheme="teal"
              size="lg"
              onClick={() => navigate("/")}
            >
              Go to Home
            </Button>
          </Box>
        }
      />
    </Routes>
  );
};
