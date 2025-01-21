import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

// create
router.post("/users", async (req, res) => {
  try {
    const { name, age, weight } = req.body;

    const newUser = new User({ name, age, weight });
    await newUser.save();

    res.status(201).json({
      success: true,
      data: newUser,
      message: "user created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// read
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users,
      message: "user get successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// update
router.put("/users-update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, weight } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, age, weight },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// delete
router.delete("/users-delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
