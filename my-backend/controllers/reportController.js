import User from "../models/User.js";
import Product from "../models/Product.js";
import Sale from "../models/Sale.js";
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

// Get sales summary
export const getSalesSummary = async (req, res) => {
  try {
    // Get all completed sales
    const sales = await Sale.find({ status: "completed" })
      .populate("product", "name");
    
    // Calculate total revenue
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    
    // Total orders
    const totalOrders = sales.length;
    
    // Average order value
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Calculate top products by sales
    const productSales = {};
    sales.forEach(sale => {
      const productName = sale.product?.name || "Unknown Product";
      if (!productSales[productName]) {
        productSales[productName] = 0;
      }
      productSales[productName] += sale.quantity;
    });
    
    // Sort and get top 5 products
    const topProducts = Object.entries(productSales)
      .map(([name, sales]) => ({ name, sales }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    res.json({
      totalRevenue: totalRevenue.toFixed(2),
      totalOrders,
      averageOrderValue: averageOrderValue.toFixed(2),
      topProducts
    });
  } catch (error) {
    console.error("getSalesSummary error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
