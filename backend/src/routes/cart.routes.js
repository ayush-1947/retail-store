import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cart.controller.js";
import { protectUser } from "../middleware/auth.middleware.js"; // Use the customer auth

const router = express.Router();


router
  .route("/")
  .post(protectUser, addToCart)
  .get(protectUser, getCart)
  .put(protectUser, updateCartItem);

router.route("/:productId").delete(protectUser, removeCartItem);

export default router;
