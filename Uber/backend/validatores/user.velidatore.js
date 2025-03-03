import { body } from "express-validator";

export const registerValidator = [
    body("fullname.firstname").isString().isLength({ min: 2 }).withMessage("First name must be at least 2 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isString().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

export const loginValidator = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isString().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];