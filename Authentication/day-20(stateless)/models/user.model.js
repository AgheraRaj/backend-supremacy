import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

// Hash password befor saving

userSchema.pre("save" , async function (next) {
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password , 10);
    next();
})

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password , this.password)
}

export default mongoose.model("User" , userSchema);