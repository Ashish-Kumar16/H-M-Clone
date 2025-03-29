const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
  getCurrentUser,
} = require("../controllers/userController");
const { auth } = require("../Middlewares/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update", auth, updateUser);
router.post("/logout", logoutUser);
router.get("/me", auth, getCurrentUser); // New logout route

module.exports = router;
