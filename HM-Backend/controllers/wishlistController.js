const WishListModel = require("../models/WishListModel");
const ProductModel = require("../models/ProductModel");

const addToWishlist = async (req, res) => {
  try {
    const { productId, variantIndex = 0, size } = req.body;
    const userId = req.user.userID;

    // Get complete product with variants
    const product = await ProductModel.findById(productId).lean();
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Validate variant exists
    const variant = product.variants[variantIndex];
    if (!variant) {
      return res.status(400).json({
        success: false,
        message: "Invalid variant selection",
      });
    }

    // Check existing combination
    const exists = await WishListModel.findOne({
      userId,
      productId,
      color: variant.color,
      size: size || null,
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message:
          "This exact variant/size combination already exists in your wishlist",
      });
    }

    // Create new wishlist item
    const newItem = await WishListModel.create({
      userId,
      productId,
      productCode: variant.productCode,
      title: product.title,
      price: variant.price,
      color: variant.color,
      size: size || null,
      images: variant.images,
    });

    res.status(201).json({
      success: true,
      message: "Item added to wishlist",
      data: newItem,
    });
  } catch (error) {
    console.error("addToWishlist error:", error);
    res.status(500).json({
      success: false,
      message:
        error.code === 11000
          ? "Duplicate entry detected"
          : "Error adding to wishlist",
      error: error.message,
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.user.userID;
    const wishlist = await WishListModel.find({ userId }).populate(
      "productId",
      "title category subcategory",
    );
    console.log("getWishlist retrieved:", wishlist);
    res.status(200).json({
      success: true,
      message: "Wishlist retrieved successfully",
      data: wishlist,
    });
  } catch (error) {
    console.error("getWishlist error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error retrieving wishlist",
      error: error.message,
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { productCode } = req.params;
    const userId = req.user.userID;
    const deletedItem = await WishListModel.findOneAndDelete({
      userId,
      productCode,
    });
    if (!deletedItem) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist item not found" });
    }
    res.status(200).json({
      success: true,
      message: "Item removed from wishlist",
      data: deletedItem,
    });
  } catch (error) {
    console.error("removeFromWishlist error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error removing from wishlist",
      error: error.message,
    });
  }
};

module.exports = { addToWishlist, getWishlist, removeFromWishlist };
