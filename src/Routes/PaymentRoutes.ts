import { Router } from "express";
import { authenticate } from "../Middleware/Auth";
import { requireRole } from "../Middleware/role";
import { Role } from "../Model/UserModel";
import { createPayment } from "../Controller/PaymentController";

const router = Router()
router.post("/create",  authenticate , requireRole([Role.USER]) , createPayment )


export default router
