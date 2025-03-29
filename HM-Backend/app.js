require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");
const cartRouter = require("./routes/cartRoute");
const wishlistRouter = require("./routes/wishRoute");
const errorHandler = require("./Middlewares/errorHandler");

const app = express();

// Request Logging Middleware
app.use((req, res, next) => {
  const { method, url, headers, query, body, cookies } = req;

  console.log("===== New Request =====");
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);
  console.log("Headers:", headers);
  console.log("Query Parameters:", query);
  console.log("Body:", body);
  console.log("Cookies:", cookies);
  console.log("======================");

  next(); // Proceed to the next middleware/route
});

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hm-clone-chi.vercel.app",
      "https://hm-backend-3trj.onrender.com",
    ],
    credentials: true,
  }),
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
