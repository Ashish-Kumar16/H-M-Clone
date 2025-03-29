import { IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../../redux/wishSlice";

export const FavoriteButton = ({ productId, variantIndex, size }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { items: wishlistItems, status: wishlistStatus } = useSelector(
    (state) => state.wishlist,
  );
  const { user } = useSelector((state) => state.auth);
  const { currentProduct: product } = useSelector((state) => state.products);
  const isAuthenticated = !!user && !!user.id;

  useEffect(() => {
    if (isAuthenticated && wishlistStatus === "idle") {
      dispatch(getWishlist());
    }
  }, [isAuthenticated, dispatch, wishlistStatus]);

  const selectedVariant = product?.variants[variantIndex];
  const productCode = selectedVariant?.productCode;

  const isInWishlist = useCallback(() => {
    return wishlistItems.some((item) => item.productCode === productCode);
  }, [wishlistItems, productCode]);

  const handleToggleWishlist = useCallback(() => {
    if (!isAuthenticated) {
      enqueueSnackbar("Please log in to add products to your wishlist.", {
        variant: "warning",
      });
      // navigate("/signin");
      return;
    }

    const wishData = {
      productId,
      variantIndex,
      size: size || "S", // Default to "S" if not provided
    };

    if (isInWishlist()) {
      dispatch(removeFromWishlist(productCode))
        .unwrap()
        .then(() => {
          enqueueSnackbar("Removed from wishlist!", { variant: "info" });
          dispatch(getWishlist()); // Refresh wishlist
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
          dispatch(getWishlist()); // Refresh wishlist
        })
        .catch((err) =>
          enqueueSnackbar(`Failed to add: ${err.message}`, {
            variant: "error",
          }),
        );
    }
  }, [
    dispatch,
    enqueueSnackbar,
    navigate,
    isAuthenticated,
    productId,
    variantIndex,
    size,
    productCode,
    wishlistItems,
  ]);

  return (
    <IconButton
      onClick={handleToggleWishlist}
      sx={{
        color: isInWishlist() ? "red" : "inherit",
        "&:hover": { color: "red" },
      }}
    >
      {isInWishlist() ? (
        <Favorite fontSize="medium" />
      ) : (
        <FavoriteBorder fontSize="medium" />
      )}
    </IconButton>
  );
};
