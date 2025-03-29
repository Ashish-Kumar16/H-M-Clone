// components/Signup.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  IconButton,
  Skeleton,
  MenuItem,
  Select,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSnackbar } from "notistack";
import { SignIn } from "./Auth/SigninCard";
import styles from "./Signup.module.css";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [show, setShow] = useState(false);
  const [pass, setPass] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignUp = () => {
    setIsLoading(true);
    const userData = { email, pass, firstName, lastName, gender };

    dispatch(registerUser(userData)).then((result) => {
      setIsLoading(false);
      if (result.meta.requestStatus === "fulfilled") {
        enqueueSnackbar("Sign up successful! Please Login.", {
          variant: "success",
        });
        navigate("/");
      } else {
        enqueueSnackbar(result.payload.error || "Sign up failed", {
          variant: "error",
        });
      }
    });
  };

  return (
    <div className={styles.signup_box}>
      {isLoading ? (
        <>
          <Skeleton variant="text" width={200} height={40} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="100%" height={20} sx={{ mb: 2 }} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={56}
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={56}
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={36}
            sx={{ mb: 2 }}
          />
          <Skeleton variant="rectangular" width="100%" height={36} />
        </>
      ) : (
        <>
          <Typography variant="h5" fontWeight={500} gutterBottom>
            BECOME A MEMBER
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Become a member — don’t miss out on deals, offers, discounts, and
            bonus vouchers.
          </Typography>
          <Box className={styles.signup_form_box}>
            <TextField
              required
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <TextField
              required
              fullWidth
              label="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type={show ? "text" : "password"}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShow(!show)} edge="end">
                      {show ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <Accordion defaultExpanded sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>ADD MORE & GET MORE</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Select
                  required
                  fullWidth
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  displayEmpty
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="" disabled>
                    Select a Gender
                  </MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </AccordionDetails>
            </Accordion>

            <Button
              fullWidth
              variant="contained"
              onClick={handleSignUp}
              sx={{ mb: 2 }}
            >
              Become a Member
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={() => setIsOpen(true)}
            >
              Sign In
            </Button>
          </Box>

          <SignIn isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
      )}
    </div>
  );
};
