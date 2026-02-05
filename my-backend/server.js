import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import admin from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import reportRoutes from "./routes/reports.js";
import roleRoutes from "./routes/roles.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Atlas connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Backend API is running" });
});

console.log("Loading routes...");
app.use("/api/auth", authRoutes);
app.use("/api/users", admin);
app.use("/api/products", productRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/roles", roleRoutes);
console.log("Routes loaded successfully");

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Server error", error: err.message });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
