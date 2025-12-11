import { Router } from "express";
import { authenticate } from "../Middleware/Auth";
import { requireRole } from "../Middleware/role";
import { Role } from "../Model/UserModel";
import { createPayment, getAllPayment } from "../Controller/PaymentController";

const router = Router()
router.post("/create",  authenticate , requireRole([Role.USER]) , createPayment )
router.get("/getall",  getAllPayment )

export default router
