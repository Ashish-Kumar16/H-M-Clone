const mongoose = require("mongoose");
const { Schema } = mongoose;

// Sub-schema for images (reused from Cart model)
const imageSchema = new Schema({
  id: { type: String, required: true },
  url: { type: String, required: true },
  assetType: {
    type: String,
    enum: ["DESCRIPTIVESTILLLIFE", "DESCRIPTIVEDETAIL", "LOOKBOOK"],
    required: true,
  },
});

// Sub-schema for ordered items
const orderedItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productCode: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  size: {
    sizeCode: { type: String, required: true },
    sizeFilter: { type: String, required: true },
  },
  color: {
    type: String,
    required: true,
  },
  images: [imageSchema], // Add images field to store product images
});

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: {
    type: [orderedItemSchema],
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: "At least one item is required",
    },
  },
  shippingAddress: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  shippingName: {
    type: String,
    required: true,
  },
  shippingEmail: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  shippingAddressDetails: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: {
      type: String,
      validate: {
        validator: (v) => /^\d{6}$/.test(v),
        message: "Postal code must be 6 digits",
      },
    },
    country: { type: String, required: true },
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["razorpay", "cod", "card"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  },
  orderStatus: {
    type: String,
    enum: ["placed", "processing", "shipped", "delivered", "cancelled"],
    default: "placed",
  },
  razorpayOrderId: {
    type: String,
  },
  razorpayPaymentId: {
    type: String,
  },
  refundId: {
    type: String,
  },
  refundedAmount: {
    type: Number,
  },
  cancelledAt: {
    type: Date,
  },
  cancellationReason: {
    type: String,
    enum: ["changed_mind", "wrong_item", "defective", "late_delivery", "other"],
    default: null,
  },
  cancellationNotes: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
