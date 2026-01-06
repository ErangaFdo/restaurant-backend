import { Router } from "express";
import { authenticate } from "../Middleware/Auth";
import { requireRole } from "../Middleware/role";
import { Role } from "../Model/UserModel";
import { createFood } from "../Controller/MenuController";
import { upload } from "../Middleware/upload";

const router = Router()
router.post("/create",  authenticate , requireRole([Role.ADMIN]) , upload.single("image") , createFood)



export default router
