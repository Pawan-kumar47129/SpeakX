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
app.get("/",(req,res)=>{
    res.json({
        message:"Good morning how are you"
    })
})
//Router
import questionRouter from "./routes/question.routes.js"

app.use("/api/v1/questions",questionRouter);

export default app;