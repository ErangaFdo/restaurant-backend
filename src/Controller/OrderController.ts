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

export const getAllOrder = async(req: Request , res:Response)=>{
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const user = await Order.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        const total = await Order.countDocuments();
        return res.status(200).json({
            message: 'Order Details get Successful',
            data: user,
            totalPages: Math.ceil(total / limit),
            totalCount: total,
            page,
        });

    } catch (error: any) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
