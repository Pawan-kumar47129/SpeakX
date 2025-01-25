import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

 const connectDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("MongoDB connected successfully :: connection::Host",connectionInstance.connection.host);
    } catch (error) {
        console.log("Some Error Occure While connecting to DataBase:: ",error.message);
        process.exit(1);
    }
} 

export default connectDB;