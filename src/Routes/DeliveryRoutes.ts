import { Router } from "express";
import { authenticate } from "../Middleware/Auth";
import { requireRole } from "../Middleware/role";
import { Role } from "../Model/UserModel";
import { createDelivery  } from "../Controller/deliveryController";

const router = Router()
router.post("/create",  authenticate , requireRole([Role.USER]) , createDelivery )


export default router
