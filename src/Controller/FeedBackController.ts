import { Request, Response } from "express"
import { Feedback } from "../Model/FeedBackModel"

export const creaetFeedback = async(req: Request , res:Response)=>{
    const {customername , email , ratings , feedback} = req.body

    if(!customername || !email || !ratings || !feedback ){
        return res.status(400).json({ message: "All fields are required" })
    }

    const newFeedback = new Feedback({
        customername, 
        email,
        ratings,
        feedback
    })

    await newFeedback.save()

    res.status(201).json({
      message:"Feedback Create Successfully",
      data: {
        id: newFeedback._id,
        email: newFeedback.email,
        ratings: newFeedback.ratings,
      }
    })
}