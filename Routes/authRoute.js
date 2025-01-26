const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const authRouter = express.Router();

// Register a new user
authRouter.post("/register", registerUser);

// Login user
authRouter.post("/login", loginUser);

module.exports = authRouter;
