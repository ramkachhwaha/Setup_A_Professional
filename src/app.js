import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import 
import userRouter from './routes/user.router.js';


// Routes declaration
app.use("/users", userRouter);

// http://localhost:5000/api/v1/users/login
// http://localhost:7000/users/register
export { app };
