import express from "express";
import { createUser, getUsers, updateUser, deleteUser } from "../controllers/userController.js";
import { auth, can } from "../middleware/auth.js";
import Role from "../models/Role.js";

const router = express.Router();

router.get("/", auth, can("read_users"), getUsers);
router.post("/", auth, can("create_users"), createUser);
router.put("/:id", auth, can("update_users"), updateUser);
router.delete("/:id", auth, can("delete_users"), deleteUser);

// Get roles for user assignment (only requires authentication, not manage_roles)
router.get("/roles-list", auth, async (req, res) => {
  try {
    const roles = await Role.find().select("name _id");
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
