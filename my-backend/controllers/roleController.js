import Role from "../models/Role.js";
import Permission from "../models/Permission.js";

// Get all roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate('permissions', 'name');
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single role
export const getRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id).populate('permissions', 'name');
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create role
export const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const role = new Role({ name, permissions });
    await role.save();
    
    const populatedRole = await Role.findById(role._id).populate('permissions', 'name');
    res.status(201).json({ message: "Role created successfully", role: populatedRole });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update role
export const updateRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { name, permissions },
      { new: true, runValidators: true }
    ).populate('permissions', 'name');

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json({ message: "Role updated successfully", role });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete role
export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all permissions
export const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
