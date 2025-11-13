import Order from "../models/order.model.js";

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private (Admin)
export const getAllOrders = async (req, res) => {
  try {
    // We populate 'user' to get the user's name and email
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

// @desc    Get a single order by ID
// @route   GET /api/admin/orders/:id
// @access  Private (Admin)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) { // <-- This brace was missing
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
};


// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private (Admin)
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  // Validate if the status is one of the allowed values
  const allowedStatuses = ["pending", "shipped", "delivered", "cancelled"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    
    // TODO: If status is 'cancelled', add logic here to restock items

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error: error.message });
  }
};