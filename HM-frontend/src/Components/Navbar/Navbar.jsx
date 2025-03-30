import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  Button,
  InputAdornment,
  TextField,
  Snackbar,
  Alert,
  styled,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { CiUser, CiSearch, CiHeart, CiBag1 } from "react-icons/ci";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/authSlice";
import { searchProductsByQuery } from "../../redux/productSlice"; // Import the search thunk
import logo from "../../assets/logohm.png";
import { SignIn } from "../Accounts/Auth/SigninCard";
import { NavbarSec } from "./NavbarItems";
import { ladies, men, kids, home, baby } from "./subCategory";
import { MobileNavbar } from "./MobileNavbar"; // Import MobileNavbar

// Styled Components
const StyledAppBar = styled(AppBar)({
  backgroundColor: "#f8f7f5",
  width: "100%",
  height: "72px",
  boxShadow: "none",
});

const Logo = styled("img")({
  width: "40px",
  height: "40px",
  marginLeft: "16px",
});

const IconContainer = styled(Box)({
  display: "flex",
  gap: "24px",
});

const StyledIconButton = styled(IconButton)({
  color: "#000000",
  padding: "0",
  "& svg": {
    width: "24px",
    height: "24px",
    color: "#000000",
  },
});

const NavbarContainer = styled(Box)({
  position: "relative",
  zIndex: 100,
});

const TopBar = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: 100,
  padding: theme.spacing(2.5),
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "var(--navbar-bg-color)",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.25),
    minHeight: 80,
  },
}));

const NavSection = styled(Box)({
  width: "30%",
  gap: 20,
  display: "flex",
  alignItems: "center",
});

const LogoContainer = styled(Box)({
  width: "60px",
  margin: "auto",
  "& img": {
    objectFit: "contain",
    maxWidth: "100%",
  },
});

const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "as",
})(({ as }) => ({
  cursor: "pointer",
  color: "var(--text-color)",
  fontSize: 14,
  fontWeight: 400,
  textTransform: "none",
  ...(as === "span" && { background: "none", border: "none", padding: 0 }), // Render as non-button when as="span"
}));

const SecondaryNav = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundColor: "#faf9f8",
  zIndex: 1200,
  height: 60,
  display: "flex",
  alignItems: "center",
  width: "95%",
  margin: "0 auto",
  paddingBottom: theme.spacing(2.5),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const SearchField = styled(TextField)({
  "& .MuiInput-underline:before": { borderBottomColor: "gray" },
  "& .MuiInput-underline:after": { borderBottomColor: "gray.100" },
  "& input": { fontSize: 16 },
});

