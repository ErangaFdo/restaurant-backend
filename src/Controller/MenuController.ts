import { Request, Response } from "express"
import cloudinary from "../config/Cloudinary"
import { Food } from "../Model/MenuModel"


export const createFood = async (req:Request, res:Response) => {

    const {foodName , price , description , foodCategory} = req.body

    let imageUrl = ""
    
    if (req.file) {
        const result: any = await new Promise((resolve, reject) => {
            const upload_stream = cloudinary.uploader.upload_stream(
                {folder: "post"},
                (err, result) => {
                    if (err) return reject(err)
                    resolve(result)
                }
            )
            upload_stream.end(req.file?.buffer)
        })
        imageUrl  = result.secure_url
    }

    const foodDetails = new Food({
        foodName,
        price,
        description,
        foodCategory,
        imageUrl
    })

    await foodDetails.save()
    res.status(201).json({message: "Food Details created",
        data: foodDetails
    })
}