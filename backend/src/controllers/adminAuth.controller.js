import jwt from "jsonwebtoken";
import AdminUser from "../models/adminUser.model.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc    Admin Login
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await AdminUser.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      const token = generateToken(admin._id);
      res.status(200).json({
        _id: admin._id,
        email: admin.email,
        role: admin.role,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
