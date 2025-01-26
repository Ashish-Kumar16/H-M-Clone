require("dotenv").config({ path: "./config.env" }); // Use relative path
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const productRouter = require("./Routes/productRoute");
const userRouter = require("../Backend/Routes/authRoute");
const orderRouter = require("./Routes/orderRoute");
const cartRouter = require("./Routes/cartRoute");
const wishlistRouter = require("./Routes/wishRoute");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// require("dotenv").config(); // This must be at the top of the file

// // Check if environment variables are loaded
console.log(process.env.DATABASE); // Should print the database connection string
console.log(process.env.DATABASE_PASSWORD); // Should print the database password

const app = express();
// const cors = require("cors");
console.log("Access Secret Key:", process.env.ACCESS_SECRET_KEY);
console.log("Refresh Secret Key:", process.env.REFRESH_SECRET_KEY);

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // To allow cookies
  }),
);

const PORT =  5000;

// Middleware
app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.json());
// Routes
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/carts", cartRouter);
app.use("/wishlists", wishlistRouter);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).send({ success: false, message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ success: false, message: "Internal Server Error" });
});

// Start Server
mongoose
  .connect("mongodb://localhost:27017/HM-database")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
