import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { IUser } from "../Model/UserModel"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string
export const signAccessToken = (user:IUser):string => {
    return jwt.sign(
        {
            sub:user._id.toString(),
            role : user.role 
        },
        JWT_SECRET,
        {
            expiresIn: "1h"
        }

    )
}