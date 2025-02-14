import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

const routes = express.Router();

routes.post("/signup", async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const uploadedImage = await cloudinary.uploader.upload(
            req.files.logoUrl.tempFilePath
        );

        console.log("image ==> ", uploadedImage)

        const newUser = new User({
            _id: new mongoose.Types.ObjectId,
            channelName: req.body.channelName,
            email: req.body.email,
            phone: req.body.phone,
            password: hashPassword,
            logoUrl: uploadedImage.secure_url,
            logoId: uploadedImage.public_id
        })

        let user = await newUser.save();

        res.status(201).json({
            newUser: user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Something went wrong",
            message: error.message
        });
    }
});

routes.post("/login", async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isValid = await bcrypt.compare(
            req.body.password,
            existingUser.password
        )

        if (!isValid) {
            return res.status(500).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({
            _id: existingUser._id,
            channelName: existingUser.channelName,
            email: existingUser.email,
            phone: existingUser.phone,
            logoId: existingUser.logoId,
        }, process.env.JWT_TOKEN, { expiresIn: "10d" });

        res.status(200).json({
            _id: existingUser._id,
            channelName: existingUser.channelName,
            email: existingUser.email,
            phone: existingUser.phone,
            logoId: existingUser.logoId,
            logoUrl: existingUser.logoUrl,
            token: token,
            subscribers: existingUser.subscribers,
            subscribedChannels: existingUser.subscribedChannels

        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Something went wrong",
            message: error.message
        });
    }
})

export default routes;