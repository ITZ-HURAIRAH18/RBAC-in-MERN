import express from "express";
import User from "../models/User.js";
import Role from "../models/Role.js";
import Permission from "../models/Permission.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

// Test route to check users
router.get("/test-users", async (req, res) => {
  try {
    const users = await User.find({}).select("email username");
    res.json({ count: users.length, users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  console.log("Login request received:", req.body);
  try {
    const { email, password } = req.body;
    console.log("Looking for user:", email);
    
    const user = await User.findOne({ email })
      .populate({
        path: "roles",
        populate: { path: "permissions" }
      });

    console.log("User found:", user ? "Yes" : "No");
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("Comparing password...");
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    // Extract all permissions from all roles
    const permissions = user.roles.flatMap(role =>
      role.permissions.map(p => p.name)
    );

    // Remove duplicates
    const uniquePermissions = [...new Set(permissions)];

    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email,
        permissions: uniquePermissions 
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ 
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        permissions: uniquePermissions
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Register (for testing)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      username,
      email,
      password: hashedPassword,
      roles: [] // Admin will assign roles later
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
