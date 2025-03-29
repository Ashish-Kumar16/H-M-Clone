import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Typography, Grid, Skeleton } from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getWishlist, removeFromWishlist } from "../../redux/wishSlice";

const ItemCard = ({ children, onClick }) => (
  <Box
    sx={{
      border: "1px solid #e0e0e0",
      p: 2,
      borderRadius: 1,
      cursor: "pointer",
      "&:hover": { boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" },
    }}
    onClick={onClick}
  >
    {children}
  </Box>
);

const ImageContainer = ({ children }) => (
  <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
    {children}
  </Box>
);

const TrashButton = ({ onClick, children }) => (
  <Box
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    sx={{
      position: "absolute",
      top: 8,
      right: 8,
      bgcolor: "white",
      borderRadius: "50%",
      p: 1,
      cursor: "pointer",
      "&:hover": { bgcolor: "#f5f5f5" },
    }}
  >
    {children}
  </Box>
);

export const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.id) {
      dispatch(getWishlist());
    }
  }, [dispatch, user]);

  const handleRemove = (productCode) => {
    dispatch(removeFromWishlist(productCode))
      .unwrap()
      .catch((err) => console.error("Remove failed:", err));
  };

  const handleCardClick = (item) => {
    const productId = item.productId?._id || item.productId;
    const productCode = item.productCode;
    navigate(`/product/${productId}/${productCode}`);
  };

  if (!user?.id) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6">
          Please log in to view your favorites.
        </Typography>
      </Container>
    );
  }

  if (status === "loading") {
    return (
      <Box sx={{ minHeight: "100vh" }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, textAlign: "center", mb: 6 }}
          >
            Favourites
          </Typography>
          <Grid container spacing={2}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={6} md={6} lg={3} key={item}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={423}
                  sx={{ mb: 1 }}
                />
                <Skeleton width="60%" height={24} sx={{ mb: 0.5 }} />
                <Skeleton width="40%" height={24} sx={{ mb: 0.5 }} />
                <Skeleton width="50%" height={24} sx={{ mb: 0.5 }} />
                <Skeleton width="30%" height={24} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <Typography color="error">Error: {error}</Typography>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6">Your wishlist is empty.</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, textAlign: "center", mb: 6 }}
        >
          Favourites
        </Typography>
        <Typography sx={{ textAlign: "right", mb: 4 }}>
          {items.length} {items.length === 1 ? "Item" : "Items"}
        </Typography>
        <Grid container spacing={2} sx={{ textAlign: "left" }}>
          {items.map((item) => (
            <Grid item xs={6} md={6} lg={3} key={item._id}>
              <ItemCard onClick={() => handleCardClick(item)}>
                <Box>
                  <ImageContainer>
                    <img
                      src={
                        item.images?.[0]?.url || "https://placehold.co/282x423"
                      }
                      alt={item.title || "Product image"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <TrashButton onClick={() => handleRemove(item.productCode)}>
                      <FaTrashAlt size={16} />
                    </TrashButton>
                  </ImageContainer>
                  <Typography sx={{ fontSize: "0.875rem", mt: 1.5 }}>
                    {item.title || "No Title"}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.875rem", fontWeight: 700, my: 0.5 }}
                  >
                    {item.price || 0}
                  </Typography>
                  <Typography sx={{ fontSize: "0.875rem", color: "gray" }}>
                    Colour: {item.color || "Unknown"}
                  </Typography>
                  <Typography
                    component={Link}
                    to="/stores"
                    sx={{
                      fontSize: "0.875rem",
                      color: "#2563eb",
                      display: "block",
                      mt: 0.5,
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Find in store
                  </Typography>
                </Box>
              </ItemCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
