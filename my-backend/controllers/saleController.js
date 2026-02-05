import Sale from "../models/Sale.js";
import Product from "../models/Product.js";

// Get all sales
export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("product", "name price")
      .populate("soldBy", "email username")
      .sort({ createdAt: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create new sale
export const createSale = async (req, res) => {
  try {
    const { productId, quantity, customer } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const totalAmount = product.price * quantity;

    const sale = new Sale({
      product: productId,
      quantity,
      price: product.price,
      totalAmount,
      customer: customer || "Walk-in Customer",
      soldBy: req.user._id,
      status: "completed"
    });

    await sale.save();
    res.status(201).json({ message: "Sale recorded successfully", sale });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single sale
export const getSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate("product", "name price")
      .populate("soldBy", "email username");
    
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    
    res.json(sale);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete sale
export const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.json({ message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
