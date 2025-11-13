import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// @desc Add item to cart
// @route POST /api/cart
// @access Private (Customer)
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; // from protectUser middleware

  try {
    const product = await Product.findById(productId);

    // Check product validity
    if (!product || product.status !== "Active") {
      return res.status(400).json({ message: "Invalid product" });
    }

    // Check stock
    if (quantity > product.stock) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Product exists in cart, update quantity
      let newQuantity = cart.items[itemIndex].quantity + quantity;
      if (newQuantity > product.stock) {
         return res.status(400).json({ message: "Insufficient stock" });
      }
      cart.items[itemIndex].quantity = newQuantity;
    } else {
      // Product not in cart, add new item
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};



// --- ▼ ADD THESE NEW FUNCTIONS ▼ ---

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private (Customer)
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price imageUrl stock"
    );

    if (!cart) {
      // If no cart, return an empty one
      return res.json({
        user: req.user._id,
        items: [],
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error getting cart", error: error.message });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart
// @access  Private (Customer)
export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  if (quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    const product = await Product.findById(productId);
    if (quantity > product.stock) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    // Populate product details before sending back
    await cart.populate("items.product", "name price imageUrl stock");
    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating cart", error: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private (Customer)
export const removeCartItem = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the item to be removed
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    
    // Populate product details before sending back
   await cart.populate("items.product", "name price imageUrl stock");
    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing item from cart", error: error.message });
  }
};


// You'll also want GET, PUT (update qty), and DELETE (remove item) routes here