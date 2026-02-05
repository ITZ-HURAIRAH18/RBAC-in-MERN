import User from "../models/User.js";
import Product from "../models/Product.js";
import Role from "../models/Role.js";
import Permission from "../models/Permission.js";

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ status: 'active' });
    const inactiveProducts = await Product.countDocuments({ status: 'inactive' });

    res.json({
      totalUsers,
      totalProducts,
      activeProducts,
      inactiveProducts,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user activity report
export const getUserReport = async (req, res) => {
  try {
    const users = await User.find()
      .populate('roles', 'name')
      .select('-password')
      .sort({ createdAt: -1 });

    const report = users.map(user => ({
      id: user._id,
      email: user.email,
      role: user.roles?.map(r => r.name).join(', ') || 'No Role',
      createdAt: user.createdAt
    }));

    res.json(report);
  } catch (error) {
    console.error("getUserReport error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get product report
export const getProductReport = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('createdBy', 'email')
      .sort({ createdAt: -1 });

    const report = products.map(product => ({
      id: product._id,
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status,
      createdBy: product.createdBy?.email || 'Unknown',
      createdAt: product.createdAt
    }));

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get sales summary (mock data for now)
export const getSalesSummary = async (req, res) => {
  try {
    const products = await Product.find();
    
    const summary = {
      totalRevenue: products.reduce((sum, p) => sum + (p.price * Math.floor(Math.random() * 10)), 0),
      totalOrders: Math.floor(Math.random() * 100) + 50,
      averageOrderValue: 0,
      topProducts: products.slice(0, 5).map(p => ({
        name: p.name,
        sales: Math.floor(Math.random() * 50) + 10
      }))
    };

    summary.averageOrderValue = summary.totalRevenue / summary.totalOrders;

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
