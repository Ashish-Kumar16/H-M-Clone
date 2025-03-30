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
import ProductCard from "./ProductCard/ProductCard";
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
  const [priceRange, setPriceRange] = useState({ min: 299, max: 29999 });

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  const itemsPerPage = isXs ? 12 : isMd ? 15 : 20;
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

  useEffect(() => {
    setPage(0);
  }, [priceRange, sort]);

  const sortedAndPaginatedProducts = () => {
    let filteredProducts = [...products]
      .map((product) => ({
        ...product,
        price: parseFloat(
          product.variants?.[0]?.price?.replace("Rs. ", "") || 0,
        ),
      }))
      .filter(
        (product) =>
          product.price >= priceRange.min && product.price <= priceRange.max,
      );

    if (sort === "high_by_price") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "low_by_price") {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    const start = page * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  };

  const displayedProducts = sortedAndPaginatedProducts();
  const totalPages = Math.ceil(
    products.filter((product) => {
      const price = parseFloat(
        product.variants?.[0]?.price?.replace("Rs. ", "") || 0,
      );
      return price >= priceRange.min && price <= priceRange.max;
    }).length / itemsPerPage,
  );

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
        maxWidth: { xs: "100%", md: "100%" },
        minHeight: "100vh",
        margin: "0 auto",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          mb: { xs: 2, sm: 3 },
          textAlign: "center",
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
        }}
      >
        {category
          ? `PRODUCTS RELATED TO ${category.toUpperCase()}`
          : "ALL PRODUCTS"}
      </Typography>

      <Stack
        direction={{ xs: "row", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        sx={{
          width: "100%",
          paddingX: { xs: 1, sm: 0 },
        }}
      >
        <Button
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            color: "black",
            padding: { xs: "6px", sm: "6px 16px" },
            minWidth: "unset",
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          Sort By {anchorEl ? "-" : "+"}
        </Button>

        <Button
          onClick={() => setOpenDrawer(true)}
          startIcon={<FilterList />}
          sx={{
            color: "#000",
            textTransform: "none",
            padding: "6px 16px",
            ml: "auto",
            "& .MuiButton-startIcon": { marginRight: { xs: 0, sm: "8px" } },
          }}
        >
          <Typography
            component="span"
            sx={{ display: { xs: "none", sm: "inline" } }}
          >
            Filter
          </Typography>
        </Button>
      </Stack>

      <Grid container spacing={{ xs: 1, sm: 2 }} justifyContent="center">
        {status === "loading"
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <Grid item xs={6} sm={4} md={3} lg={3} key={index}>
                <Stack spacing={1} sx={{ p: 1 }}>
                  <Box
                    sx={{
                      position: "relative",
                      pt: { xs: "100%", sm: "150%" },
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Box>
                  <Skeleton variant="text" width="80%" height={24} />
                  <Skeleton variant="text" width="40%" height={20} />
                  <Box sx={{ display: "flex", gap: 0.5, mt: 1 }}>
                    {[0, 1, 2].map((i) => (
                      <Skeleton
                        key={i}
                        variant="circular"
                        width={16}
                        height={16}
                        sx={{ border: "1px solid #ddd" }}
                      />
                    ))}
                  </Box>
                </Stack>
              </Grid>
            ))
          : displayedProducts.map((product) => {
              const defaultVariant = product.variants?.[0] || {};
              const defaultVariantCode = defaultVariant.productCode || "";
              const images =
                defaultVariant.images?.map((img) => ({
                  url: img.url,
                  alt: product.title,
                })) || [];

              return (
                <Grid item xs={6} sm={4} md={3} lg={3} key={product._id}>
                  <Link
                    to={`/product/${product._id}/${defaultVariantCode}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ErrorBoundary>
                      <ProductCard
                        images={images}
                        title={product.title}
                        price={parseFloat(
                          defaultVariant.price?.replace("Rs. ", "") || 0,
                        )}
                        swatches={
                          product.variants?.map((v) => ({
                            colorCode: v.color,
                            productCode: v.productCode,
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

      <Stack direction="column" alignItems="center" spacing={2} mt={4}>
        <Button
          variant="text"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages - 1}
          sx={{
            color: "white",
            textTransform: "none",
            fontWeight: 400,
            backgroundColor: "black",
            "&:hover": { opacity: 0.8 },
          }}
        >
          Load next page
        </Button>

        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
            size="small"
            sx={{ color: "text.primary", "&:disabled": { opacity: 0.5 } }}
          >
            <ArrowBackIos fontSize="small" />
          </IconButton>

          {[...Array(totalPages).keys()].map((pageNumber) => {
            if (
              pageNumber === 0 ||
              pageNumber === totalPages - 1 ||
              (pageNumber >= page - 1 && pageNumber <= page + 1)
            ) {
              return (
                <Button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  sx={{
                    minWidth: "32px",
                    height: "32px",
                    color:
                      page === pageNumber ? "primary.main" : "text.primary",
                    fontWeight: page === pageNumber ? 700 : 400,
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                >
                  {pageNumber + 1}
                </Button>
              );
            }

            if (pageNumber === page + 2 && pageNumber < totalPages - 2) {
              return (
                <Typography key={pageNumber} sx={{ px: 1 }}>
                  ...
                </Typography>
              );
            }

            return null;
          })}

          <IconButton
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages - 1}
            size="small"
            sx={{ color: "text.primary", "&:disabled": { opacity: 0.5 } }}
          >
            <ArrowForwardIos fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <FilterSidebar
          setOpenDrawer={setOpenDrawer}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          filteredCount={displayedProducts.length}
        />
      </Drawer>
    </Box>
  );
};
