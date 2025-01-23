import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router()

router.get("/" , authenticateToken , (req , res)=>{
    res.status(200).json({
        message: "Welcome to private routes", user: req.user
    })
})

export default router;