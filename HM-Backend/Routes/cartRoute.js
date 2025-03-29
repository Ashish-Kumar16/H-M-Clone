const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { auth } = require("../Middlewares/auth");

router.delete("/", auth, cartController.clearCart);
router.post("/", auth, cartController.addToCart);
router.get("/", auth, cartController.getCart); // Changed from /:userId
router.put("/:cartId", auth, cartController.updateCartItem);
router.delete("/:cartId", auth, cartController.removeFromCart);

module.exports = router;
