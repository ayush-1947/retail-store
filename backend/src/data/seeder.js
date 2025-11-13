import dotenv from "dotenv";
import connectDB from "../config/db.js";
import { sampleProducts } from "./products.js";


import Product from "../models/product.model.js";
import AdminUser from "../models/adminUser.model.js";
import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    
    await Product.deleteMany();
    await AdminUser.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();
    await Order.deleteMany();

    
    await Product.insertMany(sampleProducts);

    
    await AdminUser.create({
      email: "admin1@example.com",
      password: "password121",
    });

    console.log("Data Imported! ✅");
    console.log("Admin User created: admin@example.com / password123");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
  
    await Product.deleteMany();
    await AdminUser.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();
    await Order.deleteMany();

    console.log("Data Destroyed! ❌");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};


if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}