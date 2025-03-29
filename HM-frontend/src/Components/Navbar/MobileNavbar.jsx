import React from "react";
import { Box, IconButton, Drawer, Stack, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import ladiesImg from "../../assets/images/Ladies1.jpeg";
import menImg from "../../assets/images/Men1.jpeg";
import babyImg from "../../assets/images/Baby1.jpeg";
import kidsImg from "../../assets/images/Kids1.jpeg";
import homeImg from "../../assets/images/Home1.jpeg";
import saleImg from "../../assets/images/Sale1 (1).png";

export const MobileNavbar = () => {
  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Ladies", route: "ladies", imgSrc: ladiesImg },
    { label: "Men", route: "mens", imgSrc: menImg },
    { label: "Baby", route: "baby", imgSrc: babyImg },
    { label: "Kids", route: "kids", imgSrc: kidsImg },
    { label: "Home", route: "home", imgSrc: homeImg },
    { label: "Sale", route: "sale", imgSrc: saleImg },
  ];

  const handleClick = (route) => {
    setOpen(false);
    navigate(`/category/${route}`);
  };

  return (
    <div className={styles.mobile_nav}>
      <IconButton
        ref={btnRef}
        onClick={() => setOpen(true)}
        sx={{ display: { xs: "block", md: "none" } }} // Show on mobile, hide on md and up
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: "250px" } }}
      >
        <Box sx={{ p: 2, position: "relative" }}>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Stack sx={{ mt: 6 }} spacing={2}>
            {menuItems.map((item, index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                onClick={() => handleClick(item.route)}
                sx={{
                  cursor: "pointer",
                  "&:hover": { color: "var(--text-color-hover)" },
                }}
              >
                <img
                  src={item.imgSrc}
                  alt={item.label}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
                <Typography
                  sx={{ ml: 2, fontSize: "1.125rem", fontWeight: 500 }}
                >
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Drawer>
    </div>
  );
};
