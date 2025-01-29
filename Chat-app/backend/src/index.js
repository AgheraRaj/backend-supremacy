import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import dotenv from "dotenv";


import { connectDB } from "./lib/db.js"
import authRoutes from "../src/routes/auth.route.js"

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(
    cors({
        origin:["http://loclhost:5173"],
        credentials:true
    })
)

// routes
app.use("/api/auth" , authRoutes);

app.listen(PORT , (req , res)=>{
    console.log(`The server is running on port:${PORT}`);
    connectDB();
})