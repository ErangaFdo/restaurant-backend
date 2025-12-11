import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRouter from "./Routes/AuthRoutes"
import feedbackRouter from "./Routes/FeedBackRoutes"
import orderRouter from "./Routes/OrderRoutes"
import deliveryRouter from "./Routes/DeliveryRoutes"
import paymentRouter from "./Routes/PaymentRoutes"


dotenv.config()
const SERVER_PORT = process.env.SERVER_PORT
const MONGO_URI = process.env.MONGO_URI as string


const app = express()



app.use(express.json())
app.use("/api/v1/auth" , authRouter)
app.use("/api/v1/feedback" , feedbackRouter )
app.use("/api/v1/order" , orderRouter )
app.use("/api/v1/delivery" , deliveryRouter )
app.use("/api/v1/payment" , paymentRouter )

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("DB connected Successful")
  })
  .catch((err) => {
    console.error(`DB connection fail: ${err}`)
    process.exit(1)
  })


app.listen(SERVER_PORT,()=>{
    console.log("Server is Running 5000")
})