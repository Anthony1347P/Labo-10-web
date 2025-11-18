import { Router } from "express";
import { getCustomers, getCustomerByCode } from "../controllers/customer.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyToken); // Protege todas las rutas de este archivo

router.get("/", getCustomers);
router.get("/search", getCustomerByCode);

export default router;