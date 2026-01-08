import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document{
    _id:mongoose.Types.ObjectId
    email :string
    firstname : string 
    lastname : string
    address : string
    paymentmethod : string
    amount : string
    orderType :string
    orderDate : string
    foodname : string
    price : string
    qty : number,
    creatAt? : Date
    updatedAt? : Date
    status?: string;
}

const OrderSchema = new Schema<IOrder>({
    email : {type:String , required:true},
    firstname :{type:String , required:true},
    lastname : {type:String , required:true},
    address : {type:String , required:true},
    paymentmethod : {type:String , required:true},
    amount : {type:String , required:true},
    orderType :{type:String , required:true},
    orderDate : {type:String , required:true},
    foodname : {type:String , required:true},
    price : {type:String , required:true},
    qty : {type:Number , required:true},
    status: {
        type: String,
        enum: ["pending", "success", "cancelled"],
        default: "pending",
    },
  },{
    timestamps:true
})

export const Order = mongoose.model<IOrder>("Order", OrderSchema)