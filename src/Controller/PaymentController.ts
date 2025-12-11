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
