// WishListModel.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema({
  id: { type: String, required: true },
  url: { type: String, required: true },
  assetType: { type: String, required: true },
});

const wishListSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    productCode: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String },
    images: [imageSchema],
  },
  { versionKey: false, timestamps: true },
);
// Change from productCode-based index to variant-specific index
wishListSchema.index(
  { userId: 1, productId: 1, color: 1, size: 1 }, 
  { unique: true }
);
module.exports =
  mongoose.models.Wishlist || mongoose.model("Wishlist", wishListSchema);

// wishListController.js (addToWishlist)
const addToWishlist = async (req, res) => {
  try {
    const { productId, variantIndex = 0, size } = req.body;
    const userId = req.user.userID;

    console.log("addToWishlist request body:", req.body);

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const variant = product.variants[variantIndex];
    if (!variant) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid variant index" });
    }

    const wishListItem = {
      userId,
      productId,
      productCode: variant.productCode,
      title: product.title,
      price: variant.price,
      color: variant.color,
      size: size || null,
      images: variant.images,
    };

    const newItem = await WishListModel.create(wishListItem);
    res.status(201).json({
      success: true,
      message: "Item added to wishlist",
      data: newItem,
    });
  } catch (error) {
    console.error("addToWishlist error:", error.message);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This product variant is already in your wishlist",
      });
    }
    res.status(400).json({
      success: false,
      message: "Error adding to wishlist",
      error: error.message,
    });
  }
};
