import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js"
import privateRoutes from "./routes/private.routes.js"


dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

// connect mongoDB

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connected successfully");
  })
  .catch((err) => {
    "mongodb connection error", err.message;
  });

// routes

app.use("/auth" , authRoutes);
app.use("/private" , privateRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
