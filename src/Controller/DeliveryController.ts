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
