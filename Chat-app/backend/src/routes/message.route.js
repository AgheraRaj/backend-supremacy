import express from "express";

import {protectRoute} from "../middlewares/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const routes = express.Router()

routes.get("/users" , protectRoute , getUsersForSidebar);
routes.get("/:id" , protectRoute , getMessages);
routes.post("/send/:id" , protectRoute , sendMessage)

export default routes;