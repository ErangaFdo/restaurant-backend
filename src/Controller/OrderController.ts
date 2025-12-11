import { Request, Response } from "express";
import { Order } from "../Model/OrderModel";

export const createOrder = async (req: Request, res: Response) => {
  const {
    email,
    firstname,
    lastname,
    address,
    paymentmethod,
    amount,
    orderType,
    orderDate,
    Foodname,
    price,
    qty
  } = req.body;

  
  if (
    !email ||
    !firstname ||
    !lastname ||
    !address ||
    !paymentmethod ||
    !amount ||
    !orderType ||
    !orderDate ||
    !Foodname ||
    !price ||
    qty == null
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  
  const newOrder = new Order({
    email,
    firstname,
    lastname,
    address,
    paymentmethod,
    amount,
    orderType,
    orderDate,
    Foodname,
    price,
    qty
  });

  await newOrder.save();

  return res.status(201).json({
    message: "Order created successfully",
    data: {
      id: newOrder._id,
      email: newOrder.email,
      amount: newOrder.amount,
      orderType: newOrder.orderType,
    }
  });
};
