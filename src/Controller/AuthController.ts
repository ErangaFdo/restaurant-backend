import { Request, Response } from "express"
import { IUser, User } from "../Model/UserModel"
import bcrypt from "bcryptjs"
import { signAccessToken } from "../Util/token"
import { AuthRequest } from "../Middleware/Auth"

export const register = async (req:Request , res:Response)=>{
    const {firstname , lastname , email , password , role} = req.body

    if(!firstname || !lastname || !email || !password || !role){
        return res.status(400).json({ message: "All fields are required" })
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        return res.status(400).json({ message: "Email alrady registered" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

     const newUser = new User({
      firstname, 
      lastname,
      email,
      password: hashedPassword,
      role: [role],
    })

     await newUser.save()

    res.status(201).json({
      message:"User Register Successfully",
      data: {
        id: newUser._id,
        email: newUser.email,
        roles: newUser.role,
      }
    })
}

export const login = async(req:Request , res:Response)=>{
    const {email , password} = req.body

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials Please Try again Later" })
    } 

       const valid = await bcrypt.compare(password, existingUser.password)
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials Please Try again Later" })
    }

    const accessToken = signAccessToken(existingUser)

    res.status(200).json({
        message : "success",
        data:{
            email : existingUser.email,
            role : existingUser.role,
            accessToken
        }
    })
}

export const getMyDetails = async(req:AuthRequest , res:Response)=>{
if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  const userId = req.user.sub
  const user =
    ((await User.findById(userId).select("-password")) as IUser) || null

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    })
  }

  const { firstname, lastname, email, role} = user

  res.status(200).json({
    message: "Ok",
    data: { firstname, lastname, email, role }
  })
}