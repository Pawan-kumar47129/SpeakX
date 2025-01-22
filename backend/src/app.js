import express from "express";
import cors from "cors"
const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Router
import questionRouter from "./routes/question.routes.js"

app.use("/api/v1/questions",questionRouter);

export default app;