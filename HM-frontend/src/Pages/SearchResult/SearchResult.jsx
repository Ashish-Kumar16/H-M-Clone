import React, { useEffect } from "react";
import { Box, Grid, Typography, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchProductsByQuery } from "../../redux/productSlice";
import ProductCard from "../../components/productcomp/productcard/ProductCard";

export const SearchResult = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { products, status, error } = useSelector((state) => state.products);
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      dispatch(searchProductsByQuery(query));
    }
  }, [dispatch, query]);

  const SkeletonLoader = () => (
    <Grid container spacing={2}>
      {[...Array(4)].map((_, index) => (
        <Grid item xs={12} sm={6} lg={3} key={index}>
          <Box sx={{ p: 2 }}>
            <Skeleton variant="rectangular" width="100%" height={400} />
            <Skeleton variant="text" width="60%" sx={{ mt: 1 }} />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="20%" />
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ color: "#333", fontFamily: "sans-serif", padding: 2 }}>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Search results for "{query}"
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            Showing {products.length} products
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 4 }}>
          {/* Sidebar */}
          <Box sx={{ width: "16.67%" }}>
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                p: 0,
                "& li": { mb: 1, fontSize: "0.875rem" },
              }}
            >
              <Typography
                component="li"
                sx={{ fontWeight: 600, color: "#dc2626" }}
              >
                All
              </Typography>
              {["Ladies", "Men", "Baby", "Kids", "Sale"].map((category) => (
                <Typography component="li" key={category}>
                  {category}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Main Content */}
          <Box sx={{ width: "83.33%" }}>
            {status === "loading" && <SkeletonLoader />}
            {status === "failed" && (
              <Typography color="error">{error}</Typography>
            )}
            {status === "succeeded" && products.length === 0 && (
              <Typography>No products found for "{query}"</Typography>
            )}

            {status === "succeeded" && products.length > 0 && (
              <Grid container spacing={2}>
                {products.map((product) => {
                  const primaryVariant = product.variants?.[0] || {};
                  const priceValue = parseFloat(
                    primaryVariant.price
                      ?.replace("Rs. ", "")
                      ?.replace(".0", "") || 0,
                  );

                  return (
                    <Grid item xs={12} sm={6} lg={3} key={product._id}>
                      <ProductCard
                        images={
                          primaryVariant.images?.map((img) => ({
                            url: img.url,
                            alt: img.assetType,
                          })) || []
                        }
                        title={product.title}
                        swatches={
                          product.variants?.map((variant) => ({
                            colorCode: variant.color,
                            productCode: `${product._id}-${variant.color}`,
                          })) || []
                        }
                        price={priceValue}
                        productId={product._id}
                        productCode={`${product._id}-${primaryVariant.color}`}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
