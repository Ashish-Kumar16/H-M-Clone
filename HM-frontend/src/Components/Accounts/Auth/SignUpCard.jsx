import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/authSlice";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
  Collapse,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSnackbar } from "notistack";

const FormContainer = styled(Box)({
  backgroundColor: "white",
  padding: "1.5rem",
  borderRadius: "0.5rem",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  maxWidth: "500px",
  width: "100%",
  position: "relative",
  overflow: "visible",
});

const CloseButton = styled(Button)({
  color: "#6b7280",
  fontSize: "48px",
  width: "3rem",
  height: "3rem",
  minWidth: "auto",
});

const SubmitButton = styled(Button)({
  width: "100%",
  backgroundColor: "black",
  color: "white",
  padding: "0.5rem 0",
  borderRadius: "0.25rem",
  marginBottom: "1rem",
  "&:hover": {
    backgroundColor: "#1a1a1a",
  },
});

const SignInButton = styled(Button)({
  width: "100%",
  border: "1px solid black",
  color: "black",
  padding: "0.5rem 0",
  borderRadius: "0.25rem",
});

const ExpandButton = styled(Button)({
  width: "100%",
  justifyContent: "space-between",
  textTransform: "none",
  padding: "0.5rem 0",
  color: "black",
  fontWeight: "bold",
  "&:hover": {
    color: "#dc2626",
  },
});

const SignUpCard = ({ onSignInClick }) => {
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { status, error } = useSelector((state) => state.auth);

  const handleSignUp = (e) => {
    e.preventDefault();
    const dateOfBirth = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0",
    )}`;
    const userData = {
      email,
      pass,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      gender: gender || null,
      dateOfBirth: dateOfBirth || null,
      postalCode: postalCode || null,
    };

    dispatch(registerUser(userData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        enqueueSnackbar("Registration successful! Please sign in.", {
          variant: "success",
        });
        onSignInClick();
      } else {
        enqueueSnackbar(error || "Registration failed", { variant: "error" });
      }
    });
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Become an H&M member
        </Typography>
        <CloseButton onClick={onSignInClick}>×</CloseButton>
      </Box>

      <Typography variant="body2" sx={{ mb: 1 }}>
        Become a member — don't miss out on deals, offers, discounts and bonus
        vouchers.
      </Typography>

      <form onSubmit={handleSignUp}>
        {/* Email Field */}
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "medium", mb: 0.5 }}>
            Email *
          </Typography>
          <TextField
            fullWidth
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "0.25rem" } }}
          />
        </Box>

        {/* Password Field */}
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "medium", mb: 0.5 }}>
            Create a password *
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "0.25rem" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="caption" sx={{ color: "#6b7280", mt: 0.25 }}>
            Minimum 8 characters, including 1 lowercase, 1 uppercase, and 1
            number
          </Typography>
        </Box>

        {/* Date of Birth */}
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "medium", mb: 0.5 }}>
            Date of birth *
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              placeholder="DD"
              required
              value={day}
              onChange={(e) => setDay(e.target.value)}
              sx={{
                width: "33%",
                "& .MuiOutlinedInput-root": { borderRadius: "0.25rem" },
              }}
            />
            <TextField
              placeholder="MM"
              required
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              sx={{
                width: "33%",
                "& .MuiOutlinedInput-root": { borderRadius: "0.25rem" },
              }}
            />
            <TextField
              placeholder="YYYY"
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
              sx={{
                width: "33%",
                "& .MuiOutlinedInput-root": { borderRadius: "0.25rem" },
              }}
            />
          </Box>
          <Typography variant="caption" sx={{ color: "#6b7280", mt: 0.25 }}>
            H&M wants to give you a special treat on your birthday
          </Typography>
        </Box>

        {/* Gender Select */}
        <Box sx={{ mb: 1, position: "relative" }}>
          <Typography variant="body2" sx={{ fontWeight: "medium", mb: 0.5 }}>
            Gender
          </Typography>
          <Select
            fullWidth
            value={gender}
            onChange={handleGenderChange}
            displayEmpty
            sx={{
              borderRadius: "0.25rem",
              "& .MuiSelect-select": {
                padding: "16.5px 14px",
                backgroundColor: "transparent",
              },
            }}
            MenuProps={{
              disablePortal: true,
              PaperProps: {
                sx: {
                  zIndex: 200,
                  borderRadius: "0.25rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                },
              },
            }}
          >
            <MenuItem value="">
              <em>Select a gender</em>
            </MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </Box>

        {/* Expandable Section */}
        <Box sx={{ mb: 1 }}>
          <ExpandButton
            onClick={() => setExpanded(!expanded)}
            endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          >
            ADD MORE & GET MORE
          </ExpandButton>
          <Collapse in={expanded}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Did you know that if you add some more information below you will
              earn more points and get a more personalized experience? How great
              is that!
            </Typography>

            {/* First Name */}
            <Box sx={{ mb: 1 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: "medium", mb: 0.5 }}
              >
                First name
              </Typography>
              <TextField
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "0.25rem" } }}
              />
            </Box>

            {/* Last Name */}
            <Box sx={{ mb: 1 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: "medium", mb: 0.5 }}
              >
                Last name
              </Typography>
              <TextField
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "0.25rem" } }}
              />
            </Box>

            {/* Postal Code */}
            <Box sx={{ mb: 1 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: "medium", mb: 0.5 }}
              >
                Postal Code
              </Typography>
              <TextField
                fullWidth
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "0.25rem" } }}
              />
            </Box>
          </Collapse>
        </Box>

        {/* Checkbox and Legal Text */}
        <Box sx={{ mb: 1 }}>
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography variant="body2">
                Yes, email me offers, style updates, and special invites to
                sales and events.
              </Typography>
            }
          />
        </Box>

        <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
          Wish your inbox was more stylish? No problem, just subscribe to our
          newsletter. Find out what's hot and happening in the world of fashion,
          beauty, and home decor. Plus, you'll get bonus vouchers and special
          invites to sales and events - straight to your inbox!
        </Typography>

        <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
          By clicking 'Become a member', I agree to the H&M Membership{" "}
          <a href="#" style={{ textDecoration: "underline" }}>
            Terms and conditions
          </a>
          . To give you the full membership experience, we will process your
          personal data in accordance with the H&M's{" "}
          <a href="#" style={{ textDecoration: "underline" }}>
            Privacy Notice
          </a>
          .
        </Typography>

        {/* Submit Button */}
        <SubmitButton
          type="submit"
          disabled={
            status === "loading" || !email || !pass || !day || !month || !year
          }
        >
          {status === "loading" ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Become an H&M member"
          )}
        </SubmitButton>

        {/* Sign In Button */}
        <SignInButton onClick={onSignInClick}>Sign in</SignInButton>
      </form>
    </FormContainer>
  );
};

export default SignUpCard;
