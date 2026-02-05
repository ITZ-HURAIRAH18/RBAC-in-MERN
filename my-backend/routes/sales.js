import express from "express";
import * as saleController from "../controllers/saleController.js";
import { auth, can } from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication
router.use(auth);

// Get all sales - requires read_products permission
router.get("/", can("read_products"), saleController.getAllSales);

// Create sale - requires create_products permission
router.post("/", can("create_products"), saleController.createSale);

// Get single sale
router.get("/:id", can("read_products"), saleController.getSale);

// Delete sale - requires delete_products permission
router.delete("/:id", can("delete_products"), saleController.deleteSale);

export default router;
