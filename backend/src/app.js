import express from "express";
import cors from "cors"
const app = express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Router
import questionRouter from "./routes/question.routes.js"

app.use("/api/v1/questions",questionRouter);

export default app;