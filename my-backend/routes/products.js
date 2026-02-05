import express from "express";
import * as productController from "../controllers/productController.js";
import { auth, can } from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication
router.use(auth);

// Get all products - requires read_products
router.get("/", can("read_products"), productController.getAllProducts);

// Get single product - requires read_products
router.get("/:id", can("read_products"), productController.getProduct);

// Create product - requires create_products
router.post("/", can("create_products"), productController.createProduct);

// Update product - requires update_products
router.put("/:id", can("update_products"), productController.updateProduct);

// Delete product - requires delete_products
router.delete("/:id", can("delete_products"), productController.deleteProduct);

export default router;
