const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { auth } = require("../Middlewares/auth");

// Public routes
router.get("/", productController.getAllProducts);
router.get("/search", productController.searchProducts);
router.get("/suggestions", productController.getSearchSuggestions);
router.get("/category/:category", productController.getProductsByCategory); // Moved up
router.get(
  "/subcategory/:subcategory",
  productController.getProductsBySubcategory,
); // Moved up
router.get("/:id", productController.getProductById); // More specific than below
router.get("/:id/:variantCode?", productController.getProductByIdAndVariant); // Catch-all, last

// Protected routes
router.post("/", auth, productController.addProduct);
router.put("/:id", auth, productController.updateProduct);
router.delete("/:id", auth, productController.deleteProduct);

module.exports = router;
