const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      rating,
      inStock,
      sort,
      page = 1,
      limit = 12
    } = req.query;
    const query = {};
    if (search) query.$text = { $search: search };
    if (category) query.category = { $in: category.split(",") };
    if (brand) query.brand = { $in: brand.split(",") };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (rating) query.rating = { $gte: Number(rating) };
    if (inStock === "true") query.stock = { $gt: 0 };
    let sortOption = {};
    switch (sort) {
      case "price_asc":
        sortOption = { price: 1 };
        break;
      case "price_desc":
        sortOption = { price: -1 };
        break;
      case "newest":
        sortOption = { createdAt: -1 };
        break;
      case "top_rated":
        sortOption = { rating: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));
    res.json({
      products,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFilterMeta = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    const brands = await Product.distinct("brand");
    const priceAgg = await Product.aggregate([
      {
        $group: { _id: null, min: { $min: "$price" }, max: { $max: "$price" } }
      }
    ]);
    res.json({
      categories,
      brands,
      priceRange: priceAgg[0] || { min: 0, max: 100000 }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFilterMeta
};
