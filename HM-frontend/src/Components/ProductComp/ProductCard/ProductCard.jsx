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
  justifyContent: "flex-start",
  alignItems: "flex-start",
  cursor: "pointer",
  width: "100%",
  background: "none",
  border: "none",
  padding: 0,
  transition: "none",
  marginBottom: theme.spacing(1),
  "&:hover": {
    boxShadow: "none",
  },
}));

const CardImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  // overflow: "hidden",
  aspectRatio: "2/3",
  [theme.breakpoints.down("sm")]: {
    aspectRatio: "1/1",
  },
}));

const StyledImage = styled("img")({
  width: "100%",
  // height: "100%",
  objectFit: "contain",
  opacity: 1,
});

const FavoriteIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  background: "none",
  borderRadius: "50%",
  padding: 4,
}));

const CarouselArrow = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "50%",
  padding: 4,
  opacity: 0,
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  display: "none",
  zIndex: 2,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const ArrowPrev = styled(CarouselArrow)(({ theme }) => ({
  left: theme.spacing(1),
}));

const ArrowNext = styled(CarouselArrow)(({ theme }) => ({
  right: theme.spacing(1),
}));

const CardContent = styled(Box)(({ theme }) => ({
  display: "block",
  position: "relative",
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)} 0`,
  width: "100%",
  [theme.breakpoints.up("lg")]: {
    padding: `${theme.spacing(0.5)} ${theme.spacing(2)} 0`,
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  color: "black",

  margin: `${theme.spacing(0.5)} 0 0`,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  "&:hover": {
    color: theme.palette.primary.dark,
  },
}));

const PriceWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexFlow: "row",
  alignItems: "center",
  gap: theme.spacing(0.5),
  margin: `0 0 ${theme.spacing(0.25)}`,
}));

const ColorBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: 4,
  fontSize: 12,
  gap: theme.spacing(0.25),
}));

const Swatch = styled(Box)(({ theme }) => ({
  display: "block",
  height: 8,
  width: 8,
  fontSize: 0,
  border: `1px solid ${theme.palette.divider}`,
  textIndent: "-9999px",
  cursor: "pointer",
}));

export const ProductCard = ({
  images = [],
  category = "",
  title = "Untitled Product",
  swatches = [],
  price = 0,
  productId = "",
  productCode = "",
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = !!user && !!user.id;

  const validImages =
    Array.isArray(images) && images.length > 0
      ? images
      : [{ src: FALLBACK_IMAGE, alt: "No Image Available" }];

  const defaultVariantIndex = 0;
  const defaultSize = "S";
  const isFavorite = wishlistItems.some(
    (item) => item.productCode === productCode,
  );

  const handleAddWish = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isAuthenticated) {
      enqueueSnackbar("Please log in to add products to your wishlist.", {
        variant: "warning",
      });
      // navigate("/signin");
      return;
    }

    const wishData = {
      productId,
      variantIndex: defaultVariantIndex,
      size: defaultSize,
    };

    if (isFavorite) {
      dispatch(removeFromWishlist(productCode))
        .unwrap()
        .then(() => {
          enqueueSnackbar("Removed from wishlist!", { variant: "info" });
          dispatch(getWishlist());
        })
        .catch((err) =>
          enqueueSnackbar(`Failed to remove: ${err.message}`, {
            variant: "error",
          }),
        );
    } else {
      dispatch(addToWishlist(wishData))
        .unwrap()
        .then(() => {
          enqueueSnackbar("Added to wishlist!", { variant: "success" });
          dispatch(getWishlist());
        })
        .catch((err) =>
          enqueueSnackbar(`Failed to add: ${err.message}`, {
            variant: "error",
          }),
        );
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === validImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? validImages.length - 1 : prevIndex - 1,
    );
  };

  const handleSwatchClick = (e) => {
    e.preventDefault();
    if (productId) {
      navigate(`/productdetail/${productId}`);
    }
  };

  const formattedPrice = `Rs. ${price.toLocaleString("en-IN")}.00`;

  return (
    <SingleCard
      component="article"
      
      sx={{
        "&:hover": {
          "& .carouselArrow": {
            opacity: 1,
          },
        },
      }}
    >
      <CardImageContainer >
        <StyledImage
          src={validImages[currentImageIndex].src}
          alt={validImages[currentImageIndex].alt}
        />
        {validImages.length > 1 && (
          <>
            <ArrowPrev
              onClick={handlePrevImage}
              disabled={currentImageIndex === 0}
              className="carouselArrow"
            >
              <ArrowBackIos />
            </ArrowPrev>
            <ArrowNext
              onClick={handleNextImage}
              disabled={currentImageIndex === validImages.length - 1}
              className="carouselArrow"
            >
              <ArrowForwardIos />
            </ArrowNext>
          </>
        )}
        <FavoriteIconButton
          aria-label="Add to favorites"
          onClick={handleAddWish}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{ color: isFavorite ? "red" : "black" }}
        >
          {isFavorite ? (
            <Favorite />
          ) : isHovered ? (
            <Favorite sx={{ color: "red" }} />
          ) : (
            <FavoriteBorder />
          )}
        </FavoriteIconButton>
      </CardImageContainer>
      <CardContent alignItems={"start"}>
        <StyledTitle variant="body2" fontWeight={700}>
          {title.toUpperCase()}
        </StyledTitle>
        <PriceWrapper>
          <Typography variant="body2" fontWeight={700} color="text.primary">
            {formattedPrice}
          </Typography>
        </PriceWrapper>
        <ColorBox>
          {Array.isArray(swatches) &&
            swatches
              .slice(0, 3)
              .map((el, index) => (
                <Swatch
                  key={index}
                  sx={{ backgroundColor: el?.colorCode || "#ccc" }}
                  onClick={handleSwatchClick}
                  title={`View ${title} in ${el?.colorCode}`}
                />
              ))}
          {Array.isArray(swatches) && swatches.length > 3 && (
            <Typography variant="caption" color="text.secondary">
              +{swatches.length - 3}
            </Typography>
          )}
        </ColorBox>
      </CardContent>
    </SingleCard>
  );
};
