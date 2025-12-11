import { Router } from "express";
import { authenticate } from "../Middleware/Auth";
import { requireRole } from "../Middleware/role";
import { Role } from "../Model/UserModel";
import { createDelivery, getAllDelivery  } from "../Controller/deliveryController";

const router = Router()
router.post("/create",  authenticate , requireRole([Role.USER]) , createDelivery )
router.get("/getall",    getAllDelivery )


export default router
