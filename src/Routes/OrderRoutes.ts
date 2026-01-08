import { Router } from "express";
import { authenticate } from "../Middleware/Auth";
import { requireRole } from "../Middleware/role";
import { Role } from "../Model/UserModel";
import { createOrder, getAllOrder, getOrdersByUser, updateOrderStatus } from "../Controller/OrderController";

const router = Router()
router.post("/create",  authenticate , requireRole([Role.USER]) , createOrder )
router.get("/getall",  getAllOrder )
router.put("/updateStatus/:id",authenticate,requireRole([Role.ADMIN]), updateOrderStatus);
router.get("/viewOrder/:email", getOrdersByUser);

export default router
