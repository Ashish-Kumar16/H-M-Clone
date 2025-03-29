import React from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import {
  LocalShipping as LocalShippingIcon,
  Settings as SettingsIcon,
  MonetizationOn as MonetizationOnIcon,
  Badge as BadgeIcon, // Replacing IdCard with Badge
  Email as EmailIcon,
  ExitToApp as ExitToAppIcon,
  Feedback as FeedbackIcon,
  GroupAdd as GroupAddIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; // Add this import

export const AccountDetail = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div
      style={{
        backgroundColor: "#F9FAFB",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <div style={{ padding: "16px" }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "375px",
                }}
              >
                <img
                  src="https://www2.hm.com/content/dam/member%20card%20NS%20DK.png" // Updated to match MemberPage size
                  alt="Two models showcasing fashion"
                  style={{
                    width: "375px",
                    height: "375px",
                    borderRadius: "8px",
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    position: "absolute",
                    top: "16px", // top-4
                    right: "16px", // right-4
                    backgroundColor: "#000", // bg-black
                    color: "#fff", // text-white
                    padding: "8px 16px", // py-2 px-4
                    borderRadius: "4px", // rounded
                    display: "flex",
                    alignItems: "center", // flex items-center
                    "&:hover": {
                      backgroundColor: "#333", // Darker shade on hover
                    },
                  }}
                >
                  <BadgeIcon sx={{ marginRight: "8px" }} />{" "}
                  {/* Replaced IdCard with Badge */}
                  View member ID
                </Button>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "16px", // bottom-4
                    left: "50%",
                    transform: "translateX(-50%)", // transform -translate-x-1/2
                    backgroundColor: "#F1EBDF", // bg-white
                    padding: "16px", // p-4
                    borderRadius: "8px", // rounded
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // shadow-lg
                    width: "91.666%", // w-11/12
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between", // justify-between
                      alignItems: "center", // items-center
                      marginBottom: "8px", // mb-2
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#DC2626", // text-red-600
                        fontWeight: "bold", // font-bold
                        fontSize: "1.125rem", // text-lg
                      }}
                    >
                      Hello {user?.firstName?.toUpperCase() || "USER"}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#4B5563", // text-gray-600
                      }}
                    >
                      H&M Member
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center", // items-center
                      marginBottom: "8px", // mb-2
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#4B5563", // text-gray-600
                        fontSize: "0.875rem", // text-sm
                      }}
                    >
                      0
                    </Typography>
                    <Box
                      sx={{
                        flex: 1, // flex-1
                        marginLeft: "8px", // mx-2
                        marginRight: "8px",
                        height: "4px", // h-1
                        backgroundColor: "#D1D5DB", // bg-gray-300
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          height: "4px", // h-1
                          backgroundColor: "#DC2626", // Changed to match earlier red theme
                          width: "50%", // Adjusted to show progress
                        }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        color: "#4B5563", // text-gray-600
                        fontSize: "0.875rem", // text-sm
                      }}
                    >
                      200
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#4B5563", // text-gray-600
                      fontSize: "0.875rem", // text-sm
                    }}
                  >
                    You're 200 points away from your next voucher! Vouchers have
                    a 30-day delay. Swipe to know more!
                  </Typography>
                </Box>
              </Box>
            </div>
            <List sx={{ mt: 2 }}>
              {[
                {
                  text: "Orders",
                  color: "black",
                  icon: <LocalShippingIcon />,
                  bg: "#FFFFFF",
                  path: "/account/purchases",
                },
                {
                  text: "Account settings",
                  icon: <SettingsIcon />,
                  bg: "#F9FAFB",
                  path: "/account/settings",
                },
                {
                  text: "Points",
                  icon: <MonetizationOnIcon />,
                  bg: "#FFFFFF",
                  path: "#",
                },
                {
                  text: "H&M Membership",
                  icon: <BadgeIcon />,
                  bg: "#F9FAFB",
                  path: "#",
                },
                {
                  text: "Contact us",
                  icon: <EmailIcon />,
                  bg: "#FFFFFF",
                  path: "#",
                },
                {
                  text: "Sign out",
                  icon: <ExitToAppIcon />,
                  bg: "#F9FAFB",
                  path: "#",
                },
                {
                  text: "Help us improve",
                  icon: <FeedbackIcon />,
                  bg: "#FFFFFF",
                  path: "#",
                },
                {
                  text: "Invite a friend",
                  icon: <GroupAddIcon />,
                  bg: "#F9FAFB",
                  path: "#",
                },
              ].map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    backgroundColor: item.bg,
                    p: 2,
                    color: "black",
                    fontSize: "0.875rem",
                  }}
                  component={Link}
                  to={item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  <ChevronRightIcon />
                </ListItem>
              ))}
            </List>
          </Grid>
          {/* Main Content */}
          <Grid item xs={12} md={8} sx={{ pl: { md: "50px" } }}>
            <Outlet /> {/* Renders the nested route components */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AccountDetail;
