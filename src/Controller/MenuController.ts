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


export const getAll = async (req:Request, res:Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const food = await Food.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        const total = await Food.countDocuments();
        return res.status(200).json({
            message: 'Food Details get Successful',
            data: food,
            totalPages: Math.ceil(total / limit),
            totalCount: total,
            page,
        });

    } catch (error: any) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const updateFood = async(req:Request, res:Response) =>{
     try {
    const { id } = req.params;
    const {foodName , price , description , foodCategory} = req.body;

    const existingFood = await Food.findById(id);
    if (!existingFood) {
      return res.status(404).json({ message: "Food not found" });
    }

    let imageUrl = existingFood.imageUrl;

    if (req.file) {
      const fileBuffer = req.file.buffer;
      const result: any = await new Promise((resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
          { folder: "post" },
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        );
        upload_stream.end(fileBuffer);
      });

      imageUrl = result.secure_url;
    }

    const updatedFood = await Food.findByIdAndUpdate(
      id,
      {
        foodName,
        price,
        description,
        foodCategory,
        imageUrl,
      },
      { new: true } 
    );

    res.status(200).json({
      message: "Food details updated successfully",
      data: updatedFood,
    });

  } catch (error: any) {
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
}

export const deleteFood = async(req:Request, res:Response) =>{
    try {
    const { id } = req.params;

    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    await Food.findByIdAndDelete(id);

    res.status(200).json({
      message: "Food deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Delete failed",
      error: error.message,
    });
  }
}

export const searchFood = async (req: Request, res: Response) => {
  try {
    const { query, category, page = "1", limit = "10" } = req.query;

    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const skip = (pageNumber - 1) * limitNumber;

    // Build filter
    const filter: any = {};

    if (query) {
      filter.foodName = { $regex: query, $options: "i" }; // case-insensitive search
    }

    if (category) {
      filter.foodCategory = category;
    }

    const food = await Food.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    const total = await Food.countDocuments(filter);

    return res.status(200).json({
      message: "Search results",
      data: food,
      totalPages: Math.ceil(total / limitNumber),
      totalCount: total,
      page: pageNumber,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Search failed",
      error: error.message,
    });
  }
};