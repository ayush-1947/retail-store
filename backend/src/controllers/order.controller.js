import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Customer)
export const placeOrder = async (req, res) => {
 
  const { 
    customerName, 
    email, 
    contactNumber, 
    shippingAddress 
  } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let orderItems = [];
    let total = 0;

    
    for (const item of cart.items) {
      const product = item.product; 

      if (item.quantity > product.stock) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      
      product.stock -= item.quantity;
      await product.save();

      
      orderItems.push({
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl
        },
        quantity: item.quantity,
      });

      
      total += product.price * item.quantity;
    }

    
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      total: total,
      status: "pending",
      
      
      customerName,
      email,
      contactNumber,
      shippingAddress,
    });

    const createdOrder = await order.save();

   
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order: createdOrder });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/myorders
// @access  Private (Customer)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};
