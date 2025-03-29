const CartModel = require("../Models/CartModel");
const ProductModel = require("../Models/ProductModel");

const addToCart = async (req, res) => {
  const { productId, productCode, sizeFilter, sizeData, quantity } = req.body;

  try {
    // Input validation
    if (
      !productId ||
      !productCode ||
      !sizeFilter ||
      !sizeData ||
      !quantity ||
      quantity < 1
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (productId, productCode, sizeFilter, sizeData, quantity) are required and quantity must be positive",
      });
    }

    // Find product by ID
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find variant by productCode
    const variant = product.variants.find((v) => v.productCode === productCode);
    if (!variant) {
      return res.status(404).json({
        success: false,
        message: "Variant not found",
      });
    }

    // Check stock and availability from frontend sizeData with fallbacks
    const stock = sizeData.stock !== undefined ? sizeData.stock : Infinity;
    const available =
      sizeData.available !== undefined ? sizeData.available : true;

    if (!available || stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Size ${sizeFilter} is out of stock or insufficient quantity available`,
      });
    }

    // Check if item already exists in cart
    let cartItem = await CartModel.findOne({
      userId: req.user._id,
      productId,
      productCode,
      "size.sizeFilter": sizeFilter,
    });

    if (cartItem) {
      // Update existing item
      const newQuantity = cartItem.quantity + quantity;
      if (stock !== Infinity && newQuantity > stock) {
        return res.status(400).json({
          success: false,
          message: `Cannot add more than available stock (${stock})`,
        });
      }
      cartItem.quantity = newQuantity;
      cartItem.size = sizeData; // Update with frontend sizeData
      await cartItem.save();
    } else {
      // Create new cart item using frontend sizeData
      cartItem = new CartModel({
        userId: req.user.userID,
        productId,
        productCode,
        title: product.title,
        color: variant.color,
        size: sizeData, // Use the full sizeData from frontend
        images: variant.images,
        price: variant.price,
        quantity,
      });
      await cartItem.save();
    }

    res.status(201).json({
      success: true,
      message: "Item added to cart successfully",
      data: cartItem,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add item to cart",
      error: error.message || "Server error",
    });
  }
};

// Get user's cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.userID; // From auth middleware

    const cart = await CartModel.find({ userId }).populate(
      "productId",
      "title category subcategory",
    );

    res.status(200).json({
      success: true,
      message: "Cart retrieved successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving cart",
      error: error.message || "Server error",
    });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive number",
      });
    }

    const updatedItem = await CartModel.findByIdAndUpdate(
      cartId,
      { quantity },
      { new: true },
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart item updated",
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating cart",
      error: error.message || "Server error",
    });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const deletedItem = await CartModel.findByIdAndDelete(cartId);

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: deletedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing from cart",
      error: error.message || "Server error",
    });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user.userID; // Assuming auth middleware sets req.user
    await CartModel.deleteMany({ userId }); // Use CartModel instead of Cart
    res.json({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Correct export syntax
module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
