import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Drawer,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Apps,
  FilterList,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, searchProducts } from "../../redux/productSlice";
import { ProductCard } from "./ProductCard/ProductCard";
import ErrorBoundary from "./ErrorBoundary.jsx";
import { FilterSidebar } from "./FilterSidebar.jsx";
import { getWishlist } from "../../redux/wishSlice";

export const Product = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = !!user && !!user.id;
  const [sort, setSort] = useState("recommended");
  const [page, setPage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // Mobile
  const isMd = useMediaQuery(theme.breakpoints.between("sm", "lg")); // Tablet
  const isLg = useMediaQuery(theme.breakpoints.up("lg")); // Desktop

  // Adjust items per page based on screen size
  const itemsPerPage = isXs ? 12 : isMd ? 15 : 20; // Fewer items per page on smaller screens

  const { enqueueSnackbar } = useSnackbar();

  const categoryMap = {
    mens: "Men",
    ladies: "Women",
    kids: "Kids",
    home: "All Products",
  };

  const loadProducts = () => {
    if (category === "home") {
      dispatch(fetchProducts());
    } else {
      const apiCategory = categoryMap[category] || null;
      if (apiCategory && apiCategory !== "All Products") {
        dispatch(searchProducts(apiCategory));
      } else {
        dispatch(fetchProducts());
      }
    }
  };

  useEffect(() => {
    loadProducts();
    if (isAuthenticated) {
      dispatch(getWishlist());
    }
  }, [category, dispatch, isAuthenticated]);

  const sortedAndPaginatedProducts = () => {
    let filteredProducts = [...products];
    filteredProducts = filteredProducts.map((product) => ({
      ...product,
      price: parseFloat(product.variants?.[0]?.price?.replace("Rs. ", "") || 0),
    }));

    if (sort === "high_by_price") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "low_by_price") {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.slice(start, end);
  };

  const displayedProducts = sortedAndPaginatedProducts();
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleSortChange = (sortType) => {
    setSort(sortType);
    setPage(0);
    setAnchorEl(null);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <Box
      sx={{
        padding: { xs: "10px", sm: "15px", md: "20px" },
        maxWidth: { xs: "100%", md: "1200px" },
        margin: "0 auto",
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          marginBottom: { xs: "10px", sm: "15px", md: "20px" },
          textAlign: "center",
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
        }}
      >
        {category
          ? `PRODUCTS RELATED TO ${category?.toUpperCase()}`
          : "ALL PRODUCTS"}
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        mb={{ xs: 2, sm: 3 }}
        spacing={{ xs: 1, sm: 0 }}
      >
        <Button
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            background: "transparent",
            color: "black",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          Sort By {anchorEl ? "-" : "+"}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            sx: { minWidth: "150px" },
          }}
        >
          <MenuItem onClick={() => handleSortChange("recommended")}>
            Recommended
          </MenuItem>
          <MenuItem onClick={() => handleSortChange("low_by_price")}>
            Lowest Price
          </MenuItem>
          <MenuItem onClick={() => handleSortChange("high_by_price")}>
            Highest Price
          </MenuItem>
        </Menu>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent={{ xs: "flex-start", sm: "flex-end" }}
        >
          <Button
            onClick={() => setOpenDrawer(true)}
            sx={{
              background: "transparent",
              color: "black",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
            startIcon={<FilterList />}
          >
            Filter
          </Button>
          <Apps fontSize={isXs ? "small" : "medium"} />
        </Stack>
      </Stack>

      <Grid container spacing={{ xs: 1, sm: 2 }} justifyContent="center">
        {status === "loading"
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <Grid
                item
                xs={12} // 1 per row on mobile
                sm={4} // 3 per row on tablet
                lg={3} // 4 per row on desktop
                key={index}
              >
                <Stack spacing={1}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={{ xs: 150, sm: 200, md: 250 }}
                  />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </Stack>
              </Grid>
            ))
          : displayedProducts.map((product) => {
              const defaultVariantCode =
                product.variants?.[0]?.productCode || "";
              const linkUrl = defaultVariantCode
                ? `/product/${product._id}/${defaultVariantCode}`
                : `/product/${product._id}`;

              return (
                <Grid
                  item
                  xs={12} // 1 per row on mobile
                  sm={4} // 3 per row on tablet
                  lg={3} // 4 per row on desktop
                  key={product._id}
                >
                  <Link
                    to={linkUrl}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "block",
                    }}
                  >
                    <ErrorBoundary>
                      <ProductCard
                        images={
                          product.variants?.[0]?.images?.length > 0
                            ? [
                                {
                                  src: product.variants[0].images[0].url,
                                  alt: product.title,
                                },
                              ]
                            : [
                                {
                                  src: "https://via.placeholder.com/300x300?text=No+Image",
                                  alt: product.title,
                                },
                              ]
                        }
                        category={product.category || ""}
                        title={product.title}
                        price={parseFloat(
                          product.variants?.[0]?.price?.replace("Rs. ", "") ||
                            0,
                        )}
                        swatches={
                          product.variants?.map((variant) => ({
                            colorCode: variant.color,
                            productCode: variant.productCode,
                          })) || []
                        }
                        productId={product._id}
                        productCode={defaultVariantCode}
                      />
                    </ErrorBoundary>
                  </Link>
                </Grid>
              );
            })}
      </Grid>

      <Stack
        direction="row"
        justifyContent="center"
        spacing={1}
        mt={{ xs: 2, sm: 3, md: 4 }}
      >
        <IconButton
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          size={isXs ? "small" : "medium"}
        >
          <ArrowBackIos fontSize="inherit" />
        </IconButton>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem" },
            pt: { xs: "4px", sm: "6px" },
          }}
        >
          Page {page + 1} of {totalPages}
        </Typography>
        <IconButton
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages - 1}
          size={isXs ? "small" : "medium"}
        >
          <ArrowForwardIos fontSize="inherit" />
        </IconButton>
      </Stack>

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            width: { xs: "80%", sm: "50%", md: "30%" },
            maxWidth: "400px",
          },
        }}
      >
        <FilterSidebar setOpenDrawer={setOpenDrawer} />
      </Drawer>
    </Box>
  );
};
