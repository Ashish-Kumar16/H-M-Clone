import React from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";

const RangeSlider = styled(Box)({
  position: "relative",
  width: "100%",
  height: "2px",
  background: "#e0e0e0",
});

const RangeInput = styled("input")(({ theme }) => ({
  WebkitAppearance: "none",
  position: "absolute",
  width: "100%",
  height: "2px",
  background: "transparent",
  pointerEvents: "none",
  "&::-webkit-slider-thumb": {
    WebkitAppearance: "none",
    appearance: "none",
    width: "20px",
    height: "20px",
    background: "black",
    cursor: "pointer",
    borderRadius: "50%",
    pointerEvents: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "16px",
      height: "16px",
    },
  },
  "&::-moz-range-thumb": {
    width: "20px",
    height: "20px",
    background: "black",
    cursor: "pointer",
    borderRadius: "50%",
    pointerEvents: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "16px",
      height: "16px",
    },
  },
}));

const RangeTrack = styled(Box)(({ minPercent, maxPercent }) => ({
  position: "absolute",
  height: "2px",
  background: "black",
  zIndex: 1,
  left: `${minPercent}%`,
  width: `${maxPercent - minPercent}%`,
}));

const ClearButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "48px",
  padding: "3px 16px",
  [theme.breakpoints.up("sm")]: {
    width: "195.41px",
    padding: "3px 23px",
  },
}));

const ViewButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "48px",
  padding: "4px 16px",
  [theme.breakpoints.up("sm")]: {
    width: "196.59px",
    padding: "4px 24px",
  },
}));

export const FilterSidebar = ({
  setOpenDrawer,
  priceRange,
  setPriceRange,
  filteredCount,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const minPrice = 0;
  const maxPrice = 29999;

  const updateRangeTrack = () => {
    const minPercent =
      ((priceRange.min - minPrice) / (maxPrice - minPrice)) * 100;
    const maxPercent =
      ((priceRange.max - minPrice) / (maxPrice - minPrice)) * 100;
    return { minPercent, maxPercent };
  };

  const { minPercent, maxPercent } = updateRangeTrack();

  const handleMinChange = (e) => {
    const newMin = Math.min(parseInt(e.target.value), priceRange.max - 1);
    setPriceRange((prev) => ({ ...prev, min: Math.max(newMin, minPrice) }));
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(parseInt(e.target.value), priceRange.min + 1);
    setPriceRange((prev) => ({ ...prev, max: Math.min(newMax, maxPrice) }));
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        minHeight: "100vh",
        width: { xs: "100vw", sm: "472px" },
        p: { xs: 2, sm: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{ fontWeight: "bold" }}
        >
          Filter
        </Typography>
        <CloseIcon
          sx={{ fontSize: "1.25rem", cursor: "pointer" }}
          onClick={() => setOpenDrawer(false)}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            sx={{
              color: "red",
              fontWeight: "bold",
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            Price range
          </Typography>
          {!isMobile && <ChevronUpIcon sx={{ color: "red" }} />}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            color: "grey.500",
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
          }}
        >
          <Typography>₹{priceRange.min}</Typography>
          <Typography>₹{priceRange.max}</Typography>
        </Box>
        <RangeSlider>
          <RangeInput
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange.min}
            onChange={handleMinChange}
          />
          <RangeInput
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange.max}
            onChange={handleMaxChange}
          />
          <RangeTrack minPercent={minPercent} maxPercent={maxPercent} />
        </RangeSlider>
      </Box>

      <List
        sx={{
          py: 0,
          "& .MuiListItem-root": {
            py: 1,
            "& .MuiListItemText-root": {
              "& span": {
                fontSize: { xs: "0.875rem", sm: "1rem" },
              },
            },
          },
        }}
      >
        {[
          "Colour",
          "Size",
          "Product type",
          "Style",
          "Fit",
          "Material",
          "Length",
          "Sleeve length",
          "Waist rise",
          "Neckline",
          "Quality",
          "Pattern",
        ].map((item) => (
          <ListItem
            key={item}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 0,
              "& svg": {
                fontSize: { xs: "1rem", sm: "1.25rem" },
              },
            }}
          >
            <ListItemText primary={item} />
            <ChevronRightIcon />
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 6,
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <ClearButton
          sx={{
            bgcolor: "grey.200",
            color: "grey.600",
            borderRadius: 1,
            order: { xs: 2, sm: 1 },
          }}
          onClick={() => setPriceRange({ min: minPrice, max: maxPrice })}
        >
          Clear
        </ClearButton>
        <ViewButton
          sx={{
            bgcolor: "black",
            color: "white",
            borderRadius: 1,
            order: { xs: 1, sm: 2 },
          }}
          onClick={() => setOpenDrawer(false)}
        >
          View ({filteredCount})
        </ViewButton>
      </Box>
    </Box>
  );
};
