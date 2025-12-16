import mongoose, { Document, Schema } from "mongoose";

export interface IFood extends Document{
    _id:mongoose.Types.ObjectId
    foodName :string
    price : string 
    description : string
    foodCategory : string
    imageUrl : string
    creatAt? : Date
    updatedAt? : Date
}

const fishSchema = new Schema<IFood>({
    foodName :{type:String , required:true},
    price : {type:String , required:true},
    description : {type:String , required:true},
    foodCategory : {type:String , required:true},
    imageUrl : {type:String , required:true},
},{
    timestamps:true
})

export const Food = mongoose.model<IFood>("Food", fishSchema)