import { Router } from "express";
import { authenticate } from "../Middleware/Auth";
import { requireRole } from "../Middleware/role";
import { Role } from "../Model/UserModel";
import { createOrder } from "../Controller/OrderController";

const router = Router()
router.post("/create",  authenticate , requireRole([Role.USER]) , createOrder )

export default router
