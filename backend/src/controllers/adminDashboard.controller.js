import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
export const getDashboardStats = async (req, res) => {
  try {
    // 1. Get stats for "Today"
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));

    const todayOrders = await Order.find({
      createdAt: { $gte: startOfToday, $lte: endOfToday },
    });

    const todaysRevenue = todayOrders.reduce(
      (sum, order) => sum + order.total,
      0
    );

    // 2. Get overall stats
    const totalOrders = await Order.countDocuments();
    const allOrders = await Order.find({});
    const totalRevenue = allOrders.reduce(
      (sum, order) => sum + order.total,
      0
    );

    // 3. Get low stock items
    const lowStockItems = await Product.find({
      stock: { $lte: 10 }, // Or any threshold you want
      status: "Active",
    }).select("name stock");

    res.json({
      todaysRevenue,
      totalRevenue,
      todayOrdersCount: todayOrders.length,
      totalOrdersCount: totalOrders,
      lowStockItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error: error.message });
  }
};