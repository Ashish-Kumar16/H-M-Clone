import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Radio,
  FormControlLabel,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import { getOrder } from "../../redux/orderSlice";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  maxWidth: "lg",
}));

const StyledNav = styled("nav")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text?.secondary || "#6b7280",
  marginBottom: theme.spacing(4),
  textAlign: "center",
  width: "100%",
  maxWidth: 628,
}));

const StyledLink = styled("a")(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text?.secondary || "#6b7280",
  "&:hover": { textDecoration: "underline" },
}));

const SectionWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 628,
  marginBottom: theme.spacing(3),
}));

const StyledSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background?.paper || "#ffffff",
  padding: theme.spacing(3),
  borderRadius: theme.shape?.borderRadius || 8,
  boxShadow: theme.shadows?.[1] || "0 1px 3px rgba(0, 0, 0, 0.1)",
}));

const StyledBlueBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info?.light || "#dbeafe",
  padding: theme.spacing(2),
  borderRadius: theme.shape?.borderRadius || 8,
  width: "100%",
  maxWidth: 628,
  marginBottom: theme.spacing(3),
}));

const StyledTotalBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey?.[100] || "#f5f5f5",
  padding: theme.spacing(3),
  borderRadius: theme.shape?.borderRadius || 8,
  width: "100%",
  maxWidth: 628,
  marginBottom: theme.spacing(3),
}));

