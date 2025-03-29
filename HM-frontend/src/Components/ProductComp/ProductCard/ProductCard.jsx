import React, { useState } from "react";
import { Typography, IconButton, Box } from "@mui/material";
import {
  FavoriteBorder,
  Favorite,
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../../../redux/wishSlice";

const FALLBACK_IMAGE = "https://via.placeholder.com/300x300?text=No+Image";

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

export const ProductCard = ({
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
              onClick={(e) => {
                e.preventDefault();
                navigate(`/product/${productId}/${swatch.productCode}`);
              }}
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
