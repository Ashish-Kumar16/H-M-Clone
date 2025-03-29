import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Box, Paper, Divider } from "@mui/material";
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";
import { getUserOrders } from "../../redux/orderSlice";
import { checkAuth } from "../../redux/authSlice";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate

const MyPurchases = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate(); // Add navigate hook
  const {
    orders,
    status: orderStatus,
    error: orderError,
  } = useSelector((state) => state.orders);
  const {
    user,
    status: authStatus,
    error: authError,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authStatus === "idle") {
      dispatch(checkAuth());
    }
  }, [dispatch, authStatus]);

  useEffect(() => {
    if (authStatus === "succeeded" && user) {
      dispatch(getUserOrders());
    }
  }, [dispatch, authStatus, user, location.pathname]);

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`); // Navigate to OrderDetails with order ID
  };

  if (authStatus === "loading")
    return (
      <Container maxWidth="md" sx={{ p: 2 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  if (authStatus === "failed")
    return (
      <Container maxWidth="md" sx={{ p: 2 }}>
        <Typography color="error">{authError?.msg || "Auth failed"}</Typography>
      </Container>
    );
  if (!user)
    return (
      <Container maxWidth="md" sx={{ p: 2 }}>
        <Typography>Please log in.</Typography>
      </Container>
    );
  if (orderStatus === "loading")
    return (
      <Container maxWidth="md" sx={{ p: 2 }}>
        <Typography>Loading purchases...</Typography>
      </Container>
    );
  if (orderStatus === "failed")
    return (
      <Container maxWidth="md" sx={{ p: 2 }}>
        <Typography color="error">{orderError || "Failed to load"}</Typography>
      </Container>
    );

  const onlineOrders = orders.filter(
    (order) =>
      order.paymentMethod !== "in-store" || order.paymentMethod !== "cod",
  ).length;
  const codOrders = orders.filter(
    (order) => order.paymentMethod === "cod",
  ).length;
  const inStoreOrders = orders.filter(
    (order) => order.paymentMethod === "in-store",
  ).length;

  return (
    <div style={{ minHeight: "100vh" }}>
      <Container maxWidth="md" sx={{ p: 2 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
        >
          My Purchases
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Typography sx={{ color: "#DC2626", fontWeight: "600", mr: 2 }}>
            Online ({onlineOrders})
          </Typography>

          <Typography sx={{ color: "#4B5563" }}>
            In-store ({inStoreOrders})
          </Typography>
        </Box>
        <Divider sx={{ borderColor: "#DC2626", borderWidth: "2px", mb: 2 }} />
        {orders.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            No purchases found.
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {orders.map((order) => (
              <Paper
                key={order._id}
                sx={{
                  p: 2,
                  borderRadius: "8px",
                  boxShadow: 1,
                  position: "relative",
                  width: "275.75px",
                  height: "143.96px",
                  cursor: "pointer",
                }}
                onClick={() => handleOrderClick(order._id)} // Add click handler
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: "600" }}>
                      {order.orderStatus.charAt(0).toUpperCase() +
                        order.orderStatus.slice(1)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#6B7280" }}>
                      {order.items.length} item{order.items.length !== 1 && "s"}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="body2" sx={{ color: "#6B7280" }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "600",
                        ...(order.orderStatus === "cancelled" && {
                          textDecoration: "line-through",
                        }),
                      }}
                    >
                      Rs.{order.totalAmount.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "8px",
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                  }}
                >
                  {order.items.slice(0, 2).map((item, index) => (
                    <img
                      key={index}
                      src={
                        item.images?.[0]?.url || "https://placehold.co/40x60"
                      }
                      alt={item.title}
                      style={{
                        width: "40px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                  ))}
                </Box>
                <ChevronRightIcon
                  sx={{
                    position: "absolute",
                    bottom: "16px",
                    right: "16px",
                    color: "#6B7280",
                  }}
                />
              </Paper>
            ))}
          </Box>
        )}
      </Container>
    </div>
  );
};

export default MyPurchases;
