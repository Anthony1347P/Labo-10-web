import { Router } from "express";
import { createSale, getSales, getSalesReport } from "../controllers/sales.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyToken);

router.post("/", createSale);
router.get("/", getSales);
router.get("/report", getSalesReport);

export default router;