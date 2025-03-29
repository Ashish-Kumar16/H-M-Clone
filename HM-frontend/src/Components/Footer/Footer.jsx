import React from "react";
import { Box, Container, Typography, Link, Grid, Stack } from "@mui/material";
import {
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Facebook as FacebookIcon,
} from "@mui/icons-material";
import { FaTiktok, FaSpotify } from "react-icons/fa"; // Importing TikTok and Spotify from react-icons
import logo from "../../assets/logohm.png";

const ListHeader = ({ children }) => {
  return (
    <Typography variant="h6" fontWeight={500} sx={{ mb: 1 }}>
      {children}
    </Typography>
  );
};

export const FooterC = () => {
  return (
    <Box sx={{ bgcolor: "#E4E4E4", color: "text.primary" }}>
      {/* Footer Links & Content Section */}
      <Container maxWidth="lg" component={Stack} sx={{ py: 5 }}>
        <Grid container spacing={4} alignItems="flex-start">
          {/* Shop Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Stack alignItems="flex-start">
              <ListHeader>Shop</ListHeader>
              <Link href="#" underline="hover" color="inherit">
                Ladies
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Men
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Baby
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Kids
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Home
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Magazine
              </Link>
            </Stack>
          </Grid>
          {/* Corporate Info Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Stack alignItems="flex-start">
              <ListHeader>Corporate Info</ListHeader>
              <Link href="#" underline="hover" color="inherit">
                Career at H&M
              </Link>
              <Link href="#" underline="hover" color="inherit">
                About H&M Group
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Sustainability H&M Group
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Press
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Investor relations
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Corporate governance
              </Link>
            </Stack>
          </Grid>
          {/* Help Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Stack alignItems="flex-start">
              <ListHeader>Help</ListHeader>
              <Link href="#" underline="hover" color="inherit">
                Customer Service
              </Link>
              <Link href="#" underline="hover" color="inherit">
                My H&M
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Find a store
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Legal & privacy
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Contact
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Report a scam
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Cookie Notice
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Cookie Settings
              </Link>
            </Stack>
          </Grid>
          {/* Social Media Signup Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Stack alignItems="flex-start">
              <Typography variant="body2" sx={{ mb: 1 }}>
                Sign up now and be the first to know about exclusive offers,
                latest fashion news & style tips!
              </Typography>
              <Link
                href="#"
                underline="hover"
                fontWeight="bold"
                variant="body2"
                color="inherit"
              >
                Read more →
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Social Media Icons Section */}
      <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
        <Stack direction="row" spacing={2}>
          <Link href="https://instagram.com" target="_blank">
            <InstagramIcon sx={{ fontSize: 24, color: "#000000" }} />
          </Link>
          <Link href="https://tiktok.com" target="_blank">
            <FaTiktok style={{ fontSize: 24, color: "#000000" }} />
          </Link>
          <Link href="https://spotify.com" target="_blank">
            <FaSpotify style={{ fontSize: 24, color: "#000000" }} />
          </Link>
          <Link href="https://youtube.com" target="_blank">
            <YouTubeIcon sx={{ fontSize: 24, color: "#000000" }} />
          </Link>
          <Link href="https://facebook.com" target="_blank">
            <FacebookIcon sx={{ fontSize: 24, color: "#000000" }} />
          </Link>
        </Stack>
      </Box>

      {/* Copyright Section */}
      <Typography
        variant="caption"
        align="center"
        display="block"
        sx={{ mt: 2 }}
      >
        The content of this site is copyright-protected and is the property of H
        & M Hennes & Mauritz AB.
      </Typography>

      {/* Company Logo Section */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <img
          src={logo}
          alt="H&M Logo"
          style={{ width: "39px", height: "26px" }}
        />
      </Box>

      <Typography
        variant="caption"
        align="center"
        display="block"
        sx={{ mt: 1, pb: 2 }}
      >
        INDIA | Rs.
      </Typography>
    </Box>
  );
};
