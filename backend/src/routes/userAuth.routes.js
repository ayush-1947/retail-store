import express from "express";
import {
  registerUser,
  loginUser,
} from "../controllers/userAuth.controller.js";
// import { protectUser } from "../middleware/auth.middleware.js"; // You'd use this for a 'get profile' route

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Example of a protected route:
// router.get("/profile", protectUser, (req, res) => {
//   res.json(req.user);
// });

export default router;