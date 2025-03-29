const Razorpay = require("razorpay");
const Order = require("../Models/orderModel");
const crypto = require("crypto");
const mongoose = require("mongoose");
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = [
      "userId",
      "items",
      "shippingName",
      "shippingEmail",
      "shippingAddressDetails",
      "paymentMethod",
      "totalAmount",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          error: `Missing required field: ${field}`,
        });
      }
    }

    // Validate items array
    if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid items array",
      });
    }

    // Validate each item includes required fields, including images
    for (const item of req.body.items) {
      const itemFields = [
        "productId",
        "productCode",
        "title",
        "price",
        "quantity",
        "size",
        "color",
        "images",
      ];
      for (const field of itemFields) {
        if (!item[field]) {
          return res.status(400).json({
            success: false,
            error: `Missing required item field: ${field}`,
          });
        }
      }
      // Validate images array
      if (!Array.isArray(item.images) || item.images.length === 0) {
        return res.status(400).json({
          success: false,
          error: "Each item must include at least one image",
        });
      }
      for (const image of item.images) {
        if (!image.id || !image.url || !image.assetType) {
          return res.status(400).json({
            success: false,
            error: "Each image must include id, url, and assetType",
          });
        }
      }
    }

    // Create order document
    const order = new Order({
      ...req.body,
      paymentStatus: "pending",
      orderStatus: "placed",
    });

    // Save to database
    await order.save();

    res.json({
      success: true,
      orderId: order._id,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
exports.verifyPayment = async (req, res) => {
  try {
    const {
      orderId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      const order = await Order.findByIdAndUpdate(
        orderId,
        {
          paymentStatus: "completed",
          razorpayPaymentId: razorpay_payment_id,
          orderStatus: "processing",
        },
        { new: true },
      );

      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: "failed",
        orderStatus: "cancelled",
      });
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// controllers/orderController.js
// controllers/orderController.js

exports.getUserOrders = async (req, res) => {
  try {
    console.log("Entering getUserOrders - req.user:", req.user);
    if (!req.user || !req.user.userID) {
      console.log("Missing req.user or userID:", req.user);
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid user data" });
    }

    const userId = req.user.userID;
    console.log("Fetching orders for userId:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid userId format:", userId);
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID format" });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    console.log("Orders retrieved:", orders.length, "records");

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for this user" });
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error in getUserOrders:", error.message, error.stack);
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "firstName lastName email")
      .populate("shippingAddress");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { cancellationReason, cancellationNotes } = req.body;

    // Validate cancellation reason
    const validReasons = [
      "changed_mind",
      "wrong_item",
      "defective",
      "late_delivery",
      "other",
    ];
    if (!cancellationReason || !validReasons.includes(cancellationReason)) {
      return res.status(400).json({
        success: false,
        message: "Valid cancellation reason is required",
      });
    }

    // Find the order
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if order can be cancelled
    if (order.orderStatus === "shipped" || order.orderStatus === "delivered") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel order that has been shipped or delivered",
      });
    }

    if (order.orderStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Order is already cancelled",
      });
    }

    // Handle refund for Razorpay payments if payment was completed
    if (
      order.paymentMethod === "razorpay" &&
      order.paymentStatus === "completed"
    ) {
      const refund = await razorpay.payments.refund(order.razorpayPaymentId, {
        amount: order.totalAmount * 100,
      });

      // Update order with refund details
      order.refundId = refund.id;
      order.refundedAmount = order.totalAmount;
    }

    // Update order status and cancellation details
    order.orderStatus = "cancelled";
    order.paymentStatus =
      order.paymentStatus === "completed" ? "refunded" : "failed";
    order.cancelledAt = new Date();
    order.cancellationReason = cancellationReason;
    if (cancellationNotes) {
      order.cancellationNotes = cancellationNotes;
    }

    await order.save();

    res.json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
