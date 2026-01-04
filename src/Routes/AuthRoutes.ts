import { Router } from "express"
import { getMyDetails, login, register } from "../Controller/AuthController"
import { authenticate } from "../Middleware/Auth"

const router = Router()

router.post("/register" , register)
router.post("/login" , login)
router.get("/get", authenticate, getMyDetails)

export default router