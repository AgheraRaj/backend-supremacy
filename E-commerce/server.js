import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";


import connectDB from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// routes middleware
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectDB();
});