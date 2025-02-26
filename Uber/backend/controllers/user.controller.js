import { validationResult } from "express-validator";
import userModel from "../model/user.model.js";
import { createUser } from "../services/user.service.js";

export const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;
        const isUserAlreadyExist = await userModel.findOne({ email });

        if(isUserAlreadyExist){
            return res.status(400).json({ message: "User already exist" });
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        })

        const token = user.generateAuthToken();

        res.status(201).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
}