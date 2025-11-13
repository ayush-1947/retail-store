import express from "express";
import {
  getActiveProducts,
  getProductById,
} from "../controllers/customerProduct.controller.js";

const router = express.Router();

router.route("/").get(getActiveProducts);
router.route("/:id").get(getProductById);

export default router;