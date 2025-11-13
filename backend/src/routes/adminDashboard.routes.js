import express from "express";
import { getDashboardStats } from "../controllers/adminDashboard.controller.js";
import { protectAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect this route
router.route("/").get(protectAdmin, getDashboardStats);

export default router;