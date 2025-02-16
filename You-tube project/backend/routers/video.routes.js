import express from "express";
import mongoose from "mongoose";

import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import Video from "../models/video.model.js";
import { checkAuth } from "../middleware/auth.middleware.js";

const routes = express.Router();

routes.post("/upload", checkAuth, async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    if (!req.files || !req.files.videoUrl || !req.files.thumbnailUrl) {
      return res.status(400).json({ error: "Video and thumbnail are required" });
    }

    // Upload Video to Cloudinary
    const videoUpload = await cloudinary.uploader.upload(req.files.videoUrl.tempFilePath, {
      resource_type: "video",
      folder: "videos",
    });

    // Upload Thumbnail to Cloudinary
    const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnailUrl.tempFilePath, {
      folder: "thumbnails",
    });

    // Create Video Document
    const newVideo = new Video({
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
      user_id: req.user._id,
      videoUrl: videoUpload.secure_url,
      videoId: videoUpload.public_id,
      thumbnailUrl: thumbnailUpload.secure_url,
      thumbnailId: thumbnailUpload.public_id,
      category,
      tags: tags ? tags.split(",") : [],
    });

    await newVideo.save();
    res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong",
      message: error.message
    });
  }
})

routes.put("/update/:id", checkAuth, async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    const videoId = req.params.id;

    // Find Video
    let video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ error: "Video not found" });

    // Ensure Only the Owner Can Update
    if (video.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // If new thumbnail provided, delete old one & upload new
    if (req.files && req.files.thumbnail) {
      await cloudinary.uploader.destroy(video.thumbnailId); // Delete old thumbnail

      const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath, {
        folder: "thumbnails",
      });

      video.thumbnailUrl = thumbnailUpload.secure_url;
      video.thumbnailId = thumbnailUpload.public_id;
    }

    // Update Fields
    video.title = title || video.title;
    video.description = description || video.description;
    video.category = category || video.category;
    video.tags = tags ? tags.split(",") : video.tags;

    await video.save();
    res.status(200).json({ message: "Video updated successfully", video });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

routes.delete("/delete/:id", checkAuth, async (req, res) => {
  try {
    const videoId = req.params.id;

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ error: "video not found" })
    }

    if (video.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "unauthorized" })
    }

    await cloudinary.uploader.destroy(video.videoId, { resource_type: "video" });
    await cloudinary.uploader.destroy(video.thumbnailId);

    await Video.findByIdAndDelete(videoId)

    res.status(200).json({ message: "video deleted successfully" })
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
})

routes.get("/all", async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 })
    res.status(200).json(videos)
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
})

routes.get("/my-videos", checkAuth, async (req, res) => {
  try {
    const videos = await Video.find({ user_id: req.user._id }).sort({ createdAt: -1 })
    res.status(200).json(videos)
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
})

// get video by id
routes.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) res.status(404).json({ error: "video not found" });

    video.views += 1;
    await video.save()

    res.status(200).json(video)
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
})

// get video by category
routes.get("/category/:category", async(req, res)=>{
  try {
    const videos = await Video.find({ category: req.params.category }).sort({ createdAt: -1 })
    res.status(200).json(videos)
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
})

// Get Videos by Tags
routes.get("/tags/:tag", async (req, res) => {
  try {
    const tag = req.params.tag;
    const videos = await Video.find({ tags: tag }).sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
export default routes;