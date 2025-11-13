import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { protectAdmin } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(protectAdmin, getProducts)
  .post(protectAdmin, upload.single("image"), createProduct);

router
  .route("/:id")
  .get(protectAdmin, getProductById)
  .put(protectAdmin, upload.single("image"), updateProduct)
  .delete(protectAdmin, deleteProduct);

export default router;
