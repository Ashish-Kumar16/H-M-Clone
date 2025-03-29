import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Typography, Grid } from "@mui/material";
import { FaTrashAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getWishlist, removeFromWishlist } from "../../redux/wishSlice";

const ItemCard = ({ children, onClick }) => (
  <Box
    sx={{
      border: "1px solid #e0e0e0",
      p: 2,
      borderRadius: 1,
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    {children}
  </Box>
);

const ImageContainer = ({ children }) => (
  <Box sx={{ position: "relative", width: "100%", height: 423 }}>
    {children}
  </Box>
);

const TrashButton = ({ onClick, children }) => (
  <Box
    onClick={(e) => {
      e.stopPropagation(); // Prevent triggering parent onClick
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
    console.log("Removing productCode:", productCode);
    dispatch(removeFromWishlist(productCode))
      .unwrap()
      .then(() => {
        console.log("Item removed successfully");
      })
      .catch((err) => {
        console.error("Remove failed:", err);
      });
  };

  if (!user?.id) {
    return <Typography>Please log in to view your favorites.</Typography>;
  }

  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  if (status === "failed") {
    return <Typography>Error: {error}</Typography>;
  }

  if (items.length === 0) {
    return <Typography>Your wishlist is empty.</Typography>;
  }

  const handleCardClick = (item) => {
    const productId = item.productId?._id || item.productId; // Handle populated or raw ID
    const productCode = item.productCode; // Use productCode for navigation
    navigate(`/product/${productId}/${productCode}`); // Adjust URL to include productCode
  };

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
          {items.length} Items
        </Typography>
        <Grid container spacing={2} sx={{ textAlign: "left" }}>
          {items.map((item) => (
            <Grid item xs={12} md={6} lg={3} key={item._id}>
              <ItemCard onClick={() => handleCardClick(item)}>
                <Box>
                  <ImageContainer>
                    <img
                      src={
                        item.images?.[0]?.url || "https://placehold.co/282x423"
                      }
                      alt={item.title || "Unknown Product"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <TrashButton onClick={() => handleRemove(item.productCode)}>
                      <FaTrashAlt />
                    </TrashButton>
                  </ImageContainer>
                  <Typography sx={{ fontSize: "0.875rem" }}>
                    {item.title || "No Title"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 700 }}>
                    {item.price || "N/A"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.875rem" }}>
                    Colour: {item.color || "Unknown"}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.875rem", mb: "2px", color: "#2563eb" }}
                    component={Link}
                    href="#"
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
