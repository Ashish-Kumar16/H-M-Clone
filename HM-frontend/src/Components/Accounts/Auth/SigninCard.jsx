import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut } from "../../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Modal,
  CircularProgress,
  Skeleton,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSnackbar } from "notistack";
import SignUpCard from "./SignUpCard";

// Styled Components
const StyledCard = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: theme.spacing(2), // Reduced padding to match the image
  borderRadius: "0.5rem",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Softer shadow
  width: "400px", // Narrower width to match the image
  boxSizing: "border-box",
  zIndex: 1501,
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    padding: theme.spacing(1.5),
  },
}));

const CloseButton = styled(Button)(({ theme }) => ({
  fontSize: "24px", // Smaller close button to match the image
  width: "24px",
  height: "24px",
  minWidth: "24px",
  color: "#6b7280",
  padding: 0,
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
    width: "20px",
    height: "20px",
    minWidth: "20px",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(0.75), // Smaller padding for a shorter button
  borderRadius: "0.25rem",
  textTransform: "none",
  fontSize: "0.875rem", // Smaller font size
  fontWeight: 500,
}));

const ShowButton = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem", // Small font for "SHOW"
  color: "#6b7280",
  cursor: "pointer",
  userSelect: "none",
}));

export const SignIn = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { user, status, error } = useSelector((state) => state.auth);

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signIn({ email, pass })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        enqueueSnackbar("Login successful", { variant: "success" });
        onClose();
        // navigate("/");
      } else {
        enqueueSnackbar(error || "Something went wrong", { variant: "error" });
      }
    });
  };

  const handleSignOut = () => {
    dispatch(signOut()).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        enqueueSnackbar("Logout successful", { variant: "success" });
      } else {
        enqueueSnackbar("Logout failed", { variant: "error" });
      }
    });
  };

  const isButtonEnabled = email && pass; // Enable button only if both fields are filled

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        sx={{
          zIndex: 1500,
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <StyledCard>
          {status === "loading" ? (
            <>
              <Skeleton variant="text" width={100} height={40} sx={{ mb: 2 }} />
              <Skeleton
                variant="text"
                width="100%"
                height={20}
                sx={{ mb: { xs: 4, sm: 6 } }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={56}
                sx={{ mb: 4 }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={56}
                sx={{ mb: 4 }}
              />
              <Skeleton
                variant="text"
                width={150}
                height={20}
                sx={{ mb: { xs: 4, sm: 6 } }}
              />
              <Skeleton variant="rectangular" width="100%" height={36} />
            </>
          ) : (
            <form onSubmit={handleSignIn}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1, // Reduced margin to match the image
                }}
              >
                <Typography
                  variant="h6" // Smaller than h5
                  sx={{ fontWeight: 600, color: "#374151" }}
                >
                  Sign In
                </Typography>
                <CloseButton onClick={onClose}>×</CloseButton>
              </Box>

              <Typography
                sx={{
                  color: "#6b7280",
                  fontSize: "0.875rem", // Smaller font size
                  mb: 2, // Reduced margin
                }}
              >
                Become a member — don’t miss out on deals, offers, discounts and
                bonus vouchers.
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    color: "#374151",
                    fontSize: "0.875rem", // Smaller label
                    mb: 0.5,
                  }}
                >
                  Email <span style={{ color: "#ef4444" }}>*</span>
                </Typography>
                <TextField
                  id="email"
                  type="email"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.25rem",
                      "& fieldset": {
                        borderColor: "#d1d5db", // Light gray border
                      },
                      "&:hover fieldset": {
                        borderColor: "#d1d5db",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#d1d5db",
                        borderWidth: "1px", // Thinner border when focused
                      },
                      backgroundColor: "transparent", // No background fill
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "8px 12px", // Smaller input height
                      fontSize: "0.875rem",
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    color: "#374151",
                    fontSize: "0.875rem",
                    mb: 0.5,
                  }}
                >
                  Password <span style={{ color: "#ef4444" }}>*</span>
                </Typography>
                <TextField
                  id="password"
                  type={show ? "text" : "password"}
                  fullWidth
                  required
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.25rem",
                      "& fieldset": {
                        borderColor: "#d1d5db",
                      },
                      "&:hover fieldset": {
                        borderColor: "#d1d5db",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#d1d5db",
                        borderWidth: "1px",
                      },
                      backgroundColor: "transparent",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "8px 12px",
                      fontSize: "0.875rem",
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <ShowButton onClick={() => setShow(!show)}>
                          {show ? "HIDE" : "SHOW"}
                        </ShowButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      id="remember"
                    />
                  }
                  label="Remember me"
                  sx={{
                    color: "#374151",
                    "& .MuiTypography-root": {
                      color: "#374151",
                      fontSize: "0.875rem",
                    },
                  }}
                />
                <Link
                  href="#"
                  sx={{
                    color: "#374151",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              <StyledButton
                type="submit"
                disabled={status === "loading" || !isButtonEnabled}
                sx={{
                  backgroundColor: isButtonEnabled ? "black" : "#d1d5db", // Black when enabled, gray when disabled
                  color: "white",
                  "&:hover": {
                    backgroundColor: isButtonEnabled ? "#1f2937" : "#d1d5db",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#d1d5db",
                    color: "white",
                  },
                }}
              >
                {status === "loading" ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign In"
                )}
              </StyledButton>

              {user && (
                <StyledButton
                  onClick={handleSignOut}
                  sx={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    "&:hover": { backgroundColor: "#b91c1c" },
                  }}
                >
                  Sign out
                </StyledButton>
              )}

              <Link
                href="#"
                onClick={() => {
                  onClose();
                  setSignUpOpen(true);
                }}
                sx={{
                  color: "#374151",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  display: "block",
                  textAlign: "center",
                  mt: 2,
                }}
              >
                Not a member yet? Join here!
              </Link>
            </form>
          )}
        </StyledCard>
      </Modal>

      <Modal
        open={signUpOpen}
        onClose={() => setSignUpOpen(false)}
        sx={{
          zIndex: 1500,
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <SignUpCard
            onSignInClick={() => {
              setSignUpOpen(false);
              onClose(false);
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default SignIn;
