const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { auth } = require("../Middlewares/auth");

// Specific routes first
router.post("/", auth, orderController.createOrder);
router.post("/verify-payment", auth, orderController.verifyPayment);
router.get("/user", auth, orderController.getUserOrders); // Must be before /:id

// Parameterized routes last
router.get("/:id", auth, orderController.getOrder);
router.post("/:id/cancel", auth, orderController.cancelOrder);

module.exports = router;
