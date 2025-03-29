import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  FaPen,
  FaTrash,
  FaShippingFast,
  FaClock,
  FaCcVisa,
  FaCcMastercard,
  FaUniversity,
  FaMobileAlt,
  FaBox,
  FaChevronRight,
} from "react-icons/fa";
import { getCart, removeFromCart, clearCart } from "../../redux/cartSlice";
import { createOrder, verifyPayment } from "../../redux/orderSlice";
import { updateUser, checkAuth } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

// Custom styled components
const StyledContainer = styled(Box)({
  backgroundColor: "#f8f7f5",
  minHeight: "100vh",
  color: "#1F2937",
  fontFamily: "sans-serif",
});

const StyledPaper = styled(Paper)({
  width: "100%",
  borderRadius: "0.5rem",
  padding: "1.5rem",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  backgroundColor: "white",
});

const InfoBox = styled(Box)({
  fontSize: "0.8125rem",
  display: "flex",
  justifyContent: "space-between",
  textAlign: "start",
});

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "start",
});

const StyledButton = styled(Button)({
  width: "100%",
  backgroundColor: "black",
  color: "white",
  padding: "0.75rem",
  fontSize: "1.125rem",
  fontWeight: 600,
  textTransform: "none",
  borderRadius: "0.25rem",
  "&:hover": {
    backgroundColor: "#1F2937",
  },
});

const ImgContainer = styled(Box)({
  position: "relative",
  width: "123.1px",
  height: "184.65px",
});

const DeleteButton = styled(Box)({
  position: "absolute",
  bottom: 0,
  right: 0,
  backgroundColor: "white",
  fontSize: "1rem",
  padding: "0.25rem",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  cursor: "pointer",
});

const LinkText = styled("a")({
  color: "#1F2937",
  textDecoration: "underline",
  cursor: "pointer",
});

