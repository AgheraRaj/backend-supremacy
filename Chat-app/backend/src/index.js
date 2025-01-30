import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import dotenv from "dotenv";


import { connectDB } from "./lib/db.js"
import authRoutes from "../src/routes/auth.route.js"
import messageRoutes from "../src/routes/message.route.js"

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(
    cors({
        origin:["http://localhost:5173"],
        credentials:true
    })
)

// routes
app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes)

app.listen(PORT , ()=>{
    console.log(`The server is running on port:${PORT}`);
    connectDB();
})