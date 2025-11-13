// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./src/config/db.js";

// import Product from "./src/models/product.model.js";
// import AdminUser from "./src/models/adminUser.model.js";

// dotenv.config();
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// connectDB();

// // Test route
// app.get("/api/test-create", async (req, res) => {
//   try {
//     // This admin was already created, so we don't need to do it again.
//     // const admin = await AdminUser.create({
//     //   email: "admin@example.com",
//     //   password: "password123",
//     // });

//     const product = await Product.create({
//       name: "Test Product",
//       description: "A simple product for testing.",
//       price: 199.99,
//       stock: 50,
//       category: "Electronics",
//     });

//     // We only return the product, since we didn't create the admin this time
//     res.json({ product }); 
    
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // app.get("/api/health", (req, res) => {
// //   res.json({ status: "OK", message: "Backend is running!" });
// // });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";

// admin ke routes 
import adminAuthRoutes from "./src/routes/adminAuth.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import adminOrderRoutes from "./src/routes/adminOrder.routes.js";
import adminDashboardRoutes from "./src/routes/adminDashboard.routes.js";


// customer ke routes
import userAuthRoutes from "./src/routes/userAuth.routes.js"; // For customer login/register
import customerProductRoutes from "./src/routes/customerProduct.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import orderRoutes from "./src/routes/order.routes.js";



// env files 
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//admin routes 
app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin/products", productRoutes);
app.use("/api/admin/orders", adminOrderRoutes); // (Admin order management)
app.use("/api/admin/dashboard", adminDashboardRoutes); //  (Admin stats)


//customer routes
app.use("/api/auth", userAuthRoutes); //  customer login/register
app.use("/api/products", customerProductRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Connect to MongoDB
connectDB();

// Test route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
