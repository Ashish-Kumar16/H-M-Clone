const mongoose = require("mongoose");
const { Schema } = mongoose;

// Sub-schema for images
const imageSchema = new Schema({
  id: { type: String, required: true },
  url: { type: String, required: true },
  assetType: {
    type: String,
    enum: ["DESCRIPTIVESTILLLIFE", "DESCRIPTIVEDETAIL", "LOOKBOOK"],
    required: true,
  },
});

// Sub-schema for size
const sizeSchema = new Schema({
  sizeCode: { type: String, required: true },
  sizeFilter: { type: String, required: true },
  stock: { type: Number, required: true, min: 0, default: 0 },
  available: { type: Boolean, default: true },
});

// Cart schema
const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    productCode: { type: String, required: true },
    title: { type: String, required: true },
    color: { type: String, required: true },
    size: sizeSchema,
    images: [imageSchema],
    price: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  {
    timestamps: true, // Optional: adds createdAt and updatedAt fields
  },
);

// Prevent model overwriting and export as Cart (not Product)
module.exports = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