export const OrderDetails = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { currentOrder, status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrder(orderId));
    }
  }, [dispatch, orderId]);

  if (status === "loading") return <Typography>Loading...</Typography>;
  if (status === "failed")
    return <Typography color="error">Error: {error}</Typography>;
  if (!currentOrder) return <Typography>No order data found.</Typography>;

  const {
    items,
    shippingName,
    shippingAddressDetails,
    totalAmount,
    paymentMethod,
    createdAt,
    shippingEmail,
  } = currentOrder;
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const deliveryFee = 149; // This should ideally come from backend
  const grandTotal = subtotal + deliveryFee;
  const item = items[0];

  return (
    <StyledContainer>
      <StyledNav>
        <StyledLink href="https://hm-clone-chi.vercel.app/">HM.com</StyledLink>{" "}
        /{" "}
        <StyledLink href="https://hm-clone-chi.vercel.app/account/purchases">
          My purchases
        </StyledLink>{" "}
        / <span style={{ color: theme.palette.error.main }}>ORDER DETAILS</span>
      </StyledNav>

      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        mb={4}
        sx={{ textTransform: "uppercase" }}
      >
        ORDER DETAILS
      </Typography>

      <SectionWrapper>
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "flex-start" : "center"}
          mb={4}
          gap={isMobile ? 2 : 0}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              Order number
            </Typography>
            <Typography variant="h6" fontWeight="600">
              {currentOrder._id}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Order date
            </Typography>
            <Typography variant="h6" fontWeight="600">
              {new Date(createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </SectionWrapper>
      <StyledBlueBox>
        <Typography color="info.main">
          Your order consists of {items.length} parcel
          {items.length > 1 ? "s" : ""}
        </Typography>
      </StyledBlueBox>

      <SectionWrapper>
        <StyledSection>
          <Box mb={3}>
            <Typography variant="body2" color="text.secondary">
              Estimated delivery: 2-7 days
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Delivery Method: Standard delivery
            </Typography>
          </Box>

          {/* Order Received Section */}
          <Box mb={4} sx={{ borderBottom: "1px solid #e5e7eb", pb: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography color="success.main" fontWeight="600">
                  Order received
                </Typography>
                <Typography variant="body2" mt={1}>
                  Great! We've got your order.
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {new Date(createdAt).toLocaleDateString()}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                mt: 2,
                px: 4,
                py: 1,
                borderRadius: "4px",
                textTransform: "none",
              }}
            >
              Track this order
            </Button>
          </Box>

          {/* Order Status Timeline */}
          <Box sx={{ "& > div:not(:last-child)": { mb: 3 } }}>
            {["processed", "dispatched", "delivered"].map((status) => (
              <Box
                key={status}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Radio
                    disabled
                    checked={currentOrder.orderStatus === status}
                    sx={{ py: 0 }}
                  />
                  <Typography variant="body2" textTransform="capitalize">
                    {status}
                  </Typography>
                </Box>
                {currentOrder.orderStatus === status && (
                  <Typography variant="body2" color="text.secondary">
                    {new Date(createdAt).toLocaleDateString()}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </StyledSection>
      </SectionWrapper>

      <SectionWrapper>
        <StyledSection>
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={4}
            alignItems="start"
            sx={{ textTransform: "uppercase" }}
          >
            ORDER SUMMARY
          </Typography>

          {items.map((item, index) => (
            <Box
              key={item._id}
              display="flex"
              flexDirection={isMobile ? "column" : "row"}
              mb={4}
              gap={3}
              sx={{
                borderBottom:
                  index < items.length - 1 ? "1px solid #e5e7eb" : "none",
                pb: 4,
              }}
            >
              <img
                src={item.images?.[0]?.url || "https://placehold.co/100x150"}
                alt={item.title}
                style={{
                  width: 96,
                  height: 144,
                  objectFit: "cover",
                  alignSelf: "flex-start",
                }}
              />
              <Box flexGrow={1} alignItems={"start"}>
                <Typography fontWeight="600">{item.title}</Typography>
                <Typography variant="body2">
                  Rs.{item.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" mt={2}>
                  Art.no: {item.productCode}
                </Typography>
                <Typography variant="body2">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body2">Colour: {item.color}</Typography>
                <Typography variant="body2">
                  Size: {item.size.sizeCode}
                </Typography>
                <Typography variant="body2" mt={1}>
                  <strong>Item Total:</strong> Rs.
                  {(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            </Box>
          ))}
          <Box mb={4}>
            <Typography fontWeight="600">Delivery Address</Typography>
            <Typography variant="body2">{shippingName}</Typography>
            <Typography variant="body2">
              {shippingAddressDetails.street}
            </Typography>
            <Typography variant="body2">{`${shippingAddressDetails.city}, ${shippingAddressDetails.state}`}</Typography>
            <Typography variant="body2">
              {shippingAddressDetails.country}
            </Typography>
          </Box>
          <Box>
            <Typography fontWeight="600">Mode of Payment</Typography>
            <Typography variant="body2">
              {paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod}
            </Typography>
          </Box>
        </StyledSection>
      </SectionWrapper>

      <SectionWrapper>
        <Box display="flex" justifyContent="center" mb={4}>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              bgcolor: "common.black",
              color: "common.white",
              px: 4,
              py: 1.5,
              borderRadius: "4px",
              textTransform: "uppercase",
              width: isMobile ? "100%" : "auto",
            }}
          >
            Cancel order
          </Button>
        </Box>
      </SectionWrapper>

      <SectionWrapper>
        <StyledTotalBox>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body2">Total:</Typography>
            <Typography variant="body2">
              Rs.{(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body2">Delivery:</Typography>
            <Typography variant="body2">Rs.149.00</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" fontWeight="600">
            <Typography variant="body2">Total:</Typography>
            <Typography variant="body2">Rs.{totalAmount.toFixed(2)}</Typography>
          </Box>
          <Typography variant="body2" mt={2} color="text.secondary">
            Your points have been updated.
          </Typography>
        </StyledTotalBox>
      </SectionWrapper>

      <SectionWrapper>
        <StyledSection>
          <Box mb={4}>
            <Typography fontWeight="600">My details</Typography>
            <Typography variant="body2">{shippingName}</Typography>
            <Typography variant="body2">
              {currentOrder.shippingEmail}
            </Typography>
          </Box>
          <Box>
            <Typography fontWeight="600">Billing Address</Typography>
            <Typography variant="body2">{shippingName}</Typography>
            <Typography variant="body2">
              {shippingAddressDetails.street}
            </Typography>
            <Typography variant="body2">{`${shippingAddressDetails.city}, ${shippingAddressDetails.state}`}</Typography>
            <Typography variant="body2">
              {shippingAddressDetails.country}
            </Typography>
          </Box>
        </StyledSection>
      </SectionWrapper>

      <SectionWrapper>
        <Box textAlign="center" fontSize="0.875rem" mt={4}>
          <Typography display="inline">
            Still can't find what you are looking for? Contact our{" "}
          </Typography>
          <StyledLink href="#" sx={{ color: "primary.main" }}>
            CUSTOMER SERVICE
          </StyledLink>
        </Box>
      </SectionWrapper>
    </StyledContainer>
  );
};
