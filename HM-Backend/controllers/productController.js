const ProductModel = require("../models/ProductModel"); // Adjust path to your model file

// Add a new product
const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = new ProductModel(productData);
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: savedProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error adding product",
      error: error.message || "Validation failed or database error",
    });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().select("-variants.images");
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving products",
      error: error.message || "Server error",
    });
  }
};

// Get product by ID (all variants)
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving product",
      error: error.message || "Server error",
    });
  }
};

// Get product by ID and optional variant product code
const getProductByIdAndVariant = async (req, res) => {
  try {
    const productId = req.params.id;
    const variantCode = req.params.variantCode; // Optional parameter

    // Fetch the product by ID
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // If variantCode is provided, filter the variants
    let filteredVariants = product.variants;
    if (variantCode) {
      filteredVariants = product.variants.filter(
        (variant) => variant.productCode === variantCode,
      );
      if (filteredVariants.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No variants found with product code ${variantCode}`,
        });
      }
    }

    // Return the full product with filtered or all variants
    res.status(200).json({
      success: true,
      message: "Product and variants retrieved successfully",
      data: {
        ...product.toObject(), // Convert Mongoose document to plain object
        variants: filteredVariants, // Return filtered or all variants
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving product and variants",
      error: error.message || "Server error",
    });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true },
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating product",
      error: error.message || "Validation failed or database error",
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message || "Server error",
    });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await ProductModel.find({ category }).select(
      "title variants.color variants.price category subcategory brand",
    );
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No products found in category: ${category}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Products in category '${category}' retrieved successfully`,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving products by category",
      error: error.message || "Server error",
    });
  }
};

// Get products by subcategory
const getProductsBySubcategory = async (req, res) => {
  try {
    const subcategory = req.params.subcategory;
    const products = await ProductModel.find({ subcategory }).select(
      "title variants.color variants.price category subcategory brand",
    );
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No products found in subcategory: ${subcategory}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Products in subcategory '${subcategory}' retrieved successfully`,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving products by subcategory",
      error: error.message || "Server error",
    });
  }
};

// Search products using regex
const searchProducts = async (req, res) => {
  try {
    const { query } = req.query; // e.g., /api/products/search?query=t-shirt

    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    // Case-insensitive regex search across multiple fields
    const searchRegex = new RegExp(query, "i");
    const products = await ProductModel.find({
      $or: [
        { title: searchRegex },
        { brand: searchRegex },
        { category: searchRegex },
        { subcategory: searchRegex },
        { "variants.color": searchRegex }, // Search within variant colors
      ],
    }).select(
      "title brand category subcategory variants.price variants.color variants.images",
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No products found for query: "${query}"`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Products matching "${query}" retrieved successfully`,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching products",
      error: error.message || "Server error",
    });
  }
};

// Get search suggestions
const getSearchSuggestions = async (req, res) => {
  try {
    const { query } = req.query; // Partial query for suggestions (e.g., "t-sh")

    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Query is required for suggestions",
      });
    }

    const searchRegex = new RegExp(query, "i");

    // Aggregate unique values from relevant fields
    const suggestions = await ProductModel.aggregate([
      // Unwind variants to access colors
      { $unwind: "$variants" },
      // Match documents with regex
      {
        $match: {
          $or: [
            { title: searchRegex },
            { brand: searchRegex },
            { category: searchRegex },
            { subcategory: searchRegex },
            { "variants.color": searchRegex },
          ],
        },
      },
      // Group to collect unique suggestions
      {
        $group: {
          _id: null,
          titles: { $addToSet: "$title" },
          brands: { $addToSet: "$brand" },
          categories: { $addToSet: "$category" },
          subcategories: { $addToSet: "$subcategory" },
          colors: { $addToSet: "$variants.color" },
        },
      },
      // Project to combine all suggestions
      {
        $project: {
          _id: 0,
          suggestions: {
            $setUnion: [
              "$titles",
              "$brands",
              "$categories",
              "$subcategories",
              "$colors",
            ],
          },
        },
      },
    ]);

    const result = suggestions.length > 0 ? suggestions[0].suggestions : [];

    res.status(200).json({
      success: true,
      message: "Search suggestions retrieved successfully",
      data: result.slice(0, 10), // Limit to 10 suggestions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving search suggestions",
      error: error.message || "Server error",
    });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  getProductByIdAndVariant,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsBySubcategory,
  searchProducts,
  getSearchSuggestions,
};
