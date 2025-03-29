// src/Components/ProductComp/ErrorBoundary.jsx
import React, { Component } from "react";
import { Typography, Box } from "@mui/material";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ textAlign: "center", padding: 2 }}>
          <Typography variant="body1" color="error">
            Something went wrong with this product card.
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
