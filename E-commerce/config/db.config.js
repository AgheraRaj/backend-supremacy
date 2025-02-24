import mongoose from "mongoose";

const connectDB = async () => {
    try {
        let conn =await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error(error);
    }
};

export default connectDB;