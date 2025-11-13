import Product from "../models/product.model.js";

// @desc Create new product
// @route POST /api/admin/products
// @access Private (Admin)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, status } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      status: status || "Active",
      imageUrl,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all products (with pagination)
// @route GET /api/admin/products
// @access Private (Admin)
export const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments();

    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single product
// @route GET /api/admin/products/:id
// @access Private (Admin)
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update product
// @route PUT /api/admin/products/:id
// @access Private (Admin)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    const { name, description, price, stock, category, status } = req.body;
    if (req.file) product.imageUrl = `/uploads/${req.file.filename}`;

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.category = category || product.category;
    product.status = status || product.status;

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete product
// @route DELETE /api/admin/products/:id
// @access Private (Admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
