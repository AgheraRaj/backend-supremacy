import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("The database connected successfully");
    } catch (error) {
        console.log("The database not connected:" , error.message);
        throw error;
    }
}