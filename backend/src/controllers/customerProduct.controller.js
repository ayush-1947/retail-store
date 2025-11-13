import Product from "../models/product.model.js";

// @desc Fetch all active products
// @route GET /api/products
// @access Public
export const getActiveProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "Active" }).select(
      "name price imageUrl stock" // Use imageUrl instead of image
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    
    if (!product || product.status !== "Active") {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};