export const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: cartItems, status: cartStatus } = useSelector(
    (state) => state.cart,
  );
  const { currentOrder, status: orderStatus } = useSelector(
    (state) => state.orders,
  );
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingDeliveryAddress, setIsEditingDeliveryAddress] =
    useState(false);
  const [addressForm, setAddressForm] = useState({
    name: "",
    street: "",
    addressLine2: "",
    city: "",
    pincode: "",
    state: "",
    country: "India",
  });
  const [deliveryAddressForm, setDeliveryAddressForm] = useState({
    name: "",
    phone: "",
    street: "",
    addressLine2: "",
    city: "",
    pincode: "",
    state: "",
    country: "India",
  });
  const [error, setError] = useState(null);

  // Initialize address forms with user data if available
  useEffect(() => {
    if (user) {
      const userAddress = {
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        phone: user.phone || "+91 62045 36045",
        street: user.address?.street || "",
        addressLine2: "",
        city: user.address?.city || "",
        pincode: user.address?.postalCode || "",
        state: user.address?.state || "",
        country: user.address?.country || "India",
      };
      setAddressForm(userAddress);
      setDeliveryAddressForm(userAddress);
      dispatch(getCart());
    } else {
      dispatch(checkAuth());
    }
  }, [dispatch, user, navigate]);

  // Redirect to cart page if cart is empty after loading
  useEffect(() => {
    if (cartStatus === "succeeded" && cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartStatus, cartItems, navigate]);

  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum + parseFloat(item.price.replace("Rs. ", "")) * item.quantity,
    0,
  );

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeliveryAddressChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAddress = async () => {
    try {
      const updatedUserData = {
        address: {
          street: addressForm.street,
          city: addressForm.city,
          state: addressForm.state,
          postalCode: addressForm.pincode,
          country: addressForm.country,
        },
      };
      await dispatch(updateUser(updatedUserData)).unwrap();
      setIsEditingAddress(false);
      setError(null);
    } catch (err) {
      setError("Failed to update address. Please try again.");
    }
  };

  const handleSaveDeliveryAddress = () => {
    setIsEditingDeliveryAddress(false);
    setError(null);
  };

  const handleCancelEdit = () => {
    setIsEditingAddress(false);
    setAddressForm({
      name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
      street: user?.address?.street || "",
      addressLine2: "",
      city: user?.address?.city || "",
      pincode: user?.address?.postalCode || "",
      state: user?.address?.state || "",
      country: user?.address?.country || "India",
    });
    setError(null);
  };

  const handleCancelDeliveryEdit = () => {
    setIsEditingDeliveryAddress(false);
    setDeliveryAddressForm({
      name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
      phone: user?.phone || "+91 62045 36045",
      street: user?.address?.street || "",
      addressLine2: "",
      city: user?.address?.city || "",
      pincode: user?.address?.postalCode || "",
      state: user?.address?.state || "",
      country: user?.address?.country || "India",
    });
    setError(null);
  };

  const handleDeleteItem = async (cartId) => {
    try {
      await dispatch(removeFromCart(cartId)).unwrap();
    } catch (err) {
      setError(err.message || "Failed to remove item from cart");
    }
  };

  const handleCompletePurchase = async () => {
    console.log("Function started");
    if (!user || !user.id) {
      console.log("No user or user ID");
      setError("Please log in to complete your purchase.");
      return;
    }
    if (!cartItems.length) {
      console.log("Cart is empty");
      setError("Your cart is empty.");
      return;
    }
    console.log("Sending request to backend");

    const orderData = {
      userId: user.id,
      items: cartItems.map((item) => {
        const price = parseFloat(item.price.replace("Rs. ", ""));
        if (!item.size?.sizeCode || !item.size?.sizeFilter) {
          console.error("Invalid size data for item:", item);
          throw new Error("Each item must have sizeCode and sizeFilter");
        }
        if (
          !item.images ||
          !Array.isArray(item.images) ||
          item.images.length === 0
        ) {
          console.error("Invalid images data for item:", item);
          throw new Error("Each item must have at least one image");
        }
        return {
          productId: item.productId,
          productCode: item.productCode,
          title: item.title,
          price,
          quantity: item.quantity,
          size: {
            sizeCode: item.size.sizeCode,
            sizeFilter: item.size.sizeFilter,
          },
          color: item.color,
          images: item.images, // Include images from cartItems
        };
      }),
      shippingName: deliveryAddressForm.name,
      shippingEmail: user.email,
      shippingAddressDetails: {
        street: deliveryAddressForm.street,
        city: deliveryAddressForm.city,
        state: deliveryAddressForm.state,
        postalCode: deliveryAddressForm.pincode,
        country: deliveryAddressForm.country,
        phone: deliveryAddressForm.phone,
      },
      paymentMethod: paymentMethod === "card" ? "razorpay" : paymentMethod,
      totalAmount,
    };

    try {
      console.log("Order data being sent:", orderData);
      const result = await dispatch(createOrder(orderData)).unwrap();

      if (paymentMethod === "cod") {
        await dispatch(clearCart()).unwrap();
        alert("Order placed successfully");
        navigate("/cart"); // Redirect to MyPurchases instead of home
      } else if (paymentMethod === "razorpay" && result.razorpayOrderId) {
        const options = {
          key: result.key,
          amount: result.amount,
          currency: "INR",
          name: "H&M Clone",
          description: "Order Payment",
          order_id: result.razorpayOrderId,
          handler: async (response) => {
            const paymentData = {
              orderId: result.orderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };
            await dispatch(verifyPayment(paymentData)).unwrap();
            await dispatch(clearCart()).unwrap();
            setError(null);
            alert("Payment successful and order placed");
            navigate("/cart");
          },
          prefill: {
            name: deliveryAddressForm.name,
            email: user.email,
          },
          theme: {
            color: "#1F2937",
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        setError(null);
      }
    } catch (err) {
      console.error("Order creation failed:", err);
      setError(err.message || "Failed to place order. Please try again.");
    }
  };

  if (cartStatus === "loading") return <Typography>Loading...</Typography>;
  if (!user) return <Typography>Please log in to proceed.</Typography>;

  return (
    <StyledContainer>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 600 }}>
          Checkout
        </Typography>
        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Grid container spacing={6}>
          {/* Left Column */}
          <Grid item xs={12} lg={8}>
            {/* My Information */}
            <StyledPaper sx={{ mb: 3, textAlign: "start" }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0 }}>
                My Information
              </Typography>
              <InfoBox>
                <Box sx={{ textAlign: "start" }}>
                  <Typography>
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography>{user.email}</Typography>
                </Box>
                <FaPen />
              </InfoBox>
            </StyledPaper>

            {/* Billing Address */}
            <StyledPaper sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, textAlign: "start" }}
              >
                Billing Address
              </Typography>
              {isEditingAddress ? (
                <Box
                  component="form"
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <TextField
                    label="Name"
                    name="name"
                    value={addressForm.name}
                    onChange={handleAddressChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Street Address"
                    name="street"
                    value={addressForm.street}
                    onChange={handleAddressChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Address Line 2"
                    name="addressLine2"
                    value={addressForm.addressLine2}
                    onChange={handleAddressChange}
                    fullWidth
                  />
                  <TextField
                    label="City"
                    name="city"
                    value={addressForm.city}
                    onChange={handleAddressChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Pincode"
                    name="pincode"
                    value={addressForm.pincode}
                    onChange={handleAddressChange}
                  />
                  <FormControl fullWidth required>
                    <InputLabel>State</InputLabel>
                    <Select
                      name="state"
                      value={addressForm.state}
                      onChange={handleAddressChange}
                      label="State"
                    >
                      <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                      <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                      <MenuItem value="Delhi">Delhi</MenuItem>
                      <MenuItem value="Karnataka">Karnataka</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Country"
                    name="country"
                    value={addressForm.country}
                    onChange={handleAddressChange}
                    required
                    fullWidth
                    disabled
                  />
                  <StyledButton onClick={handleSaveAddress}>Save</StyledButton>
                  <Typography
                    sx={{ textAlign: "center", cursor: "pointer" }}
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Typography>
                </Box>
              ) : (
                <InfoBox>
                  <Box>
                    <Typography>{addressForm.name}</Typography>
                    <Typography>{addressForm.street}</Typography>
                    <Typography>
                      {addressForm.pincode} {addressForm.city}
                    </Typography>
                    <Typography>
                      {addressForm.state}, {addressForm.country}
                    </Typography>
                  </Box>
                  <FaPen
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsEditingAddress(true)}
                  />
                </InfoBox>
              )}
            </StyledPaper>

            {/* Delivery */}
            <StyledPaper sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, textAlign: "start" }}
              >
                Delivery
              </Typography>
              {isEditingDeliveryAddress ? (
                <Box
                  component="form"
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <TextField
                    label="Name"
                    name="name"
                    value={deliveryAddressForm.name}
                    onChange={handleDeliveryAddressChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Phone Number"
                    name="phone"
                    value={deliveryAddressForm.phone}
                    onChange={handleDeliveryAddressChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Street Address"
                    name="street"
                    value={deliveryAddressForm.street}
                    onChange={handleDeliveryAddressChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Address Line 2"
                    name="addressLine2"
                    value={deliveryAddressForm.addressLine2}
                    onChange={handleDeliveryAddressChange}
                    fullWidth
                  />
                  <TextField
                    label="City"
                    name="city"
                    value={deliveryAddressForm.city}
                    onChange={handleDeliveryAddressChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Pincode"
                    name="pincode"
                    value={deliveryAddressForm.pincode}
                    onChange={handleDeliveryAddressChange}
                  />
                  <FormControl fullWidth required>
                    <InputLabel>State</InputLabel>
                    <Select
                      name="state"
                      value={deliveryAddressForm.state}
                      onChange={handleDeliveryAddressChange}
                      label="State"
                    >
                      <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                      <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                      <MenuItem value="Delhi">Delhi</MenuItem>
                      <MenuItem value="Karnataka">Karnataka</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Country"
                    name="country"
                    value={deliveryAddressForm.country}
                    onChange={handleDeliveryAddressChange}
                    required
                    fullWidth
                    disabled
                  />
                  <StyledButton onClick={handleSaveDeliveryAddress}>
                    Save
                  </StyledButton>
                  <Typography
                    sx={{ textAlign: "center", cursor: "pointer" }}
                    onClick={handleCancelDeliveryEdit}
                  >
                    Cancel
                  </Typography>
                </Box>
              ) : (
                <InfoBox>
                  <Box>
                    <Typography sx={{ fontWeight: 600, mb: 1 }}>
                      {deliveryAddressForm.name}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                      {deliveryAddressForm.phone}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>Standard Delivery</Typography>
                    <Typography sx={{ mb: 1 }}>Rs.149.00 - 2-7 days</Typography>
                    <Typography sx={{ mb: 1 }}>
                      {deliveryAddressForm.street}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                      {deliveryAddressForm.city} {deliveryAddressForm.pincode}
                    </Typography>
                    <Typography>
                      {deliveryAddressForm.state}, {deliveryAddressForm.country}
                    </Typography>
                  </Box>
                  <FaPen
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsEditingDeliveryAddress(true)}
                  />
                </InfoBox>
              )}
            </StyledPaper>

            {/* Order Details */}
            <StyledPaper sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, textAlign: "start" }}
              >
                View Order Details
              </Typography>
              <InfoBox
                sx={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <FlexBetween sx={{ width: "100%", mb: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FaBox style={{ marginRight: "0.5rem" }} />
                    <Typography sx={{ fontWeight: 600 }}>Parcel</Typography>
                  </Box>
                  <Typography>Shipped by H&M</Typography>
                </FlexBetween>
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  {cartItems.slice(0, 4).map((item) => (
                    <Grid item xs={3} key={item._id}>
                      <ImgContainer>
                        <img
                          src={
                            item.images[0]?.url ||
                            "https://placehold.co/123x184"
                          }
                          alt={item.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <DeleteButton
                          onClick={() => handleDeleteItem(item._id)}
                        >
                          <FaTrash style={{ color: "black" }} />
                        </DeleteButton>
                      </ImgContainer>
                    </Grid>
                  ))}
                </Grid>
                <Box
                  sx={{
                    bgcolor: "white",
                    p: 4,
                    width: "100%",
                    border: "1px solid black",
                  }}
                >
                  <FlexBetween sx={{ mb: 2 }}>
                    <Typography sx={{ fontWeight: 600 }}>
                      Standard Delivery
                    </Typography>
                    <LinkText>EDIT</LinkText>
                  </FlexBetween>
                  <Typography>{deliveryAddressForm.name}</Typography>
                  <Typography>{deliveryAddressForm.street}</Typography>
                  <Typography>
                    {deliveryAddressForm.pincode} {deliveryAddressForm.city}
                  </Typography>
                  <Typography>
                    {deliveryAddressForm.state}, {deliveryAddressForm.country}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      mt: 2,
                    }}
                  >
                    <FaShippingFast />
                    <Typography>FREE</Typography>
                    <FaClock style={{ color: "#6B7280" }} />
                    <Typography>2-7 days</Typography>
                  </Box>
                </Box>
              </InfoBox>
            </StyledPaper>

            {/* Payment */}
            <StyledPaper>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Payment
              </Typography>
              <Typography sx={{ mb: 4 }}>How would you like to pay?</Typography>
              <RadioGroup
                name="payment"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FlexBetween
                  onClick={() => setPaymentMethod("card")}
                  sx={{
                    mb: 0,
                    py: 1,
                    px: 2,
                    borderBottom: "1px solid #E5E7EB",
                    alignItems: "center",
                    backgroundColor:
                      paymentMethod === "card" ? "#F3F4F6" : "transparent",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#F3F4F6",
                    },
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <FormControlLabel
                    value="card"
                    control={<Radio sx={{ mr: 2 }} />}
                    label="Card"
                    sx={{ flex: 1, m: 0 }}
                  />
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <FaCcVisa size={24} style={{ color: "#2563EB" }} />
                    <FaCcMastercard size={24} style={{ color: "#DC2626" }} />
                  </Box>
                </FlexBetween>

                <FlexBetween
                  onClick={() => setPaymentMethod("netbanking")}
                  sx={{
                    mb: 0,
                    py: 1,
                    px: 2,
                    borderBottom: "1px solid #E5E7EB",
                    alignItems: "center",
                    backgroundColor:
                      paymentMethod === "netbanking"
                        ? "#F3F4F6"
                        : "transparent",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#F3F4F6",
                    },
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <FormControlLabel
                    value="netbanking"
                    control={<Radio sx={{ mr: 2 }} />}
                    label="Netbanking"
                    sx={{ flex: 1, m: 0 }}
                  />
                  <Box>
                    <img
                      src="https://e7.pngegg.com/pngimages/1003/913/png-clipart-computer-icons-bank-bank-online-banking-retail-banking.png"
                      alt="Netbanking Icon"
                      style={{ width: 25 }}
                    />
                  </Box>
                </FlexBetween>

                <FlexBetween
                  onClick={() => setPaymentMethod("upi")}
                  sx={{
                    mb: 0,
                    py: 1,
                    px: 2,
                    borderBottom: "1px solid #E5E7EB",
                    alignItems: "center",
                    backgroundColor:
                      paymentMethod === "upi" ? "#F3F4F6" : "transparent",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#F3F4F6",
                    },
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <FormControlLabel
                    value="upi"
                    control={<Radio sx={{ mr: 2 }} />}
                    label="UPI"
                    sx={{ flex: 1, m: 0 }}
                  />
                  <Box>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/f/fa/UPI-Logo.png?20170423140208"
                      alt="UPI Logo"
                      style={{ width: 40 }}
                    />
                  </Box>
                </FlexBetween>

                <FlexBetween
                  onClick={() => setPaymentMethod("cod")}
                  sx={{
                    mb: 0,
                    py: 1,
                    px: 2,
                    borderBottom: "1px solid #E5E7EB",
                    alignItems: "center",
                    backgroundColor:
                      paymentMethod === "cod" ? "#F3F4F6" : "transparent",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#F3F4F6",
                    },
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <FormControlLabel
                    value="cod"
                    control={<Radio sx={{ mr: 2 }} />}
                    label="Cash on Delivery"
                    sx={{ flex: 1, m: 0 }}
                  />
                  <Typography sx={{ fontWeight: 200 }}>
                    Cash on Delivery
                  </Typography>
                </FlexBetween>
              </RadioGroup>
              <Typography sx={{ fontSize: "0.875rem", mt: 2 }}>
                {paymentMethod === "cod"
                  ? "You pay in cash at the time of receiving the order."
                  : "Payment will be processed securely."}
              </Typography>
            </StyledPaper>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} lg={4}>
            <StyledPaper sx={{ mb: 6, maxWidth: { xs: "100%", lg: "380px" } }}>
              <FlexBetween sx={{ mb: 2 }}>
                <Typography sx={{ color: "#4B5563" }}>Discounts</Typography>
                <LinkText>Apply discount</LinkText>
              </FlexBetween>
              <FlexBetween sx={{ mb: 2 }}>
                <Typography sx={{ color: "#4B5563" }}>Order value</Typography>
                <Typography sx={{ color: "#1F2937" }}>
                  Rs. {totalAmount.toFixed(2)}
                </Typography>
              </FlexBetween>
              <FlexBetween sx={{ mb: 2 }}>
                <Typography sx={{ color: "#4B5563" }}>Delivery</Typography>
                <Typography sx={{ color: "#1F2937" }}>Rs.149.00</Typography>
              </FlexBetween>
              <FlexBetween sx={{ py: 4, borderTop: "1px solid #D1D5DB" }}>
                <Typography sx={{ fontSize: "1.125rem", fontWeight: 600 }}>
                  Total
                </Typography>
                <Typography sx={{ fontSize: "1.125rem", fontWeight: 600 }}>
                  Rs. {(totalAmount + 149).toFixed(2)}
                </Typography>
              </FlexBetween>
              <Typography
                sx={{ fontSize: "0.875rem", color: "#4B5563", mb: 2 }}
              >
                By continuing, you agree to{" "}
                <LinkText>H&M's General Terms and Conditions</LinkText>.
              </Typography>
              <Typography
                sx={{ fontSize: "0.875rem", color: "#4B5563", mb: 4 }}
              >
                We will process your personal data in accordance with the{" "}
                <LinkText>H&M's Privacy Notice</LinkText>.
              </Typography>
              <StyledButton
                variant="contained"
                onClick={handleCompletePurchase}
                disabled={orderStatus === "loading" || cartItems.length === 0}
              >
                {orderStatus === "loading"
                  ? "Processing..."
                  : "Complete Purchase"}
              </StyledButton>
              <Typography
                sx={{ fontSize: "0.875rem", color: "#4B5563", mt: 4 }}
              >
                Need help? Please contact <LinkText>Customer Service</LinkText>.
              </Typography>
            </StyledPaper>

            <StyledPaper sx={{ maxWidth: { xs: "100%", lg: "380px" }, p: 4 }}>
              <FlexBetween>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FaBox style={{ marginRight: "0.5rem", color: "#1F2937" }} />
                  <Typography sx={{ color: "#1F2937" }}>
                    Delivery and return options
                  </Typography>
                </Box>
                <FaChevronRight style={{ color: "#1F2937" }} />
              </FlexBetween>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </StyledContainer>
  );
};

export default Checkout;
