import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Select,
  MenuItem,
  IconButton,
  Link as MuiLink,
  Skeleton,
} from "@mui/material";
import { FavoriteBorder, Delete, LocalShipping } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getCart, updateCartItem, removeFromCart } from "../../redux/cartSlice";
import { checkAuth } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

export const CartComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    items,
    status: cartStatus,
    error: cartError,
  } = useSelector((state) => state.cart);
  const { user, status: authStatus } = useSelector((state) => state.auth);
  const userId = user?._id || "someUserId";

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (cartStatus === "idle" && userId) {
      dispatch(getCart(userId));
    }
  }, [cartStatus, dispatch, userId]);

  const handleQuantityChange = (cartId, newQuantity) => {
    dispatch(updateCartItem({ cartId, quantity: newQuantity }));
  };

  const handleRemoveItem = (cartId) => {
    dispatch(removeFromCart(cartId));
  };

  const handleTocheckout = () => {
    if (!user) {
      // Assuming enqueueSnackbar is available in your project
      enqueueSnackbar("Please log in to proceed to checkout.", {
        variant: "warning",
      });
      navigate("/signin");
      return;
    }
    navigate("/checkout");
  };

  const calculateTotal = () => {
    return items
      .reduce(
        (total, item) =>
          total + parseFloat(item.price.replace("Rs. ", "")) * item.quantity,
        0,
      )
      .toFixed(2);
  };

  // Use a Skeleton view for the loading state with a minimum height that pushes the footer down.
  if (cartStatus === "loading") {
    return (
      <Box
        sx={{
          color: "grey.800",
          minHeight: "calc(100vh - 200px)",
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          {/* Top Info Bar Skeleton */}
          <Skeleton
            variant="text"
            width="80%"
            height={30}
            sx={{ mx: "auto", mb: 2 }}
          />
          {/* Title Skeleton */}
          <Skeleton
            variant="text"
            width="60%"
            height={40}
            sx={{ mx: "auto", mb: 4 }}
          />
          {/* Simulated cart items */}
          {Array.from(Array(3)).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={180}
              sx={{ mb: 2 }}
            />
          ))}
          {/* Summary Section Skeleton */}
          <Skeleton variant="rectangular" height={200} sx={{ mt: 4 }} />
        </Container>
      </Box>
    );
  }

  if (cartStatus === "failed") {
    return <Typography>Error: {cartError}</Typography>;
  }

  return (
    <Box sx={{ color: "grey.800", minHeight: "calc(100vh - 200px)" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Top Info Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            textAlign: "center",
            color: "grey.600",
            mb: 4,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            flexWrap: "wrap",
          }}
        >
          <Typography component="span">Free shipping above ₹1999</Typography>
          <Typography component="span">
            Free & flexible 15 days return
          </Typography>
          <Typography component="span">
            Estimated delivery time: 2-7 days
          </Typography>
        </Box>

        {/* Title */}
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: 600, mb: 6 }}
        >
          Shopping Bag
        </Typography>

        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 4,
            justifyContent: "center",
          }}
        >
          {/* Product Section */}
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              width: { xs: "100%", lg: "60%" },
              maxWidth: "735px",
              bgcolor: "white",
            }}
          >
            {items.length === 0 ? (
              <Typography sx={{ fontSize: "1.75rem" }}>
                Your Shopping Bag is empty!
              </Typography>
            ) : (
              items.map((item) => (
                <Box
                  key={item._id}
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    position: "relative",
                    mb: 2,
                    bgcolor: "white",
                    p: "24px",
                  }}
                >
                  <img
                    src={item.images[0]?.url || "https://placehold.co/162x168"}
                    alt={item.title}
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                      width: "120px",
                      height: "168px",
                    }}
                  />
                  <Box sx={{ ml: 2, flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        textAlign: "left",
                        fontSize: "1rem",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "grey.600",
                        mb: 2,
                        textAlign: "left",
                        fontSize: "1rem",
                      }}
                    >
                      {item.price}
                    </Typography>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                        gap: 1,
                        color: "black",
                        fontSize: "0.688rem",
                      }}
                    >
                      <Typography sx={{ textAlign: "left" }}>
                        Art no: {item.productCode}
                      </Typography>
                      <Typography sx={{ textAlign: "left" }}>
                        Size: {item.size.sizeFilter}
                      </Typography>
                      <Typography sx={{ textAlign: "left" }}>
                        Colour: {item.color}
                      </Typography>
                      <Typography sx={{ textAlign: "left" }}>
                        Total: Rs.{" "}
                        {(
                          parseFloat(item.price.replace("Rs. ", "")) *
                          item.quantity
                        ).toFixed(2)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 2,
                        gap: 2,
                      }}
                    >
                      <IconButton
                        sx={{
                          border: "1px solid",
                          borderColor: "grey.300",
                          borderRadius: 1,
                          p: 1,
                        }}
                      >
                        <FavoriteBorder />
                      </IconButton>
                      <Select
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item._id, Number(e.target.value))
                        }
                        size="small"
                        sx={{ minWidth: "80px" }}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                      </Select>
                    </Box>
                  </Box>
                  <IconButton
                    onClick={() => handleRemoveItem(item._id)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "grey.500",
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))
            )}
          </Box>

          {/* Summary Section */}
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 1,
              width: { xs: "100%", lg: "35%" },
              maxWidth: "380px",
              p: 3,
              maxHeight: "600px",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Discounts
              </Typography>
              <MuiLink
                href="#"
                sx={{
                  fontSize: "0.875rem",
                  color: "grey.600",
                  textDecoration: "none",
                }}
              >
                Apply discount
              </MuiLink>
            </Box>
            {!user && authStatus !== "loading" && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{ fontSize: "0.875rem", color: "grey.600", mb: 2 }}
                >
                  Sign in to use your personal offers!
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    bgcolor: "grey.200",
                    color: "grey.800",
                    "&:hover": { bgcolor: "grey.300" },
                  }}
                >
                  Sign in
                </Button>
              </Box>
            )}
            <Box
              sx={{ borderTop: "1px solid", borderColor: "grey.200", pt: 3 }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography sx={{ fontSize: "0.875rem", color: "grey.600" }}>
                  Order value
                </Typography>
                <Typography sx={{ fontSize: "0.875rem", color: "grey.600" }}>
                  Rs. {calculateTotal()}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography sx={{ fontSize: "0.875rem", color: "grey.600" }}>
                  Estimated delivery fee
                </Typography>
                <Typography sx={{ fontSize: "0.875rem", color: "grey.600" }}>
                  {calculateTotal() >= 1999 ? "FREE" : "Rs. 99.00"}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Rs.{" "}
                  {calculateTotal() >= 1999
                    ? calculateTotal()
                    : (parseFloat(calculateTotal()) + 99).toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  bgcolor: "black",
                  color: "white",
                  "&:hover": { bgcolor: "grey.900" },
                  py: 1.5,
                }}
                onClick={handleTocheckout}
              >
                Continue to Checkout
              </Button>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}
              >
                <img
                  src="https://1000logos.net/wp-content/uploads/2021/11/VISA-logo.png"
                  alt="Visa logo"
                  style={{ width: "40px" }}
                />
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPMEm-efiVHsW0NsLe3lZ7lixMo3vJhGhO0w&s"
                  alt="Mastercard logo"
                  style={{ width: "40px" }}
                />
                <Typography sx={{ fontSize: "0.875rem", color: "grey.600" }}>
                  Cash on Delivery
                </Typography>
              </Box>
              <Typography
                sx={{ fontSize: "0.75rem", color: "grey.500", mt: 3 }}
              >
                Prices and delivery costs are not confirmed until you've reached
                the checkout. 15 days free returns. Read more about{" "}
                <MuiLink href="#" underline="always" sx={{ color: "grey.500" }}>
                  return and refund policy
                </MuiLink>
                . Customers will receive SMS/WhatsApp notifications regarding
                deliveries.
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
              >
                <LocalShipping sx={{ color: "grey.600" }} />
                <MuiLink
                  href="#"
                  underline="always"
                  sx={{ fontSize: "0.875rem", color: "grey.600" }}
                >
                  Delivery and return options
                </MuiLink>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
