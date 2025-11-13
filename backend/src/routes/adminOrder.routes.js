import express from "express";
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/adminOrder.controller.js";
import { protectAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();


router.use(protectAdmin);

router.route("/").get(getAllOrders);
router.route("/:id").get(getOrderById);
router.route("/:id/status").put(updateOrderStatus);

export default router;