// Navbar Component
export const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuTimeout, setMenuTimeout] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart?.items || []);
  const isAuthenticated = !!user;

  useEffect(() => {
    // Simulate loading delay for the navbar (replace with actual loading logic if needed)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = () => {
    dispatch(signOut()).then(() => {
      setSnackbarOpen(true);
      handleMenuClose();
      navigate("/");
    });
  };

  const handleMyaccount = () => {
    handleMenuClose();
    navigate("/account");
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      dispatch(searchProductsByQuery(searchQuery))
        .unwrap()
        .then(() => {
          navigate(`/search?query=${searchQuery}`);
        })
        .catch((error) => {
          console.error("Search failed:", error);
        });
    }
  };

  const handleMenuHover = (menuKey) => {
    if (menuTimeout) {
      clearTimeout(menuTimeout);
      setMenuTimeout(null);
    }
    setActiveMenu(menuKey);
  };

  const handleMenuLeave = () => {
    const timeoutId = setTimeout(() => {
      setActiveMenu(null);
    }, 300); // Reduced delay for smoother transition
    setMenuTimeout(timeoutId);
  };

  const menuItems = [
    { text: "Ladies", path: "/ladies" },
    { text: "Men", path: "/men" },
    { text: "Baby", path: "/kids" },
    { text: "Kids", path: "/kids" },
    { text: "Home", path: "/home" },
    { text: "Sustainability", path: "/sustainability" },
    { text: "Customer Service", path: "/customer-service" },
    { text: "Newsletter", path: "/newsletter" },
  ];

  // Render skeleton placeholders while loading
  if (loading) {
    if (isMobile) {
      return (
        <NavbarContainer>
          <StyledAppBar position="static">
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px",
                minHeight: "72px !important",
                backgroundColor: "#f8f7f5",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* MobileNavbar placeholder */}
                <Skeleton variant="circular" width={40} height={40} />
                <Box ml={2}>
                  <Skeleton variant="rectangular" width={60} height={40} />
                </Box>
              </Box>
              <IconContainer>
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="circular" width={30} height={30} />
              </IconContainer>
            </Toolbar>
          </StyledAppBar>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={20}
            sx={{ mt: 2 }}
          />
        </NavbarContainer>
      );
    }
    return (
      <NavbarContainer>
        {/* TopBar skeleton */}
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="rectangular" width="100%" height={100} />
        </Box>
        {/* SecondaryNav skeleton */}
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="rectangular" width="100%" height={60} />
        </Box>
      </NavbarContainer>
    );
  }

  if (isMobile) {
    return (
      <NavbarContainer>
        <StyledAppBar position="static">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "16px",
              minHeight: "72px !important",
              backgroundColor: "#f8f7f5",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <MobileNavbar /> {/* Replace menu button with MobileNavbar */}
              <Link to="/">
                <Logo src={logo} alt="H&M logo" />
              </Link>
            </Box>
            <IconContainer>
              <StyledIconButton
                component={Link}
                to={isAuthenticated ? "#" : "/signin"}
                onClick={
                  !isAuthenticated ? () => setIsOpen(true) : handleMenuOpen
                }
              >
                <PersonIcon />
              </StyledIconButton>
              <StyledIconButton>
                <SearchIcon />
              </StyledIconButton>
              <StyledIconButton component={Link} to="/favourite">
                <FavoriteIcon />
              </StyledIconButton>
              <StyledIconButton component={Link} to="/cart">
                <ShoppingBagIcon />
              </StyledIconButton>
            </IconContainer>
          </Toolbar>
        </StyledAppBar>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
        </Menu>
        <SignIn isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Logged out successfully
          </Alert>
        </Snackbar>
      </NavbarContainer>
    );
  }

  return (
    <NavbarContainer>
      <Box className="nav">
        <TopBar className="navbar_box_1">
          <NavSection className="navbar_left">
            <NavButton component={Link} to="/sustainability">
              Sustainability
            </NavButton>
            <NavButton component={Link} to="/customer-service">
              Customer Service
            </NavButton>
            <NavButton component={Link} to="/newsletter">
              Newsletter
            </NavButton>
            <BiDotsHorizontalRounded fontSize={20} />
          </NavSection>
          <LogoContainer className="navbar_logo">
            <Link to="/">
              <img src={logo} alt="hm_logo" />
            </Link>
          </LogoContainer>
          <NavSection
            className="navbar_right"
            sx={{ justifyContent: "flex-end" }}
          >
            {isAuthenticated ? (
              <>
                <Button onClick={handleMenuOpen}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CiUser fontSize={24} />
                    <NavButton as="span">My Account</NavButton>
                  </Box>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMyaccount}>My Account</MenuItem>
                  <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
                </Menu>
              </>
            ) : (
              <Box
                display="flex"
                alignItems="center"
                onClick={() => setIsOpen(true)}
                sx={{ cursor: "pointer" }}
              >
                <CiUser fontSize={24} />
                <NavButton>Sign In</NavButton>
              </Box>
            )}
            <Link to="/favourite" style={{ textDecoration: "none" }}>
              <Box display="flex" alignItems="center">
                <CiHeart fontSize={24} />
                <NavButton as="span">Favourites</NavButton>
              </Box>
            </Link>
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <Box display="flex" alignItems="center">
                <CiBag1 fontSize={24} />
                <NavButton as="span">Shopping Bag ({cart.length})</NavButton>
              </Box>
            </Link>
          </NavSection>
        </TopBar>
      </Box>
      <SecondaryNav className="navbar_box_2">
        <Box flex={1} />
        <Box flex={4} display="flex" justifyContent="center" gap={0}>
          <NavbarSec
            comp="Ladies"
            list={ladies}
            onClick="ladies"
            isSignInOpen={isOpen}
            isActive={activeMenu === "ladies"}
            onHover={() => handleMenuHover("ladies")}
            onLeave={handleMenuLeave}
          />
          <NavbarSec
            comp="Men"
            list={men}
            onClick="mens"
            isSignInOpen={isOpen}
            isActive={activeMenu === "men"}
            onHover={() => handleMenuHover("men")}
            onLeave={handleMenuLeave}
          />
          <NavbarSec
            comp="Baby"
            list={baby}
            onClick="kids"
            isSignInOpen={isOpen}
          />
          <NavbarSec
            comp="Kids"
            list={kids}
            onClick="kids"
            isSignInOpen={isOpen}
          />
          <NavbarSec
            comp="Home"
            list={home}
            onClick="home"
            isSignInOpen={isOpen}
          />
        </Box>
        <Box flex={1}>
          <SearchField
            variant="standard"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CiSearch fontSize={27} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </SecondaryNav>
      <SignIn isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Logged out successfully
        </Alert>
      </Snackbar>
    </NavbarContainer>
  );
};
