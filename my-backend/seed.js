import mongoose from "mongoose";
import Permission from "./models/Permission.js";
import Role from "./models/Role.js";
import User from "./models/User.js";
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

    await User.create({
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
