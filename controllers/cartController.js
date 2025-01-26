const CartModel = require("../Models/cartModel");
const ProductModel = require("../Models/productModel");
const mongoose = require("mongoose");

// Get cart data by ID
const getCartById = async (req, res) => {
  const { cartId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    return res.status(400).json({ message: "Invalid cart ID" });
  }

  try {
    const cart = await CartModel.findById(cartId).populate("productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.status(200).json({ success: true, cart });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Get all carts
const getAllCarts = async (req, res) => {
  try {
    const carts = await CartModel.find().populate("productId");
    return res.status(200).json({ success: true, carts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Add a product to the cart
const addProductToCart = async (req, res) => {
  const { productId } = req.params; // Get productId from the URL parameter
  console.log("Received productId:", productId); // Debugging: Check the received productId

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItem = new CartModel({ productId });
    await cartItem.save();
    return res
      .status(201)
      .json({ message: "Product added to cart successfully", cartItem });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


// Delete a product from the cart
const deleteProductFromCart = async (req, res) => {
  const { productId } = req.params; // id is the productId passed in the URL

  // Ensure productId is valid
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    // Find and delete the cart item based on productId
    const cartItem = await CartModel.findOneAndDelete({ productId: productId });

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    return res
      .status(200)
      .json({ message: "Product removed from cart successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};



module.exports = {
  getCartById,
  getAllCarts,
  addProductToCart,
  deleteProductFromCart,
};
