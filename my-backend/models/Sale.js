import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  customer: { type: String },
  soldBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["completed", "pending", "cancelled"], default: "completed" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Sale", saleSchema);
