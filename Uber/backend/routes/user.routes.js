import express from "express";
import { registerValidator } from "../validatores/user.velidatore.js";
import { registerUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerValidator, registerUser);

router.post("/login")

router.get("/profile")

router.post("/logout")

export default router;