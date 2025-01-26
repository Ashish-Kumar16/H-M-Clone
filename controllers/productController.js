const ProductModel = require("../Models/productModel");

// Add Product
const addProduct = async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res
      .status(201)
      .send({ success: true, message: "Product added successfully", product });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  const {
    keyword,
    category,
    subcategory,
    price,
    brand,
    color,
    sort,
    limit = 10,
    page = 1,
  } = req.query;

  const query = {};

  if (keyword) query.title = { $regex: keyword, $options: "i" };
  if (category) query.category = category;
  if (subcategory) query.subcategory = subcategory;
  if (brand) query.brand = brand;
  if (color) query.color = color;
  if (price) {
    const [min, max] = price.split(",").map(Number);
    query.price = { $gte: min || 0, $lte: max || Infinity };
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  try {
    const products = await ProductModel.find(query)
      .sort(
        sort === "price"
          ? { price: 1 }
          : sort === "-price"
          ? { price: -1 }
          : {},
      )
      .limit(parseInt(limit))
      .skip(skip);

    const total = await ProductModel.countDocuments(query);

    res.status(200).send({
      success: true,
      products,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get Product by ID
const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) throw new Error("Product not found");
    res.status(200).send({ success: true, product });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!product) throw new Error("Product not found");
    res
      .status(200)
      .send({
        success: true,
        message: "Product updated successfully",
        product,
      });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.productID);
    if (!product) throw new Error("Product not found");
    res
      .status(200)
      .send({
        success: true,
        message: "Product deleted successfully",
        product,
      });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

// Fetch products by category
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { limit, page } = req.query;

    if (!category || !["Men", "Women", "Kids", "Beauty"].includes(category)) {
      return res.status(400).send({ message: "Invalid or missing category" });
    }

    const query = { category };
    const pageSize = limit ? parseInt(limit) : 10;
    const pageNumber = page ? parseInt(page) : 1;

    const products = await ProductModel.find(query)
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize);

    if (products.length === 0) {
      return res
        .status(404)
        .send({ message: "No products found for this category" });
    }

    res.status(200).send({ success: true, products });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
};
