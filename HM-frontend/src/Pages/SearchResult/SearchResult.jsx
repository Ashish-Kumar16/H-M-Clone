import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Skeleton, IconButton } from "@mui/material";
import {
  FavoriteBorder,
  Favorite,
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { searchProductsByQuery } from "../../redux/productSlice";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../../redux/wishSlice";

const FALLBACK_IMAGE = "https://via.placeholder.com/300x300?text=No+Image";

// ProductCard styled components
const SingleCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  width: "100%",
  position: "relative",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

const CardImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
  aspectRatio: "2/3",
  overflow: "hidden",
});

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "opacity 0.3s",
});

const FavoriteIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  transition: "color 0.3s ease",
}));

const CarouselArrow = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  opacity: 0,
  transition: "opacity 0.2s",
  display: { xs: "none", sm: "flex" },
}));

const ArrowPrev = styled(CarouselArrow)(({ theme }) => ({
  left: theme.spacing(1),
}));

const ArrowNext = styled(CarouselArrow)(({ theme }) => ({
  right: theme.spacing(1),
}));

const CardContent = styled(Box)({
  padding: "8px 0",
  width: "100%",
  textAlign: "left",
});

const ColorBox = styled(Box)({
  display: "flex",
  gap: "4px",
  marginTop: "4px",
});

const Swatch = styled(Box)(({ theme }) => ({
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  border: `1px solid ${theme.palette.divider}`,
}));

const ProductCard = ({
  images = [],
  title = "Untitled Product",
  swatches = [],
  price = 0,
  productId = "",
  productCode = "",
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveringFavorite, setIsHoveringFavorite] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = !!user?.id;

  const validImages =
    images.length > 0
      ? images.map((img) => ({
          src: img.url || FALLBACK_IMAGE,
          alt: img.alt || title,
        }))
      : [{ src: FALLBACK_IMAGE, alt: "No image available" }];

  const isFavorite = wishlistItems.some(
    (item) => item.productCode === productCode,
  );
  const handleCardClick = () => {
    navigate(`/product/${productCode}`);
  };
  const handleSwatchClick = (e, productCode) => {
    e.preventDefault();
    e.stopPropagation();
    //   navigate(`/product/${productId}/${productCode}`);
  };
  const handleAddWish = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      enqueueSnackbar("Please login to add to wishlist", {
        variant: "warning",
      });
      return;
    }

    const wishData = { productId, variantIndex: 0, size: "S" };

    if (isFavorite) {
      dispatch(removeFromWishlist(productCode))
        .unwrap()
        .then(() => {
          dispatch(getWishlist());
          enqueueSnackbar("Removed from wishlist", { variant: "info" });
        })
        .catch((error) => {
          enqueueSnackbar("Failed to remove from wishlist", {
            variant: "error",
          });
        });
    } else {
      dispatch(addToWishlist(wishData))
        .unwrap()
        .then(() => {
          dispatch(getWishlist());
          enqueueSnackbar("Added to wishlist", { variant: "success" });
        })
        .catch((error) => {
          enqueueSnackbar("Failed to add to wishlist", { variant: "error" });
        });
    }
  };

  const handleImageError = (e) => {
    if (e.target.src !== FALLBACK_IMAGE) {
      e.target.src = FALLBACK_IMAGE;
    }
  };

  return (
    <SingleCard
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <CardImageContainer>
        <StyledImage
          src={validImages[currentImageIndex].src}
          alt={validImages[currentImageIndex].alt}
          onError={handleImageError}
          loading="lazy"
        />

        {validImages.length > 1 && (
          <>
            <ArrowPrev
              onClick={(e) => {
                e.preventDefault();
                setCurrentImageIndex(
                  (prev) =>
                    (prev - 1 + validImages.length) % validImages.length,
                );
              }}
              sx={{ opacity: isHovered ? 1 : 0 }}
            >
              <ArrowBackIos fontSize="small" />
            </ArrowPrev>
            <ArrowNext
              onClick={(e) => {
                e.preventDefault();
                setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
              }}
              sx={{ opacity: isHovered ? 1 : 0 }}
            >
              <ArrowForwardIos fontSize="small" />
            </ArrowNext>
          </>
        )}

        <FavoriteIconButton
          onClick={handleAddWish}
          size="small"
          onMouseEnter={() => setIsHoveringFavorite(true)}
          onMouseLeave={() => setIsHoveringFavorite(false)}
          sx={{
            color: isFavorite ? "error.main" : "inherit",
            "&:hover": {
              color: "error.main",
              backgroundColor: "transparent",
            },
          }}
        >
          {isFavorite || isHoveringFavorite ? (
            <Favorite fontSize="small" />
          ) : (
            <FavoriteBorder fontSize="small" />
          )}
        </FavoriteIconButton>
      </CardImageContainer>

      <CardContent>
        <Typography
          variant="body2"
          fontWeight={700}
          noWrap
          sx={{ textAlign: "left" }}
        >
          {title.toUpperCase()}
        </Typography>
        <Typography variant="body2" fontWeight={700} sx={{ textAlign: "left" }}>
          Rs. {price.toLocaleString("en-IN")}
        </Typography>
        <ColorBox>
          {swatches.slice(0, 3).map((swatch, index) => (
            <Swatch
              key={index}
              sx={{ backgroundColor: swatch.colorCode }}
              onClick={(e) => handleSwatchClick(e, swatch.productCode)}
            />
          ))}
          {swatches.length > 3 && (
            <Typography variant="caption">+{swatches.length - 3}</Typography>
          )}
        </ColorBox>
      </CardContent>
    </SingleCard>
  );
};

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
