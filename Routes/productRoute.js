const express = require("express");
const { auth } = require("../Middlewares/authMiddleware");
const { asyncHandler } = require("../Middlewares/asyncHandler");  // Assuming you have this middleware
const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} = require("../controllers/productController");

const productRouter = express.Router();

// Add Product
productRouter.post("/add", auth, asyncHandler(addProduct));

// Get All Products
productRouter.get("/", asyncHandler(getAllProducts));

// Get Product by ID
productRouter.get("/:id", asyncHandler(getProductById));

// Update Product
productRouter.put("/update/:id", auth, asyncHandler(updateProduct));

// Delete Product
productRouter.delete("/delete/:productID", auth, asyncHandler(deleteProduct));

// Fetch products by category
productRouter.get("/category/:category", asyncHandler(getProductsByCategory));

module.exports = productRouter;
