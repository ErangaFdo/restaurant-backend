import { Router } from "express";
import { authenticate } from "../Middleware/Auth";
import { requireRole } from "../Middleware/role";
import { Role } from "../Model/UserModel";
import { creaetFeedback, getAllFeedback } from "../Controller/FeedBackController";

const router = Router()
router.post("/create",  authenticate , requireRole([Role.USER]) , creaetFeedback)
router.get("/getall",    getAllFeedback )

export default router
