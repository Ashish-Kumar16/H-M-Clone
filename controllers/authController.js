const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/userModel");

const access_secretKey = process.env.ACCESS_SECRET_KEY;
const refresh_secretKey = process.env.REFRESH_SECRET_KEY;

// Register a new user
const registerUser = async (req, res) => {
  const { email, pass, firstName, lastName, gender } = req.body;

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    // Hash the password
    const hashedPass = await bcrypt.hash(pass, 10);

    // Create a new user
    const newUser = new UserModel({
      email,
      pass: hashedPass,
      firstName,
      lastName,
      gender,
    });

    // Save the user to the database
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
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(pass, user.pass);
    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(400).json({ msg: "Incorrect password" });
    }

    // Create JWT tokens if authentication is successful
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

    // Define cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure cookies only in production
      sameSite: "None", // For cross-site cookies
    };

    // Set cookies in response
    res.cookie("ACCESS_TOKEN", ACCESS_TOKEN, cookieOptions);
    res.cookie("REFRESH_TOKEN", REFRESH_TOKEN, cookieOptions);

    res.status(200).send({
      msg: "Login Successful",
      ACCESS_TOKEN,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser };
