import jwt from "jsonwebtoken";
import AdminUser from "../models/adminUser.model.js";
import User from "../models/user.model.js";

// --- Middleware for Admin Routes ---
export const protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 1. Get token from header
      token = req.headers.authorization.split(" ")[1];

      // 2. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find admin user and attach to req
      req.admin = await AdminUser.findById(decoded.id).select("-password");

      // 4. Check if admin was found
      if (!req.admin) {
        return res.status(401).json({ message: "Not authorized, admin not found" });
      }

      // 5. Proceed to the next middleware
      next();

    } catch (error) {
      console.error(error); // Log the error
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // 6. Handle if no token was found at all
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};


// --- Middleware for Regular User Routes ---
export const protectUser = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 1. Get token from header
      token = req.headers.authorization.split(" ")[1];

      // 2. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find regular user by ID, remove password from the object
      req.user = await User.findById(decoded.id).select("-password");
      
      // 4. Check if user was found
      if (!req.user) {
         return res.status(401).json({ message: "Not authorized, user not found" });
      }

      // 5. Proceed to the next middleware
      next();

    } catch (error) {
      console.error(error);
      // Added 'return' here to stop execution on failure
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // 6. Handle if no token was found at all
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};