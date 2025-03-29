// NavbarSec.js
import React, { useState, useCallback, useEffect } from "react";
import { Menu, Button, Typography, Box, Stack, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";

const MENU_Z_INDEX = 1300;
const NAVBAR_HEIGHT = 160;

const StyledMenuBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  backgroundColor: "#FAF9F8",
  borderBottom: "2px solid",
});

export const NavbarSec = ({ comp, list, onClick, isSignInOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [closeTimeoutId, setCloseTimeoutId] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnterButton = useCallback(
    (event) => {
      if (!isSignInOpen) {
        clearTimeout(closeTimeoutId);
        setAnchorEl(event.currentTarget);
      }
    },
    [isSignInOpen, closeTimeoutId],
  );

  const handleMouseLeaveButton = useCallback(() => {
    const id = setTimeout(() => {
      setAnchorEl(null);
    }, 1000);
    setCloseTimeoutId(id);
  }, []);

  const handleMouseEnterMenu = useCallback(() => {
    clearTimeout(closeTimeoutId);
  }, [closeTimeoutId]);

  const handleMouseLeaveMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClick = useCallback(() => {
    navigate(`/category/${onClick}`);
    setAnchorEl(null);
  }, [navigate, onClick]);

  useEffect(() => {
    return () => clearTimeout(closeTimeoutId);
  }, [closeTimeoutId]);

  const StyledButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "isMenuOpen",
  })(({ theme, isMenuOpen }) => ({
    margin: "0 4px",
    padding: "8px 16px",
    fontWeight: 400,
    fontSize: "16px",
    color: "var(--text-color)",
    textTransform: "none",
    transition: "all 0.2s ease",
    position: "relative",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: isMenuOpen ? "100%" : 0,
      height: "2px",
      backgroundColor: "currentColor",
      transition: "width 0.3s ease",
    },
  }));

  const MenuItem = ({ item }) => (
    <Link to={`/category/${onClick}`} style={{ textDecoration: "none" }}>
      <Typography
        sx={{
          cursor: "pointer",
          fontSize: "14px",
          color: "black",
          textAlign: "left",
          fontWeight: 300,
          transition: "color 0.2s ease",
          "&:hover": {
            color: "var(--text-color)",
            fontWeight: 200,
            borderBottom: "1px solid",
          },
        }}
      >
        {item}
      </Typography>
    </Link>
  );

  // Split the list into 4 columns with specific key assignments
  const column1 = list.slice(0, 2); // First column: 2 keys (e.g., Offers, New In)
  const column2 = list.slice(2, 3); // Second column: 1 key (e.g., Clothing)
  const column3 = list.slice(3, 5); // Third column: 2 keys (e.g., Sport, Accessories)
  const column4 = list.slice(5, 6); // Fourth column: 1 key (e.g., Shoes)

  return (
    <Box sx={{ position: "relative" }}>
      <StyledButton
        onMouseEnter={handleMouseEnterButton}
        onMouseLeave={handleMouseLeaveButton}
        onClick={handleClick}
        isMenuOpen={Boolean(anchorEl)}
      >
        {comp}
      </StyledButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && !isSignInOpen}
        onClose={handleMouseLeaveMenu}
        MenuListProps={{
          onMouseLeave: handleMouseLeaveMenu,
          onMouseEnter: handleMouseEnterMenu,
          sx: {
            padding: 0,
            width: "100%",
            backgroundColor: "#FAF9F8",
          },
        }}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "100%",
            top: `${NAVBAR_HEIGHT}px !important`,
            left: "0 !important",
            borderRadius: 0,
            backgroundColor: "#FAF9F8",
            boxShadow: "none",
            marginTop: "0px",
            zIndex: MENU_Z_INDEX,
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <StyledMenuBox onMouseLeave={handleMouseLeaveMenu}>
          <Box
            sx={{
              display: "flex",
              gap: "60px",
              width: "100%",
              maxWidth: "1200px",
              justifyContent: "center",
              padding: "0 40px",
              backgroundColor: "#FAF9F8",
            }}
          >
            {/* Column 1: 2 keys */}
            <Stack spacing={1} sx={{ px: 0, py: 0 }} alignItems="flex-start">
              {column1.map((el, i) => (
                <Stack key={i} spacing={0.1} alignItems="flex-start">
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "13px",
                      color: grey[800],
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      mb: 1,
                    }}
                  >
                    {el.key}
                  </Typography>
                  {el?.key_data?.map((item, index) => (
                    <MenuItem key={index} item={item} />
                  ))}
                </Stack>
              ))}
            </Stack>

            {/* Column 2: 1 key */}
            <Stack spacing={2} sx={{ px: 0, py: 0 }} alignItems="flex-start">
              {column2.map((el, i) => (
                <Stack key={i} spacing={0.1} alignItems="flex-start">
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "13px",
                      color: "black",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      mb: 1,
                    }}
                  >
                    {el.key}
                  </Typography>
                  {el?.key_data?.map((item, index) => (
                    <MenuItem key={index} item={item} />
                  ))}
                </Stack>
              ))}
            </Stack>

            {/* Column 3: 2 keys */}
            <Stack spacing={2} sx={{ px: 0, py: 0 }} alignItems="flex-start">
              {column3.map((el, i) => (
                <Stack key={i} spacing={0.1} alignItems="flex-start">
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "13px",
                      color: grey[800],
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      mb: 1,
                    }}
                  >
                    {el.key}
                  </Typography>
                  {el?.key_data?.map((item, index) => (
                    <MenuItem key={index} item={item} />
                  ))}
                </Stack>
              ))}
            </Stack>

            {/* Column 4: 1 key */}
            <Stack spacing={2} sx={{ px: 0, py: 0 }} alignItems="flex-start">
              {column4.map((el, i) => (
                <Stack key={i} spacing={0.1} alignItems="flex-start">
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "13px",
                      color: grey[800],
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      mb: 1,
                    }}
                  >
                    {el.key}
                  </Typography>
                  {el?.key_data?.map((item, index) => (
                    <MenuItem key={index} item={item} />
                  ))}
                </Stack>
              ))}
            </Stack>
          </Box>
        </StyledMenuBox>
      </Menu>
    </Box>
  );
};
