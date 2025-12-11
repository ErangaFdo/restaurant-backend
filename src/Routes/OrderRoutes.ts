import { Router } from "express";
import { authenticate } from "../Middleware/Auth";
import { requireRole } from "../Middleware/role";
import { Role } from "../Model/UserModel";
import { createOrder, getAllOrder } from "../Controller/OrderController";

const router = Router()
router.post("/create",  authenticate , requireRole([Role.USER]) , createOrder )
router.get("/getall",  getAllOrder )

export default router
