import express from "express";
import * as roleController from "../controllers/roleController.js";
import { auth, can } from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication and manage_roles permission
router.use(auth);
router.use(can("manage_roles"));

// Get all roles
router.get("/", roleController.getAllRoles);

// Get all permissions
router.get("/permissions", roleController.getAllPermissions);

// Get single role
router.get("/:id", roleController.getRole);

// Create role
router.post("/", roleController.createRole);

// Update role
router.put("/:id", roleController.updateRole);

// Delete role
router.delete("/:id", roleController.deleteRole);

export default router;
