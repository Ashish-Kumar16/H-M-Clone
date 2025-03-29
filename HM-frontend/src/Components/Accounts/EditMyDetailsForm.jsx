import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  IconButton,
} from "@mui/material";
import { updateUser } from "../../redux/authSlice"; // Adjust the import path
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const EditMyDetailsForm = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    dateOfBirth: user?.dateOfBirth
      ? new Date(user.dateOfBirth).toISOString().split("T")[0]
      : "",
    phoneNumber: user?.phoneNumber || "",
    gender: user?.gender || "",
    market: user?.address?.country || "India",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        phoneNumber: formData.phoneNumber,
        address: {
          ...user?.address,
          postalCode: formData.postalCode,
          country: formData.market,
        },
      };
      if (formData.email !== user?.email) {
        updatedData.email = formData.email;
      }
      if (formData.password) {
        updatedData.pass = formData.password; // Backend will hash it
      }

      await dispatch(updateUser(updatedData)).unwrap();
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "white",
        borderRadius: 2,
        maxWidth: 500,
        mx: "auto",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Edit My Details
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Email *
          </Typography>
          <TextField
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: <CheckCircleIcon sx={{ color: "green" }} />,
            }}
          />
          <Typography variant="caption" sx={{ color: "#4B5563", mt: 1 }}>
            Remember, if you change your email, you need to confirm it. Make
            sure you click on the link in the confirmation email we sent you.
          </Typography>
        </Box>

        {/* First Name */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            First name *
          </Typography>
          <TextField
            fullWidth
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: <CheckCircleIcon sx={{ color: "green" }} />,
            }}
          />
        </Box>

        {/* Last Name */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Last name *
          </Typography>
          <TextField
            fullWidth
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: <CheckCircleIcon sx={{ color: "green" }} />,
            }}
          />
        </Box>

        {/* Date of Birth */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Date of birth *
          </Typography>
          <TextField
            fullWidth
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: <CheckCircleIcon sx={{ color: "green" }} />,
            }}
          />
        </Box>

        {/* Phone Number */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Phone number
          </Typography>
          <TextField
            fullWidth
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                  <img
                    src="https://flagcdn.com/16x12/in.png"
                    alt="India flag"
                    style={{ marginRight: 4 }}
                  />
                  <Typography variant="body2">+91</Typography>
                </Box>
              ),
              endAdornment: <CheckCircleIcon sx={{ color: "green" }} />,
            }}
          />
        </Box>

        {/* Postal Code */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Postal Code
          </Typography>
          <TextField
            fullWidth
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: <CheckCircleIcon sx={{ color: "green" }} />,
            }}
          />
        </Box>

        {/* Gender */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Gender *
          </Typography>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Please select a gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              label="Please select a gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Gender */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Gender *
          </Typography>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Please select a gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              label="Please select a gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Staff Card */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Staff card
          </Typography>
          <TextField fullWidth variant="outlined" size="small" disabled />
        </Box>

        {/* Market */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Market
          </Typography>
          <TextField
            fullWidth
            name="market"
            value={formData.market}
            onChange={handleChange}
            variant="outlined"
            size="small"
            disabled
            sx={{ bgcolor: "#E5E7EB" }}
          />
        </Box>

        {/* Password */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Password (optional)
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <Typography variant="caption" sx={{ color: "#4B5563", mt: 1 }}>
            Only mandatory if email address is changed
          </Typography>
        </Box>

        {/* Privacy Notice */}
        <Typography
          variant="caption"
          sx={{ color: "#4B5563", mb: 2, display: "block" }}
        >
          H&M will process your data in accordance with the H&M Privacy Notice
        </Typography>

        {/* Buttons */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ bgcolor: "black", color: "white", mb: 1 }}
        >
          Save
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={onClose}
          sx={{ borderColor: "black", color: "black" }}
        >
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default EditMyDetailsForm;
