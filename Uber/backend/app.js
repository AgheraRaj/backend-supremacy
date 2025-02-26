import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import connectDB from "./config/db.config.js";

const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Routes
app.use("/api/v1/users", userRoutes);

export default app;