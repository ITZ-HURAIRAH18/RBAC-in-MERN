import express from "express";
import * as reportController from "../controllers/reportController.js";
import { auth, can } from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication and view_reports permission
router.use(auth);
router.use(can("view_reports"));

// Dashboard statistics
router.get("/dashboard", reportController.getDashboardStats);

// User report
router.get("/users", reportController.getUserReport);

// Product report
router.get("/products", reportController.getProductReport);

// Sales summary
router.get("/sales", reportController.getSalesSummary);

export default router;
