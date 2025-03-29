import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";

const RangeSlider = styled(Box)({
  position: "relative",
  width: "100%",
  height: "2px",
  background: "#e0e0e0", // Light gray background for the track
});

const RangeInput = styled("input")({
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
  },
  "&::-moz-range-thumb": {
    width: "20px",
    height: "20px",
    background: "black",
    cursor: "pointer",
    borderRadius: "50%",
    pointerEvents: "auto",
  },
});

const RangeTrack = styled(Box)(({ minPercent, maxPercent }) => ({
  position: "absolute",
  height: "2px",
  background: "black",
  zIndex: 1,
  left: `${minPercent}%`,
  width: `${maxPercent - minPercent}%`,
}));

const ClearButton = styled(Button)({
  width: "195.41px",
  height: "48px",
  padding: "3px 23px",
});

const ViewButton = styled(Button)({
  width: "196.59px",
  height: "48px",
  padding: "4px 24px",
});

export const FilterSidebar = ({ setOpenDrawer }) => {
  const [minValue, setMinValue] = useState(299);
  const [maxValue, setMaxValue] = useState(29999);
  const minPrice = 299;
  const maxPrice = 29999;

  const updateRangeTrack = () => {
    const minPercent = ((minValue - minPrice) / (maxPrice - minPrice)) * 100;
    const maxPercent = ((maxValue - minPrice) / (maxPrice - minPrice)) * 100;
    return { minPercent, maxPercent };
  };

  const { minPercent, maxPercent } = updateRangeTrack();

  const handleMinChange = (e) => {
    const newMin = Math.min(parseInt(e.target.value), maxValue - 1);
    setMinValue(Math.max(newMin, minPrice));
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(parseInt(e.target.value), minValue + 1);
    setMaxValue(Math.min(newMax, maxPrice));
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        minHeight: "100vh",
        width: "472px",
        p: 4,
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
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
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
          <Typography sx={{ color: "red", fontWeight: "bold" }}>
            Price range
          </Typography>
          <ChevronUpIcon sx={{ color: "red" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            color: "grey.500",
            fontSize: "0.875rem",
          }}
        >
          <Typography>{minValue} Rs</Typography>
          <Typography>{maxValue} Rs</Typography>
        </Box>
        <RangeSlider>
          <RangeInput
            type="range"
            min={minPrice}
            max={maxPrice}
            value={minValue}
            onChange={handleMinChange}
          />
          <RangeInput
            type="range"
            min={minPrice}
            max={maxPrice}
            value={maxValue}
            onChange={handleMaxChange}
          />
          <RangeTrack minPercent={minPercent} maxPercent={maxPercent} />
        </RangeSlider>
      </Box>

      <List sx={{ py: 0, "& .MuiListItem-root": { py: 1 } }}>
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
            sx={{ display: "flex", justifyContent: "space-between", p: 0 }}
          >
            <ListItemText primary={item} />
            <ChevronRightIcon />
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 6 }}>
        <ClearButton
          sx={{ bgcolor: "grey.200", color: "grey.600", borderRadius: 1 }}
          onClick={() => {
            setMinValue(minPrice);
            setMaxValue(maxPrice);
          }}
        >
          Clear
        </ClearButton>
        <ViewButton
          sx={{ bgcolor: "black", color: "white", borderRadius: 1 }}
        >
          View [5912]
        </ViewButton>
      </Box>
    </Box>
  );
};