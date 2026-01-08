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
    foodname,
    price,
    qty
  } = req.body;

  if(!email || !firstname || !lastname || !address || !paymentmethod){
        return res.status(400).json({ message: "All fields are required" })
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
    foodname,
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

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        const allowedStatus = ["pending", "success", "cancelled"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({
            message: "Order status updated successfully",
            data: updatedOrder
        });

    } catch (error: any) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const getOrdersByUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const orders = await Order.find({ email }).sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        return res.status(200).json({
            message: "User orders fetched successfully",
            data: orders
        });

    } catch (error: any) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};