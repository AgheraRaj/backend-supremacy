import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minLength: [2, "First name must be at least 2 characters long"],
        },
        lastname: {
            type: String,
            minLength: [2, "Last name must be at least 2 characters long"],
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minLength: [5, "Email must be at least 5 characters long"]
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    socketId:{
        type: String
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: "24h"});
    return token;
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model("User", userSchema);

export default userModel;