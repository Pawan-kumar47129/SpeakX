import express from "express";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config({path:"./.env"});
const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/",async(req,res)=>{
    const data=await Question.find().limit(10);
    res.json({
        message:"Good morning how are you",
        data
    })
})
//Router
import questionRouter from "./routes/question.routes.js"
import { Question } from "./models/question.models.js";

app.use("/api/v1/questions",questionRouter);

export default app;