import { Request, Response } from "express";
import { Payemnt } from "../Model/PaymentModel"; 

export const createPayment = async (req: Request, res: Response) => {
  const {
    email,
    phonenumber,
    cardHolderName,
    cardNumber,
    expireDate,
    cvv,
    paymentDate,
    amount
  } = req.body;

  
  if (
    !email ||
    !phonenumber ||
    !cardHolderName ||
    !cardNumber ||
    !expireDate ||
    !cvv ||
    !paymentDate ||
    !amount
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  
  const newPayment = new Payemnt({
    email,
    phonenumber,
    cardHolderName,
    cardNumber,
    expireDate,
    cvv,
    paymentDate,
    amount,
  });

  await newPayment.save();

  return res.status(201).json({
    message: "Payment created successfully",
    data: {
      id: newPayment._id,
      email: newPayment.email,
      amount: newPayment.amount,
      paymentDate: newPayment.paymentDate
    }
  });
};

export const getAllPayment = async(req: Request , res:Response)=>{
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const user = await Payemnt.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        const total = await Payemnt.countDocuments();
        return res.status(200).json({
            message: 'Payment Details get Successful',
            data: user,
            totalPages: Math.ceil(total / limit),
            totalCount: total,
            page,
        });

    } catch (error: any) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}