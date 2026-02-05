import mongoose from "mongoose";
import Permission from "./models/Permission.js";
import Role from "./models/Role.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Sale from "./models/Sale.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/rbac-demo");

    console.log("Connected to MongoDB");

    // Clear existing data
    await Permission.deleteMany({});
    await Role.deleteMany({});
    await User.deleteMany({});
    await Product.deleteMany({});
    await Sale.deleteMany({});

    console.log("Cleared existing data");

    // Create Permissions
    const permissions = await Permission.insertMany([
      { name: "read_users" },
      { name: "create_users" },
      { name: "update_users" },
      { name: "delete_users" },
      { name: "read_products" },
      { name: "create_products" },
      { name: "update_products" },
      { name: "delete_products" },
      { name: "view_reports" },
      { name: "manage_roles" }
    ]);

    console.log("Created permissions");

    // Create Roles
    const adminRole = await Role.create({
      name: "admin",
      permissions: permissions.map(p => p._id) // All permissions
    });

    const userRole = await Role.create({
      name: "user",
      permissions: permissions.filter(p => p.name === "read_users").map(p => p._id)
    });

    const managerRole = await Role.create({
      name: "manager",
      permissions: permissions.filter(p => 
        ["read_users", "create_users", "update_users", "read_products"].includes(p.name)
      ).map(p => p._id)
    });

    const editorRole = await Role.create({
      name: "editor",
      permissions: permissions.filter(p => 
        ["read_products", "update_products"].includes(p.name)
      ).map(p => p._id)
    });

    const viewerRole = await Role.create({
      name: "viewer",
      permissions: permissions.filter(p => 
        p.name.startsWith("read_")
      ).map(p => p._id)
    });

    console.log("Created roles");

    // Create Test Users
    const hashedPassword = await bcrypt.hash("password123", 10);

    const adminUser = await User.create({
      username: "admin",
      email: "admin@test.com",
      password: hashedPassword,
      roles: [adminRole._id]
    });

    await User.create({
      username: "user",
      email: "user@test.com",
      password: hashedPassword,
      roles: [userRole._id]
    });

    await User.create({
      username: "manager",
      email: "manager@test.com",
      password: hashedPassword,
      roles: [managerRole._id]
    });

    console.log("Created test users");

    // Create sample products
    const sampleProducts = await Product.insertMany([
      { name: "Laptop", description: "High-performance laptop", price: 999, category: "Electronics", stock: 50, status: "active", createdBy: adminUser._id },
      { name: "Mouse", description: "Wireless mouse", price: 25, category: "Electronics", stock: 200, status: "active", createdBy: adminUser._id },
      { name: "Keyboard", description: "Mechanical keyboard", price: 75, category: "Electronics", stock: 150, status: "active", createdBy: adminUser._id },
      { name: "Monitor", description: "27-inch 4K monitor", price: 299, category: "Electronics", stock: 80, status: "active", createdBy: adminUser._id },
      { name: "Headphones", description: "Noise-canceling headphones", price: 149, category: "Electronics", stock: 120, status: "active", createdBy: adminUser._id }
    ]);

    console.log("Created sample products");

    // Create sample sales
    const adminUserDoc = await User.findOne({ email: "admin@test.com" });
    
    await Sale.insertMany([
      { product: sampleProducts[0]._id, quantity: 5, price: 999, totalAmount: 4995, customer: "John Doe", soldBy: adminUserDoc._id, status: "completed" },
      { product: sampleProducts[1]._id, quantity: 20, price: 25, totalAmount: 500, customer: "Jane Smith", soldBy: adminUserDoc._id, status: "completed" },
      { product: sampleProducts[2]._id, quantity: 10, price: 75, totalAmount: 750, customer: "Bob Johnson", soldBy: adminUserDoc._id, status: "completed" },
      { product: sampleProducts[3]._id, quantity: 8, price: 299, totalAmount: 2392, customer: "Alice Brown", soldBy: adminUserDoc._id, status: "completed" },
      { product: sampleProducts[4]._id, quantity: 15, price: 149, totalAmount: 2235, customer: "Charlie Wilson", soldBy: adminUserDoc._id, status: "completed" },
      { product: sampleProducts[0]._id, quantity: 3, price: 999, totalAmount: 2997, customer: "David Lee", soldBy: adminUserDoc._id, status: "completed" },
      { product: sampleProducts[1]._id, quantity: 30, price: 25, totalAmount: 750, customer: "Emma Davis", soldBy: adminUserDoc._id, status: "completed" },
      { product: sampleProducts[2]._id, quantity: 12, price: 75, totalAmount: 900, customer: "Frank Miller", soldBy: adminUserDoc._id, status: "completed" }
    ]);

    console.log("Created sample sales");

    console.log("\n=== Test Credentials ===");
    console.log("Admin: admin@test.com / password123");
    console.log("User: user@test.com / password123");
    console.log("Manager: manager@test.com / password123");
    console.log("========================\n");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedDatabase();
