import React from "react";
import { Routes, Route } from "react-router-dom";
import { Typography, Paper } from "@mui/material";
import Settings from "./AccountSetting"; // Adjust path if needed
import MyPurchases from "./MyPurchases"; // Adjust path if needed
import { AccountDetail } from "./AccountDetail"; // Adjust path if needed

const SettingsRoutes = () => {
  return (
    <Routes>
      <Route element={<AccountDetail />}>
        <Route index element={<DefaultContent />} />
        <Route path="settings" element={<Settings />} />
        <Route path="purchases" element={<MyPurchases />} />
      </Route>
    </Routes>
  );
};

// Default content when no specific section is selected
const DefaultContent = () => (
  <div style={{ padding: "16px" }}>
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
      My offers
    </Typography>
    <div style={{ display: "flex", marginTop: "16px", gap: "12px" }}>
      <Paper
        sx={{
          p: 2,
          backgroundColor: "#F3F4F6",
          width: "150px",
          height: "228px",
          borderRadius: "8px",
        }}
      >
        <img
          src="https://placehold.co/150x100"
          alt="Spotify Premium logo"
          style={{ width: "100%" }}
        />
        <Typography variant="body2" sx={{ mt: 1 }}>
          For members who love music
        </Typography>
        <Typography variant="caption" style={{ color: "#6B7280" }}>
          Valid until 04/10/2025
        </Typography>
      </Paper>
      <Paper
        sx={{
          p: 2,
          backgroundColor: "#F3F4F6",
          width: "150px",
          height: "228px",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h4"
          style={{ color: "#DC2626", fontWeight: "bold" }}
        >
          20%
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Flat 20% off on H&M Home...
        </Typography>
        <Typography variant="caption" style={{ color: "#6B7280" }}>
          Valid until 01/01/2026
        </Typography>
      </Paper>
    </div>
  </div>
);

export default SettingsRoutes;
