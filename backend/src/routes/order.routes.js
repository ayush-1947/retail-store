import express from "express";
import {
  placeOrder,
  getMyOrders // <-- Add this
} from "../controllers/order.controller.js";
import { protectUser } from "../middleware/auth.middleware.js";


const router = express.Router();

router.route("/").post(protectUser, placeOrder);

// This line will now work
router.route("/myorders").get(protectUser, getMyOrders);

export default router;