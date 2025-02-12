import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";

import User from "../models/user.model.js";

const routes = express.Router();

routes.post("/signup" , async(req , res)=>{
    try {
        const hashPassword = await bcrypt.hash(req.body.password , 10);
        const uploadedImage = await cloudinary.uploader.upload(
            req.files.logoUrl.tempFilePath
        );

        console.log("image ==> " , uploadedImage)

        const newUser = new User({
            _id: new mongoose.Types.ObjectId,
            channelName: req.body.channelName,
            email: req.body.email,
            phone:req.body.phone,
            password:hashPassword,
            logoUrl:uploadedImage.secure_url,
            logoId:uploadedImage.public_id
        })

        let user = await newUser.save();

        res.status(201).json({
            newUser:user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error,
        });
    }
});

export default routes;