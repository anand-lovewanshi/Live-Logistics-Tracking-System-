const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    image: { type: String, default: "" }
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text" });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Product", productSchema);
