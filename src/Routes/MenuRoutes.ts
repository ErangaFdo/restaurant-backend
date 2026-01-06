import { Router } from "express";
import { authenticate } from "../Middleware/Auth";
import { requireRole } from "../Middleware/role";
import { Role } from "../Model/UserModel";
import { createFood, deleteFood, getAll, searchFood, updateFood } from "../Controller/MenuController";
import { upload } from "../Middleware/upload";

const router = Router()
router.post("/create",  authenticate , requireRole([Role.ADMIN]) , upload.single("image") , createFood)
router.get("/all" , upload.single("image") , getAll)
router.put("/updateFood/:id", authenticate , requireRole([Role.ADMIN]) , upload.single("image"), updateFood)
router.delete("/deleteFood/:id", authenticate , requireRole([Role.ADMIN]), deleteFood)
router.get("/search", searchFood);


export default router
