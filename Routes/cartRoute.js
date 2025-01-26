const express = require("express");
const { auth } = require("../Middlewares/authMiddleware");
const {
  getCartById,
  getAllCarts,
  addProductToCart,
  deleteProductFromCart,
} = require("../controllers/cartController");

const cartRouter = express.Router();

// Get cart by cartId
cartRouter.get("/:cartId", getCartById);

// Get all carts
cartRouter.get("/", getAllCarts);

// Add product to the cart
cartRouter.post("/add/:productId", addProductToCart);

// Delete product from the cart
cartRouter.delete("/delete/:productId", deleteProductFromCart);

module.exports = cartRouter;
