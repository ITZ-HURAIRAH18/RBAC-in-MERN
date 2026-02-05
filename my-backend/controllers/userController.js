import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Create User
export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({ 
      username, 
      email, 
      password: hashedPassword,
      roles: roles || []
    });
    
    await user.save();
    
    // Populate roles before sending response
    await user.populate('roles');
    
    res.status(201).json({ success: true, message: "User created!", user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('roles');
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, roles } = req.body;

    const updateData = { username, email };
    
    // Only update password if provided
    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }
    
    // Update roles if provided
    if (roles !== undefined) {
      updateData.roles = roles;
    }

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('roles');

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, message: "User updated!", user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, message: "User deleted!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
