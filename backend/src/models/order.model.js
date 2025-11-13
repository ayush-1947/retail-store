import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: { type: Object, required: true }, 
      quantity: { type: Number, required: true },
    },
  ],

  customerName: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },


  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
