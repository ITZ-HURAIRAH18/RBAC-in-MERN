import express from "express";
import { createUser, getUsers, updateUser, deleteUser } from "../controllers/userController.js";
import { auth, can } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, can("read_users"), getUsers);
router.post("/", auth, can("create_users"), createUser);
router.put("/:id", auth, can("update_users"), updateUser);
router.delete("/:id", auth, can("delete_users"), deleteUser);

export default router;
