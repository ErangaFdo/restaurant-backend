import { Request, Response } from "express";
import { Delivery } from "../Model/DeliveryModel"; 

export const createDelivery = async (req: Request, res: Response) => {
  const {
    customername,
    phonenumber,
    email,
    address,
    city,
    deliveryDate,
    deliveryTime,
    postelCode
  } = req.body;

  
  if (
    !customername ||
    !phonenumber ||
    !email ||
    !address ||
    !city ||
    !deliveryDate ||
    !deliveryTime ||
    !postelCode
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  
  const newDelivery = new Delivery({
    customername,
    phonenumber,
    email,
    address,
    city,
    deliveryDate,
    deliveryTime,
    postelCode,
  });

  await newDelivery.save();

  return res.status(201).json({
    message: "Delivery created successfully",
    data: {
      id: newDelivery._id,
      customername: newDelivery.customername,
      city: newDelivery.city,
      deliveryDate: newDelivery.deliveryDate,
    }
  });
};


export const getAllDelivery = async(req: Request , res:Response)=>{
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const user = await Delivery.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        const total = await Delivery.countDocuments();
        return res.status(200).json({
            message: 'Delivery Details get Successful',
            data: user,
            totalPages: Math.ceil(total / limit),
            totalCount: total,
            page,
        });

    } catch (error: any) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}