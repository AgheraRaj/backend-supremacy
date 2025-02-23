import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import { checkAuth } from "../middleware/auth.middleware.js";

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
});

routes.put("/update-profile", checkAuth, async (req, res)=>{
    try {
        const {channelName , phone} = req.body;
        let updatedData = {channelName, phone};

        if (req.files && req.files.logo) {
            const uploadedImage = await cloudinary.uploader.upload(req.files.logo.tempFilePath);
            updatedData.logoUrl = uploadedImage.secure_url;
            updatedData.logoId = uploadedImage.public_id;
          }
      
        const updatedUser = await User.findByIdAndUpdate(req.user._id, updatedData, { new: true });
      
        res.status(200).json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Something went wrong",
            message: error.message
        });
    }
});

routes.post("/subscribe",checkAuth ,  async (req, res) => {
    try {
      const {channelId } = req.body; // userId = current user, channelId = channel to subscribe to
  
      if ( req.user._id === channelId) {
        return res.status(400).json({ error: "You cannot subscribe to yourself" });
      }
  
      // Add the channel to user's subscribed channels
      const currentUser = await User.findByIdAndUpdate(req.user._id , {
        $addToSet: { subscribedChannels: channelId },
      });
  
      // Increment subscriber count
      const subscribedUser = await User.findByIdAndUpdate(channelId, {
        $inc: { subscribers: 1 },
      });
  
      res.status(200).json({ message: "Subscribed successfully",
        data:{
            currentUser,
            subscribedUser
        }
       });
    } catch (error) {
      console.error("Subscription Error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });
  

export default routes;