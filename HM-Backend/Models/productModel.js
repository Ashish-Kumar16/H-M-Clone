const mongoose = require("mongoose");
const { Schema } = mongoose;

// Sub-schema for material composition
const materialCompositionSchema = new Schema({
  name: { type: String, required: true },
  percentage: { type: String, required: true },
});

// Sub-schema for material details
const materialDetailsSchema = new Schema(
  {
    Cotton: { type: String, default: null },
    Elastane: { type: String, default: null },
  },
  { strict: false },
);

// Sub-schema for materials
const materialsSchema = new Schema({
  composition: [materialCompositionSchema],
  livaecoPercentage: { type: String, default: "N/A" },
  material: { type: String, required: true },
  details: materialDetailsSchema,
});

// Sub-schema for size
const sizeSchema = new Schema({
  sizeCode: { type: String, required: true },
  sizeFilter: { type: String, required: true },
});

// Sub-schema for image
const imageSchema = new Schema({
  id: { type: String, required: true },
  url: { type: String, required: true },
  assetType: { type: String, required: true },
});

// Sub-schema for variants
const variantSchema = new Schema({
  productCode: { type: String, required: true },
  baseCode: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: String, required: true },
  size: { type: Map, of: sizeSchema },
  description: { type: String, required: true },
  fit: { type: String, required: true },
  neckline: { type: String, required: true },
  concept: { type: String, required: true },
  countryOfProduction: { type: String, required: true },
  genericName: { type: String, default: "N/A" },
  netQuantity: { type: String, required: true },
  marketedBy: { type: String, required: true },
  deliveryTime: { type: String, required: true },
  dateOfManufacture: { type: String, default: "N/A" },
  dateOfImport: { type: String, required: true },
  careGuide: { type: String, required: true },
  materials: materialsSchema,
  careInstructions: [{ type: String }],
  images: [imageSchema],
});

// Main product schema
const productSchema = new Schema(
  {
    title: { type: String, required: true },
    variants: [variantSchema],
    brand: { type: String, default: "H&M" },
    subcategory: { type: String, default: "T-shirts" },
    category: { type: String, default: "Clothing" },
  },
  {
    versionKey: false,
  },
);

// Prevent model overwriting by checking if it already exists
module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
