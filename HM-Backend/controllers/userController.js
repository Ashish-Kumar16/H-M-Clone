const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
require("dotenv").config();

const access_secretKey = process.env.ACCESS_SECRET_KEY;
const refresh_secretKey = process.env.REFRESH_SECRET_KEY;

// Register a new user
const registerUser = async (req, res) => {
  const {
    email,
    pass,
    firstName,
    lastName,
    gender,
    dateOfBirth,
    postalCode,
    address,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    const newUser = new User({
      email,
      pass: hashedPassword,
      firstName,
      lastName,
      gender: gender || undefined,
      dateOfBirth: dateOfBirth || undefined,
      postalCode: postalCode || undefined,
      address: address || undefined,
    });

    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, pass } = req.body;
  console.log(`Received login request for email: ${email}`);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(pass, user.pass);
    console.log("Stored hash:", user.pass); // Debug log
    console.log("Password valid:", isPasswordValid); // Debug log
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    const ACCESS_TOKEN = jwt.sign(
      { userID: user._id, user: user.email },
      access_secretKey,
      { expiresIn: "1h" },
    );
    const REFRESH_TOKEN = jwt.sign(
      { userID: user._id, user: user.email },
      refresh_secretKey,
      { expiresIn: "7d" },
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
      maxAge: 3600 * 1000,
    };
    const refreshCookieOptions = {
      ...cookieOptions,
      maxAge: 7 * 24 * 3600 * 1000,
    };

    res.cookie("ACCESS_TOKEN", ACCESS_TOKEN, cookieOptions);
    res.cookie("REFRESH_TOKEN", REFRESH_TOKEN, refreshCookieOptions);

    res.status(200).json({
      msg: "Login Successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        postalCode: user.postalCode,
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update user profile
const updateUser = async (req, res) => {
  try {
    const userId = req.user.userID;
    const updates = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
      phoneNumber: req.body.phoneNumber, // Add phoneNumber
      postalCode: req.body.postalCode,
      address: req.body.address,
    };
    if (req.body.email) {
      updates.email = req.body.email;
    }
    if (req.body.pass) {
      const salt = await bcrypt.genSalt(10);
      updates.pass = await bcrypt.hash(req.body.pass, salt);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true },
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      msg: "Profile updated successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        phoneNumber: user.phoneNumber,
        postalCode: user.postalCode,
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Logout user
const logoutUser = async (req, res) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
    };

    res.clearCookie("ACCESS_TOKEN", cookieOptions);
    res.clearCookie("REFRESH_TOKEN", cookieOptions);

    res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.userID; // Set by auth middleware
    const user = await User.findById(userId).select("-pass"); // Exclude password
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        postalCode: user.postalCode,
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
  getCurrentUser,
};
