import { Router } from "express";
import { authenticate } from "../Middleware/Auth";
import { requireRole } from "../Middleware/role";
import { Role } from "../Model/UserModel";
import { getUserAll } from "../Controller/UserController";

const router = Router()

router.get("/allUser" , authenticate ,requireRole([Role.ADMIN]),getUserAll)

export default router