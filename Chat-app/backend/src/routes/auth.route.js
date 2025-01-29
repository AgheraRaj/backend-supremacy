import express from "express";
import { login, logout, signup, updateProfile } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const routes = express.Router();

routes.post("/signup" , signup)
routes.post("/login" , login)
routes.post("/logout" , logout)
routes.put("/update-profile" , protectRoute , updateProfile)

export default routes;