import { Router } from "express";
import { login, logout } from "../controller/auth.controller.js";

const router = Router();

// login route
router.post('/login', login);

// logout route
router.get('/logout', logout);

export default router;