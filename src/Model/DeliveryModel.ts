import mongoose, { Document, Schema } from "mongoose";


export interface IDelivery extends Document{
    _id:mongoose.Types.ObjectId
    customername : string
    phonenumber : string
    email : string
    address : string
    city : string
    deliveryDate : string
    deliveryTime : string
    postelCode : string
   }

const deliverySchema  = new Schema<IDelivery>({
    customername :{type:String , required:true},
    phonenumber : {type:String , required:true},
    email : {type:String , required:true},
    address : {type:String , required:true},
    city : {type:String , required:true},
    deliveryDate : {type:String , required:true},
    deliveryTime : {type:String , required:true},
    postelCode : {type:String , required:true},
   },{
    timestamps:true
}
)

export const Delivery = mongoose.model<IDelivery>("Delivery", deliverySchema)